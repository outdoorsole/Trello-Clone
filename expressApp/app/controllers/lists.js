var bodyParser = require('body-parser');
//------------------------------------------------------------------------------------//
// Models
var List = require('../models/list');

//------------------------------------------------------------------------------------//

exports.showLists = function (req, res) {
  console.log('This is req.params: ', req.params);
  List.find({ _board: req.params.board_id }, function(error, lists) {
    if (lists) {
      res.json(lists);
    } else if (error) {
      console.error(error.stack);
    }
  });
}


exports.createList = function (req, res) {
  console.log('This is req.params: ', req.params);
  var list = new List({
    list_name: req.body.list_name,
    description: req.body.description,
    _board: req.params.board_id
  });
  list.save(function(err, savedList) {
    if (savedList) {
      List.find({ list_name: req.body.list_name}, function(error, returnedList) {
        if (returnedList) {
          res.json(returnedList)
        } else if (err) {
          console.log('Failed to save: ' + err);
        }
      })
    }
  })
}


exports.removeList = function (req, res) {
  var list = new List ({ _id: req.params.list_id})
  list.remove(function (error, deletedList) {
    if (deletedList) {
      res.json(deletedList);
    } else if (error) {
      console.log(error.stack);
      res.redirect('/error');
    }
  })
}


exports.updateList = function (req, res) {
  var list = { _id: req.params.list_id};
  List.update(list, {list_name: req.body.list_name}, function (error, updatedList) {
    if (updatedList) {
      List.findOne({_id: updatedList._id}, function (error, returnedList) {
        res.json(returnedList)
      })
    } else if (error) {
      console.log(error.stack);
      res.redirect('/error');
    }
  })
}
