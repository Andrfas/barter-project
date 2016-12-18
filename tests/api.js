var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var should = chai.should();

chai.use(chaiHttp);

describe('/GET book', function() {
      it('it should GET all the books', function(done) {
        chai.request('http://localhost:1337')
            .post('/api/articles')
            .end(function(err, res) {
            	if (err) {
                    done(err);
                } else {
                    done();
                }
                // res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
            });
      });
  });