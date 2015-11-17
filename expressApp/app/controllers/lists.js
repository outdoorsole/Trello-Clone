var bodyParser = require('body-parser');
//------------------------------------------------------------------------------------//
// Models
var List = require('../models/list');

//------------------------------------------------------------------------------------//

exports.showLists = function (req, res) {
  List.find({}, function(error, lists) {
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
    description: req.body.description
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
  console.log('This is req.body.list_name: ', req.body.list_name);
  List.update(list, {list_name: req.body.list_name}, function (error, updatedList) {
    if (updatedList) {
      List.find({}, function (error, allLists) {
        res.json(allLists)
      })
    } else if (error) {
      console.log(error.stack);
      res.redirect('/error');
    }
  })
}
