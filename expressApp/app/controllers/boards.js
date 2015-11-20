var bodyParser = require('body-parser');
//------------------------------------------------------------------------------------//
// Models
var Board = require('../models/board');

//------------------------------------------------------------------------------------//

exports.showBoard = function (req, res) {
  Board.find({}, function(error, foundBoard) {
    if (foundBoard) {
      res.json(foundBoard);
    } else if (error) {
      console.error(error.stack);
    }
  });
}

exports.createBoard = function (req, res) {
  var board = new Board({
    board_name: req.body.board_name,
    description: req.body.description
  });
  board.save(function(err, savedBoard) {
    if (savedBoard) {
      Board.find({ board_name: req.body.board_name}, function(error, returnedBoard) {
        if (returnedBoard) {
          res.json(returnedBoard)
        } else if (err) {
          console.log('Failed to save: ' + err);
        }
      })
    }
  })
}


exports.removeBoard = function (req, res) {
  var board = new Board ({ _id: req.params.board_id})
  board.remove(function (error, deletedBoard) {
    if (deletedBoard) {
      res.json(deletedBoard);
    } else if (error) {
      console.log(error.stack);
      res.redirect('/error');
    }
  })
}


exports.updateBoard = function (req, res) {
  var board = { _id: req.params.board_id};
  Board.update(board, {board_name: req.body.board_name}, function (error, updatedBoard) {
    if (updatedBoard) {
      Board.findOne({_id: updatedBoard._id}, function (error, returnedBoard) {
        res.json(returnedBoard)
      })
    } else if (error) {
      console.log(error.stack);
      res.redirect('/error');
    }
  })
}
