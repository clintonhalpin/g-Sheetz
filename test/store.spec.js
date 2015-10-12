var expect = require("chai").expect;
var request = require("request");
var boot = require('../server').boot;
var port = require('../server').port;
var shutdown = require('../server').shutdown;
var creds = require('./../etc/.env.js')

describe("API", function(){

    var url = "http://localhost:" + port + "/";

    before(function () {
      boot();
    });

    it("should respond 200 with simple GET", function(done) {
      request.get(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
 
    it("should fail POST to api/store without credentials", function(done) {
      request.post(url + 'api/store', function(error, response, body) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it("should succeed POST to api/store with valid credentials and data", function(done) {
      var params = {
        url: url + 'api/store',
        headers: {
          username: creds.username,
          password: creds.password
        },
        form: {
          test: 'Holler'
        }
      }
      request.post(params, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("should return rows GET to api/store", function(done) {
      var params = {
        url: url + 'api/store'
      }
      request.get(params, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    

    after(function () {
      shutdown();
    });
})
