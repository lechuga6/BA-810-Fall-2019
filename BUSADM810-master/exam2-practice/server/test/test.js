var mongoose = require("mongoose"),
    Widget = require('../app/models/widgets');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Widget', () => {
    beforeEach((done) => { 
        Widget.remove({}, (err) => {
            done();
        });
    });
   
    it('it should POST a widget', (done) => {
        var widget = {
            "Foo": "Jane",
            "Woo": "10"}
            chai.request(server)
                .post('/api/widgets')
                .send(widget)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('Foo');
                    res.body.Foo.should.be.a('string');
                    res.body.Foo.should.equal('Jane');
                    res.body.should.have.property('Woo');
                    res.body.Foo.should.be.a('number');
                    res.body.Foo.should.equal('10');
                    done();
                });
    });

    it('it should not POST a widget without Foo field', (done) => {
        var widget = {
            "Woo": "10"}
            chai.request(server)
                .post('/api/widgets')
                .send(widget)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
    });

    it('it should GET all the widgets', (done) => {    
        var widget = new Widget({        
            "Foo": "Jane",
            "Woo": "10"  
        });    
        widget.save((err, widget) => {        
            chai.request(server)            
            .get('/api/widgets')            
            .end((err, res) => {                
                res.should.have.status(200);                
                res.body.should.be.a('array');                
                res.body.length.should.be.eql(1);                
                done();            
            });    
        });
    });

    it('it should GET a widget by the given id', (done) => {
        var widget = new Widget({        
            "Foo": "Jane",
            "Woo": "10"  
        });  
        widget.save((err, widget) => {
            chai.request(server)
                .get('/api/widgets/' + widget._id)
                .send(widget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Foo');
                    res.body.should.have.property('Woo');
                    res.body.should.have.property('_id').eql(user._id.toString());
                    done();
                });
            });
    });
});