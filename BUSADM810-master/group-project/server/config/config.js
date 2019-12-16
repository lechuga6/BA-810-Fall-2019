var path = require('path'),
rootPath = path.normalize(__dirname + '/..'),
env = process.env.NODE_ENV || 'development';
var config = {
development: {
    root: rootPath,
    app: { name: 'UCCSS' },
    port: 5000,
  db: 'mongodb://127.0.0.1/movie-dev',
  secret: "cayennedlikedhistreats"
},
test: {
    root: rootPath,
    app: { name: 'TrackMovies' },
    port: 4000,
     db :'mongodb://127.0.0.1/movie-test',
     secret: "cayennedlikedhistreats"
    },
    
production: {
    root: rootPath,
    app: { name: 'UCCSS' },
    port: 80,
     db: 'mongodb://127.0.0.1/movie-production',
     secret: "cayennedlikedhistreats"
}
};

module.exports = config[env];


