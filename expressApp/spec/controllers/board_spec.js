var request = require('supertest');
var app = require('../../app').app;

var Board = require('../../app/models/board');

// Test 1 - check if showBoard returns an empty board when there is no data in the database
describe('BoardController', function () {
  describe('with no data', function () {
    it('should return an empty board', function (done) {
      request(app).get('/api/boards')
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
    var testBoard;

    beforeEach(function(done) {
      Board.create({ board_name: 'test board' }, function(err, newBoard) {
        if (err) {
          done.fail(err);
        } else {
          testBoard = newBoard;
          done();
        }
      });
    });

    // Test 2 - check if showBoard returns data when there is information in the database
    it('should return a board', function(done) {
      request(app).get('/api/boards')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.length).toEqual(1);
          returnedBoard = res.body[0];
          expect(returnedBoard).toBeDefined();
          expect(returnedBoard.board_name).toEqual(testBoard.board_name);
          done();
        }
      });
    });

    // Test 3 - check if createBoard can create an entry in the database
    it('should create a board', function(done) {
      request(app).post('/api/boards/create')
      .send({board_name: 'test Board', description: 'Test 3'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.length).toEqual(1);
          returnedBoard = res.body[0];
          expect(returnedBoard).toBeDefined();
          expect(returnedBoard.board_name).toEqual('test Board')
          Board.remove({_id: returnedBoard._id} , function (err) {
            if (err) {
              console.log('Failed to remove: ' + err);
            }
          })
          done();
        }
      });
    });

    // Test 4 - check if removeBoard deletes data when there is information in the database
    it('should remove a board', function(done) {
      request(app).post('/api/boards/delete/' + testBoard._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        Board.findOne({_id: testBoard._id}, function (err, board) {
          expect(board === null)
          if (!board) {
            done();
          } else if (err) {
            console.log('Failed to remove board: ', err);
            done();
          }
        })
      });
    });

    // Test 5 - check if updateBoard will update the documents in the database
    it('should update a board', function(done) {
      request(app).post('/api/boards/update/' + testBoard._id)
      .send({board_name: 'updated board name'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        Board.findOne({_id: testBoard._id}, function (err, board) {
          expect(board.board_name).toEqual("updated board name");
          done();
        })
        if (err) {
          console.log('Failed to update board: ', err);
          done();
        }
      });
    });

    afterEach(function(done) {
      testBoard.remove(function(err, removedBoard) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
    });
  });
});
