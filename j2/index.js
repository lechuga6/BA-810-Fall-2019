

let express = require('express');
let bodyParser = require('body-parser');

let mongoose = require('mongoose');
let app = express();


let apiRoutes = require("./api-routes");

app.use(bodyParser.urlencoded({

    extended: true

}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});

var db = mongoose.connection;

if(!db)

    console.log("Error connecting db")

else

    console.log("Db connected successfully")

var port = process.env.PORT || 1337;

app.get('/', (req, res) => res.send('Server Exam'));



app.use('/api', apiRoutes);

app.listen(port, function () {

    console.log("Running server on port " + port);

});
