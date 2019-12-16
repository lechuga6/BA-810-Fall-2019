
'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'), 
    mongoose = require('mongoose'),
    Employee = mongoose.model('Employee'),
    passportService = require('../../config/passport'),
    passport = require('passport');

const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 

    router.route('/employees').get( (req, res, next) => {
        logger.log('info', 'Get all employees');

        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No employees" });
                }
            })
            .catch(err => {
                return next(err);
            });

    });

    router.route('/employees').post( (req, res, next) => {
        logger.log('info', 'Create employee');
        var employee = new Employee(req.body);
        employee.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch((err) => {
                return next(err);
            });

    });

    router.route('/employees/login').post(requireLogin, login),


    router.route('/employees/:id').get( (req, res, next) => {
        logger.log('info', 'Get employee %s', req.params.id);

        Employee.findById(req.params.id)
            .then(employee => {
                if (employee) {
                    res.status(200).json(employee);
                } else {
                    res.status(404).json({ message: "No employee found" });
                }
            })
            .catch(error => {
                return next(error);
            });

    });
    router.route('/employees/:id').put( (req, res, next) => {
        logger.log('info', 'Get employee %s', req.params.id);

        Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(employee => {
                res.status(200).json(employee);
            })
            .catch(error => {
                return next(error);
            });

    });
    router.put('/employees/password/:id', function (req, res, next) {
        logger.log('info', 'Update employee ' + req.params.id);
        Employee.findById(req.params.id)
            .exec()
            .then(function (employee) {
                if (req.body.password !== undefined) {
                    employee.password = req.body.password;
                }
                employee.save()
                    .then(function (employee) {
                        res.status(200).json(employee);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    router.route('/employees/:id').delete( (req, res, next) => {
        logger.log('info', 'Get employee %s', req.params.id);

        Employee.remove({ _id: req.params.id })
            .then(employee => {
                res.status(200).json({ msg: "Employee Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    });

};

