'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Movie = mongoose.model('Movies');

module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 
    router.route('/movies').get((req, res, next) => {
        logger.log('info', 'Get all movies');

        var query = Movie.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No movies" });
                }
            })
            .catch(err => {
                return next(err);
            });

    });

    router.route('/movies/employee/:id').get((req, res, next) => {
        logger.log('info', 'Get all user movies' + req.params.id);

        var query = Movie.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No movies" });
                }
            })
            .catch(err => {
                return next(err);
            });

    });

    router.route('/movies/:id').get((req, res, next) => {
        logger.log('info', 'Get movie %s'+  req.params.id);

        Movie.findById(req.params.id)
            .then(movies => {
                if (movies) {
                    res.status(200).json(movies);
                } else {
                    res.status(404).json({message: "No movies found" });
                }
            })
            .catch(error => {
                return next(error);
            });

    });

    router.route('/movies/:id').put((req, res, next) => {
        logger.log('info', 'Get movie %s' +  req.params.id);

        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(movie => {
                res.status(200).json(movie);
            })
            .catch(error => {
                return next(error);
            });

    });
    router.route('/movies').post((req, res, next) => {
        logger.log('info', 'Create Movie');
        var movie = new Movie(req.body);
        movie.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch((err) => {
                return next(err);
            });

    });

    router.route('/movies/:id').delete((req, res, next) => {
        logger.log('info', 'Get movie %s' +  req.params.id);

        Movies.remove({ _id: req.params.id })
            .then(movie => {
                res.status(200).json({ msg: "Movie Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    });

};




