// Filename: api-routes.js

// Initialize express router

let router = require('express').Router();

// Set default API response

router.get('/', function (req, res) {

    res.json({

        status: 'API Its Working',

        message: 'Welcome to RESTHub crafted with love!'

    });

});



// Import contact controller

var WidgetController = require('./WidgetController');

// Contact routes

router.route('/widget')

    .get(WidgetController.index)

    .post(WidgetController.new);

router.route('/widget/:widget_id')

    .get(WidgetController.view)

    .patch(WidgetController.update)

    .put(WidgetController.update)

    .delete(WidgetController.delete);

// Export API routes

module.exports = router;