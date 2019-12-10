// widgetModel.js

var mongoose = require('mongoose');

// Setup schema

var gadgetSchema = mongoose.Schema({
    yoo: {type: String, required: true},
    hoo: {type: Number, default: 10}
});

// Export Widget model

var Gadget = module.exports = mongoose.model('gadget', gadgetSchema);

module.exports.get = function (callback, limit) {

    Gadget.find(callback).limit(limit);

}