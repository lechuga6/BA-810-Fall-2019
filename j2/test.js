process.env.NODE_ENV = 'test';
const mongoose = require("mongoose"),
    Gadget = require('../ServerExam2019/gadgetModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

it('it should GET the gadgets file', (done) => {
    chai.request(server)
        .get('/gadget')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
});


describe('Gadget', () => {
    beforeEach((done) => {
        Gadget.remove({}, (err) => {
            done();
        });
    });
    it('it should GET all the gadgets', (done) => {
        var gadget = new Gadget({
            "Yoo": "Jane",
            "Hoo": 10
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

    it('it should DELETE gadget given the id', (done) => {
        var gadget = new Gadget({
            "Yoo": "Jane",
            "Hoo": 12,
           
        });
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