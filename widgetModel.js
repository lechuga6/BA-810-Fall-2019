// widgetModel.js

var mongoose = require('mongoose');

// Setup schema

var widgetSchema = mongoose.Schema({
    foo: {type: String, required: true},
    woo: {type: Number, default: 10}
});

// Export Widget model

var Widget = module.exports = mongoose.model('widget', widgetSchema);

module.exports.get = function (callback, limit) {

    Widget.find(callback).limit(limit);

}