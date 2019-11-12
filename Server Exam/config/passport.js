const passport = require('passport'),
    jwt = require('jsonwebtoken'),
  
    Gadget = require('../app/models/gadgets'),
    config = require('./config'),
    jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    localStrategy = require('passport-local');
var localOptions = { usernameField: 'email' };

var localLogin = new localStrategy(localOptions, function (email, password, next) {
    Gadget.findOne({ email: email }).exec()
        .then(function (gadget) {
            if (!gadget) {
                return next({ status: "404", message: "Email not found." });
            } else {
                user.comparePassword(password, function (err, isMatch) {
                    if (err) {
                        return next(err);
                    } else if (!isMatch) {
                        return next({ status: 401, message: 'Invalid username or password' });
                    } else {
                        return next(null, gadget);
                    }
                });
            }
        })
        .catch(function (err) { return next(err); });
});
generateToken = function (gadget) {
    return jwt.sign(gadget, config.secret, {
        expiresIn: 10000
    });
};

setUserInfo = function (req) {
    return {
        _id: req._id,
        Yoo: req.yoo,
        Hoo: req.hoo,
        email: req.email,
        issuer: "edu.uwm"
    };
};

login = function (req, res, next) {
    var gadgetInfo = setUserInfo(req.gadget);
    res.status(200).json({ token: generateToken(gadgetInfo), gadget: req.gadget });
};
var jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};

var jwtLogin = new jwtStrategy(jwtOptions, function (payload, next) {
    Gadget.findById(payload._id).exec()
        .then(function (gadget) {
            if (gadget) {
                return next(null, gadget);
            } else {
                return next(null, false);
            }
        })
        .catch(function (err) { return next(err); });
});

passport.use(jwtLogin);

passport.use(localLogin);