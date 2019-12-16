var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var WidgetsSchema = new Schema({    
    Foo: { type: String, requred: true },    
    Woo: { type: Number, requred: true, default: 10 }
});

module.exports =  Mongoose.model('Widgets', WidgetsSchema);