var mongoose = require("mongoose"),
    Gadget = require('../app/models/gadgets');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Gadget', () => {

    var GADGET_ID;

    beforeEach((done) => { 
        Gadget.remove({}, (err) => {
            done();
        });
    });

    it('it should GET all the gadgets', (done) => {    
        var gadget = new Gadget({        
            "Yoo": "Jane",
            "Hoo": "10"  
        });    
        gadget.save((err, gadget) => {        
            chai.request(server)            
            .get('/api/gadgets')            
            .end((err, res) => {                
                res.should.have.status(200);                
                res.body.should.be.a('array');                
                res.body.length.should.be.eql(1);                
                done();            
            });    
        });
    });

    it('it should GET a gadget by the given id', (done) => {
        var gadget = new Gadget({        
            "Yoo": "Jane",
            "Hoo": "10"  
        });  
        gadget.save((err, gadget) => {
            chai.request(server)
                .get('/api/gadgets/' + gadget._id)
                .send(gadget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Yoo');
                    res.body.should.have.property('Hoo');
                    res.body.should.have.property('_id').eql(gadget._id.toString());
                    done();
                });
            });
    });

    it('it should DELETE a gadget given the id', (done) => {        
        var gadget = new Gadget({  
            "gadgetId": GADGET_ID,            
            "Yoo": "Jane",
            "Hoo": "10"        
        })        
        gadget.save((err, gadget) => {
            chai.request(server)
            .delete('/api/gadgets/' + gadget.id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });         
        });    
    });
});