var bodyParser = require('body-parser');
//------------------------------------------------------------------------------------//
// Models
var Board = require('../models/board');

//------------------------------------------------------------------------------------//

// Show multiple boards for one user
exports.showMultipleBoards = function (req, res) {
  Board.find({ _user: req.params.user_id }, function(error, foundBoards) {
    if (foundBoards) {
      res.json(foundBoards);
    } else if (error) {
      console.error(error.stack);
    }
  });
}

exports.showOneBoard = function (req, res) {
  console.log('This is req: ', req);
  Board.findOne({ _id: req.params.board_id }, function(error, foundBoard) {
    if (foundBoard) {
      res.json(foundBoard);
    } else if (error) {
      console.error(error.stack);
    }
  });
}

// Optimize error handling
// Don't do the find (line 39)
// leave it as just the save
exports.createBoard = function (req, res) {
  var board = new Board({
    board_name: req.body.board_name,
    _user: req.params.user_id
  });
  board.save(function(err, savedBoard) {
    if (savedBoard) {
      Board.findOne({ board_name: req.body.board_name}, function(error, returnedBoard) {
        if (returnedBoard) {
          res.json(returnedBoard);
        } else if (err) {
          console.log('Failed to find: ' + err);
        }
      })
    }
  })
}


exports.removeBoard = function (req, res) {
  var board = new Board ({ _id: req.params.board_id});
  board.remove(function (error, deletedBoard) {
    if (deletedBoard) {
      res.json(deletedBoard);
    } else if (error) {
      console.log(error.stack);
    }
  })
}

exports.updateBoard = function (req, res) {
  Board.findOne({ _id: req.params.board_id }, function (err, foundBoard) {
    if (foundBoard) {
      foundBoard.board_name = req.query.board_name;
      foundBoard.save();
      res.json(foundBoard);
    } else if (err) {
      console.log('Failed to find and update board: ', err);
    }
  });
}
