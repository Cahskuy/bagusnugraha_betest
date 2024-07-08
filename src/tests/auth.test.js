const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe("Auth", () => {
  describe("POST /api/auth/login", () => {
    it("should login and return a JWT token", (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({ userName: "testUser", password: "testPassword" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
    });
  });
});
