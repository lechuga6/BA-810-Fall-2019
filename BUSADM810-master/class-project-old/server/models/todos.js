var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var statuses = ['Todo', 'In Progress', 'Completed'];

var ToDoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },    
    todo: { type: String, requred: true },
    detail: { type: String },
    dateCreated: { type: Date, default: Date.now },
    dateDue: { type: Date, default: Date.now },
    status: { type: String, enum: statuses, default: statuses[0] }, 
    file: {
        fileName: { type: String },
        originalName: { type: String }
    }
});

module.exports =  Mongoose.model('ToDo', ToDoSchema);