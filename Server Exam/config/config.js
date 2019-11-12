var path = require('path'),
rootPath = path.normalize(__dirname + '/..'),
env = process.env.NODE_ENV || 'development';
var config = {
development: {
    root: rootPath,
    app: { name: 'UCCSS' },
    port: 5000,
  db: 'mongodb://127.0.0.1/todo-dev',
  secret: "2330wmaplest"
},
test: {
    root: rootPath,
    app: { name: 'ThingsToDo' },
    port: 4000,
     db :'mongodb://127.0.0.1/todo-test',
     secret: "2330wmaplest"
    },
    
production: {
    root: rootPath,
    app: { name: 'UCCSS' },
    port: 80,
     db: 'mongodb://127.0.0.1/todo-production',
     secret: "2330wmaplest"
}
};

module.exports = config[env];