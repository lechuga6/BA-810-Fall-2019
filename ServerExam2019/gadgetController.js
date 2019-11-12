
// WidgetController.js

// Import contact model

Gadget = require('./gadgetModel');

// Handle index actions

exports.index = function (req, res) {

    Gadget.get(function (err, gadget) {

        if (err) {

            res.json({

                status: "error",

                message: err,

            });

        }

        res.json({

            status: "success",

            message: "gadget retrieved successfully",

            data: gadget

        });

    });

};


exports.new = function (req, res) {

    var gadget = new Gadget();

    gadget.yoo = req.body.yoo ? req.body.yoo : gadget.yoo;

    gadget.hoo = req.body.hoo;



gadget.save(function (err) {

        if (err)

            res.json(err);

res.json({

            message: 'New gadget created!',

            data: gadget

        });

    });

};


exports.view = function (req, res) {

    Gadget.findById(req.params.widget_id, function (err, gadget) {

        if (err)

            res.send(err);

        res.json({

            message: 'Gadget details loading..',

            data: gadget

        });

    });

};

exports.update = function (req, res) {

Gadget.findById(req.params.gadget_id, function (err, gadget) {

        if (err)

            res.send(err);



gadget.yoo = req.body.name ? req.body.name : gadget.yoo;

            gadget.hoo = req.body.hoo;


        gadget.save(function (err) {

            if (err)

                res.json(err);

            res.json({

                message: 'gadget Info updated',

                data: gadget

            });

        });

    });

};

// Handle delete widget

exports.delete = function (req, res) {

    Gadget.remove({

        _id: req.params.gadget_id

    }, function (err, gadgets) {

        if (err)

            res.send(err);

res.json({

            status: "success",

            message: 'Gadget deleted'

        });

    });

};