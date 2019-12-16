var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var moviesSchema = new Schema({
    employeeId : { type: Schema.Types.ObjectId, required: true },
    title : { type: String, required: true },
    synopsis :{ type: String},
    dateReleased :{type: Date, default: Date.now},
    dateDue :{type: Date, default: Date.now},
    numberOfCopies : { type: Number, required: true, default: 1 }
});

module.exports = Mongoose.model('Movies', moviesSchema);


