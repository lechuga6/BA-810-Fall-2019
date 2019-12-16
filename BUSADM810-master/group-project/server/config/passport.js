
const passport = require('passport'),
    jwt = require('jsonwebtoken'),
    Employee = require('../app/models/employees'),
    config = require('./config'),
    jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    localStrategy = require('passport-local');
var localOptions = { usernameField: 'email' };

var localLogin = new localStrategy(localOptions, function (email, password, next) {
    Employee.findOne({ email: email }).exec()
        .then(function (employee) {
            if (!employee) {
                return next({ status: "404", message: "Email not found." });
            } else {
                employee.comparePassword(password, function (err, isMatch) {
                    if (err) {
                        return next(err);
                    } else if (!isMatch) {
                        return next({ status: 401, message: 'Invalid username or password' });
                    } else {
                        return next(null, employee);
                    }
                });
            }
        })
        .catch(function (err) { return next(err); });
});
generateToken = function (employee) {
    return jwt.sign(employee, config.secret, {
        expiresIn: 10000
    });
};

setEmployeeInfo = function (req) {
    return {
        _id: req._id,
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        issuer: "edu.uwm"
    };
};

login = function (req, res, next) {
    var employeeInfo = setEmployeeInfo(req.employee);
    res.status(200).json({ token: generateToken(employeeInfo), employee: req.employee });
};
var jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};

var jwtLogin = new jwtStrategy(jwtOptions, function (payload, next) {
    Employee.findById(payload._id).exec()
        .then(function (employee) {
            if (employee) {
                return next(null, employee);
            } else {
                return next(null, false);
            }
        })
        .catch(function (err) { return next(err); });
});

passport.use(jwtLogin);

passport.use(localLogin);
