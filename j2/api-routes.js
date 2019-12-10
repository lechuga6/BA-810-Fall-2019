

let router = require('express').Router();


router.get('/', function (req, res) {

    res.json({

        status: 'API Its Working',

        message: 'hi'

    });

});

var GadgetController = require('./GadgetController');



router.route('/gadget')

    .get(GadgetController.index)

    .post(GadgetController.new);

router.route('/gadget/:gadget_id')

    .get(GadgetController.view)

    .patch(GadgetController.update)

    .put(GadgetController.update)

    .delete(GadgetController.delete);


module.exports = router;