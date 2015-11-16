var request = require('supertest');
var app = require('../../app').app;

var List = require('../../app/models/list');

// Test 1 - check if an showLists returns an empty list when there is no data in the database
describe('ListController', function () {
  describe('with no data', function () {
    it('should return an empty list', function (done) {
      request(app).get('/api/lists')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(res.body).toEqual([]);
          done();
        }
      });
    });
  });
});
