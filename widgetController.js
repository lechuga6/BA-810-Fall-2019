
// WidgetController.js

// Import contact model

Widget = require('./widgetModel');

// Handle index actions

exports.index = function (req, res) {

    Widget.get(function (err, widget) {

        if (err) {

            res.json({

                status: "error",

                message: err,

            });

        }

        res.json({

            status: "success",

            message: "widget retrieved successfully",

            data: widget//this is the data

        });

    });

};

// Handle create widget actions

exports.new = function (req, res) {

    var widget = new Widget();

    widget.foo = req.body.foo ? req.body.foo : widget.foo;

    widget.woo = req.body.woo;



// save the widget and check for errors

widget.save(function (err) {

        if (err)

            res.json(err);

res.json({

            message: 'New widget created!',

            data: widget

        });

    });

};

// Handle view widget info

exports.view = function (req, res) {

    Widget.findById(req.params.widget_id, function (err, widget) {

        if (err)

            res.send(err);

        res.json({

            message: 'Widget details loading..',

            data: widget

        });

    });

};

// Handle update widget info

exports.update = function (req, res) {

Widget.findById(req.params.widget_id, function (err, widget) {

        if (err)

            res.send(err);



widget.foo = req.body.name ? req.body.name : widget.foo;

            widget.woo = req.body.woo;

// save the widget and check for errors

        widget.save(function (err) {

            if (err)

                res.json(err);

            res.json({

                message: 'Widget Info updated',

                data: widget

            });

        });

    });

};

// Handle delete widget

exports.delete = function (req, res) {

    Widget.remove({

        _id: req.params.widget_id

    }, function (err, widgets) {

        if (err)

            res.send(err);

res.json({

            status: "success",

            message: 'Widget deleted'

        });

    });

};