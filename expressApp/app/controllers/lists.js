var bodyParser = require('body-parser');
//------------------------------------------------------------------------------------//
// Models
var List = require('../models/list');

//------------------------------------------------------------------------------------//

exports.showLists = function (req, res) {
  List.find({ _board: req.params.board_id }, function(error, lists) {
    if (lists) {
      res.json(lists);
    } else if (error) {
      console.error(error.stack);
    }
  });
}

exports.createList = function (req, res) {
  var list = new List({
    list_name: req.body.list_name,
    description: req.body.description,
    _board: req.params.board_id
  });
  list.save(function(err, savedList) {
    if (savedList) {
      List.findOne({ list_name: req.body.list_name}, function(error, returnedList) {
        if (returnedList) {
          res.json(returnedList)
        } else if (err) {
          console.log('Failed to save: ' + err);
        }
      });
    }
  });
}

exports.removeList = function (req, res) {
  List.findById({ _id: req.params.list_id}, function (err, foundList) {
    if (foundList) {
      foundList.remove(function (error, deletedList) {
        if (deletedList) {
          res.json(deletedList);
        } else if (error) {
          console.log('Failed to remove list: ', err);
        }
      });
    } else if (err) {
      console.log('Failed to find queried list: ', err);
    }
  });
}

exports.updateList = function (req, res) {
  List.findOne({ _id: req.params.list_id }, function (err, foundList) {
    if (foundList) {
      foundList.list_name = req.query.list_name;
      foundList.save();
      res.json(foundList);
    } else if (err) {
      console.log('Failed to find and update list: ', err);
    }
  });
}

