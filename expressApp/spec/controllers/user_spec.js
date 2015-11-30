var request = require('supertest');
var app = require('../../app').app;

var User = require('../../app/models/user');

// Test 1 - check if showUsers returns an empty list of users when there is no data in the database
describe('UserController', function () {
  describe('with no data', function () {
    it('should return no users', function (done) {
      request(app).get('/api/users')
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
    var testUser;

    beforeAll(function(done) {
      User.create({ user_name: 'test user' }, function(err, newUser) {
        if (err) {
          done.fail(err);
        } else {
          testUser = newUser;
          done();
        }
      });
    });

    // Test 2 - check if showUser returns data when there is information in the database
    it('should return a user', function(done) {
      request(app).get('/api/user/' + testUser._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          returnedUser = res.body;
          expect(returnedUser).toBeDefined();
          expect(returnedUser.user_name).toEqual(testUser.user_name);
          done();
        }
      });
    });

    // Test 3 - check if createUser can create an entry in the database
    it('should create a user', function(done) {
      request(app).post('/api/user/create')
      .send({user_name: 'test User'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          returnedUser = res.body;
          expect(returnedUser).toBeDefined();
          expect(returnedUser.user_name).toEqual('test User')
          User.remove({_id: returnedUser._id} , function (err) {
            if (err) {
              console.log('Failed to remove: ' + err);
            }
          })
          done();
        }
      });
    });

    // Test 4 - check if updateBoard will update the documents in the database
    it('should update a user', function(done) {
      var updatedUserName = 'Updated User Name';
      request(app).post('/api/user/update/' + testUser._id + '?user_name=' + updatedUserName)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        User.findOne({_id: testUser._id}, function (err, user) {
          expect(user.user_name).toEqual('Updated User Name');
          done();
        })
        if (err) {
          console.log('Failed to update user: ', err);
          done();
        }
      });
    });


    // Test 5 - check if removeUser deletes data when there is information in the database
    it('should remove a user', function(done) {
      request(app).post('/api/user/delete/' + testUser._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        User.findOne({_id: testUser._id}, function (err, user) {
          expect(user === null)
          if (!user) {
            done();
          } else if (err) {
            console.log('Failed to remove user: ', err);
            done();
          }
        })
      });
    });

    afterAll(function(done) {
      testUser.remove(function(err, removedUser) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
    });
  });
});
