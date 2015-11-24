var request = require('supertest');
var app = require('../../app').app;

var List = require('../../app/models/list');

// Test 1 - check if showLists returns an empty list when there is no data in the database
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

  describe('with data', function() {
    var testList;

    beforeEach(function(done) {
      List.create({ list_name: 'test list' }, function(err, newList) {
        if (err) {
          done.fail(err);
        } else {
          testList = newList;
          done();
        }
      });
    });

    // Test 2 - check if showList returns data when there is information in the database
    it('should return a list', function(done) {
      request(app).get('/api/lists')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.length).toEqual(1);
          returnedList = res.body[0];
          expect(returnedList).toBeDefined();
          expect(returnedList.list_name).toEqual(testList.list_name);
          done();
        }
      });
    });

    // Test 3 - check if createList can create an entry in the database
    it('should create a list', function(done) {
      request(app).post('/api/lists/create')
      .send({list_name: 'test List', description: 'Test 3'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.length).toEqual(1);
          returnedList = res.body[0];
          expect(returnedList).toBeDefined();
          expect(returnedList.list_name).toEqual('test List')
          List.remove({_id: returnedList._id} , function (err) {
            if (err) {
              console.log('Failed to remove: ' + err);
            }
          })
          done();
        }
      });
    });

    // Test 4 - check if removeList deletes data when there is information in the database
    it('should remove a list', function(done) {
      request(app).post('/api/lists/delete/' + testList._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        List.findOne({_id: testList._id}, function (err, list) {
          expect(list === null)
          if (!list) {
            done();
          } else if (err) {
            console.log('Failed to remove list: ', err);
            done();
          }
        })
      });
    });

    // Test 5 - check if updateList will update the documents in the database
    it('should update a list', function(done) {
      request(app).post('/api/lists/update/' + testList._id)
      .send({list_name: 'updated list name'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        List.findOne({_id: testList._id}, function (err, list) {
          expect(list.list_name).toEqual("updated list name");
          done();
        })
        if (err) {
          console.log('Failed to update list: ', err);
          done();
        }
      });
    });

    afterEach(function(done) {
      testList.remove(function(err, removedList) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
    });
  });
});
