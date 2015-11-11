var request = require('supertest');
var app = require('../../app').app;

describe('Items', function() {
  describe('with no data', function() {
    it('should return an empty list', function() {
      request(app).get('items')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done.fail(err);
        } else {
          expect(res.body).toEqual([]);
          done();
        }
      });
    });
  });
})

//.end triggers the function for you
// if there is not an error
// expect the body to be an empty string
// the response is just json
// can test what the data should look like
// can test the data that is coming back from any of our api calls




