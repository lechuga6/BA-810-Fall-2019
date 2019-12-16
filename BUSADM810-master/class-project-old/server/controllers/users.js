'use strict'

passportService = require('../../config/passport'),
passport = require('passport');
const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

mongoose = require('mongoose'),
User = mongoose.model('User');

var express = require('express'),  
    router = express.Router(),  
    logger = require('../../config/logger');

module.exports = function (app, config) {
    app.use('/api', router);

    // router.route('/users').get(requireAuth,(req, res, next) => {
        // TODO: Add the requireAuth to all routes when the app is almost done. See above example.
    router.route('/users').get((req, res, next) => {
        logger.log('info', 'Get all users');
        var query = User.find()        
        .sort(req.query.order)        
        .exec()        
        .then(result => {            
            if(result && result.length) {            
                res.status(200).json(result);        
            } else {            
                res.status(404).json({message: "No users"});        
            }        
        })        
        .catch(err => {          
            return next(err);        
        });
    });

    router.route('/users/:id').get((req, res, next) => {        
        logger.log('info','Get user %s', req.params.id);        
        User.findById(req.params.id)            
        .then(user => {                
            if (user) {                    
                res.status(200).json(user);                
            } else {                    
                res.status(404).json({ 
                    message: "No user found" });                
                }            
        })            
        .catch(error => {                
            return next(error);            
        });
    }); 

    router.route('/test/:id/:name').get((req, res, next) => {
        var id = req.params.id;
        var name = req.params.name;
        var obj = {'id' : id, ' name ' : name};
        res.status(200).json(obj);
    });

    router.route('/users/login').post(requireLogin, login);

    router.route('/users').post((req, res, next) => {
        logger.log('info', 'Create user'); 
        var user = new User(req.body);
        user.save()
        .then(result => {          
            res.status(201).json(result);      
        })      
        .catch(err => {         
            return next(err);      
        });
    });

    router.route('/users/:id').put((req, res, next) => {        
        logger.log('info', 'Get user %s', req.params.id);        
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })            
            .then(user => {                
                res.status(200).json(user);            
            })            
            .catch(error => {                
                return next(error);            
            });    
    });

    router.route('/users/:id').delete((req, res, next) => {        
        logger.log('info', 'Delete user ' + req.params.id);        
        User.remove({ _id: req.params.id })            
            .then(user => {                
                res.status(200).json({ msg: "User Deleted" });            
            })            
            .catch(error => {                
                return next(error);            
            });    
    });

    router.put('/users/password/:id', function (req, res, next) {        
        logger.log('info','Update user ' + req.params.id);        
        User.findById(req.params.id)            
            .exec()            
            .then(function (user) {                
                if (req.body.password !== undefined) {                    
                    user.password = req.body.password;                
                }                
                user.save()                    
                    .then(function (user) {                        
                        res.status(200).json(user);                    
                    })                    
                    .catch(function (err) {                        
                        return next(err);                    
                    });            
            })            
            .catch(function (err) {                
                return next(err);            
            });    
    });
};