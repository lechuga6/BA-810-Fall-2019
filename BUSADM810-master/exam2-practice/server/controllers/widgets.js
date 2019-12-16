'use strict'

mongoose = require('mongoose'),
Widgets = mongoose.model('Widgets');

var express = require('express'),  
    router = express.Router(),  
    logger = require('../../config/logger');

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/widgets').get((req, res, next) => {
        logger.log('info', 'Get all widgets');
        var query = Widgets.find()        
        .sort(req.query.order)        
        .exec()        
        .then(result => {            
            if(result && result.length) {            
                res.status(200).json(result);        
            } else {            
                res.status(404).json({message: "No widgets"});        
            }        
        })        
        .catch(err => {          
            return next(err);        
        });
    });

    router.route('/widgets/:id').get((req, res, next) => {        
        logger.log('info','Get widget %s', req.params.id);        
        Widgets.findById(req.params.id)            
        .then(widget => {                
            if (widget) {                    
                res.status(200).json(widget);                
            } else {                    
                res.status(404).json({ 
                    message: "No widget found" });                
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

    router.route('/widgets').post((req, res, next) => {
        logger.log('info', 'Create widget'); 
        var widget = new Widget(req.body);
        widget.save()
        .then(result => {          
            res.status(201).json(result);      
        })      
        .catch(err => {         
            return next(err);      
        });
    });

    router.route('/widgets/:id').put((req, res, next) => {        
        logger.log('info', 'Get widget %s', req.params.id);        
        Widgets.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })            
            .then(widget => {                
                res.status(200).json(widget);            
            })            
            .catch(error => {                
                return next(error);            
            });    
    });

    router.route('/widgets/:id').delete((req, res, next) => {        
        logger.log('info', 'Delete widget ' + req.params.id);        
        Widgets.remove({ _id: req.params.id })            
            .then(widget => {                
                res.status(200).json({ msg: "Widget Deleted" });            
            })            
            .catch(error => {                
                return next(error);            
            });    
    });
};