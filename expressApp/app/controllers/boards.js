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
