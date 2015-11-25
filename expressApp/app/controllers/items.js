var bodyParser = require('body-parser');
//------------------------------------------------------------------------------------//
// Models
var Item = require('../models/item');
var List = require('../models/list');

//------------------------------------------------------------------------------------//

// need to update to take parameters
// add them to the angular app
exports.showItems = function (req, res) {
  Item.find({ _list: req.params.list_id}, function(error, foundItems) {
    if (foundItems) {
      res.json(foundItems);
    } else if (error) {
      console.error(error.stack);
      res.json({status: 400, message: error.message});
    }
  });
}


exports.createItem = function (req, res) {
  var item = new Item({
    item_name: req.body.item_name,
    description: req.body.description,
    _list: req.params.list_id
  });
  item.save(function(err, savedItem) {
    if (savedItem) {
      res.json(savedItem)
    } else if (err) {
      console.log('Failed to save: ' + err);
    }
  })
}


exports.removeItem = function (req, res) {
  console.log('This is req.params.id in removeItem in Express App: ', req.params.id);
  var queriedItem = Item.findById({ _id: req.params.id}, function (err, foundItem) {
    if (foundItem) {
      console.log('This is the foundItem in removeItem controller: ', foundItem);
      var foundItemName = foundItem.item_name;
      foundItem.remove(function (error, deletedItem) {
        if (deletedItem) {
          console.log('This is the deletedItem from the database: ', deletedItem);
          res.json(deletedItem);
        } else if (err) {
          console.log('Failed to remove item: ', err);
        }
      });
    } else if (err) {
      console.log('Failed to find queried item: ', err);
    }
  });
}


exports.updateItem = function (req, res) {
  var item = { _id: req.params.id};
  Item.update(item, {item_name: req.query.item_name}, function (error, updatedItem) {
    if (updatedItem) {
      Item.findOne({item_name: updatedItem.item_name}, function (error, foundItem) {
        res.json(foundItem)
      })
    } else if (error) {
      console.log(error.stack);
      //*Update this later**//
      res.redirect('/error');
    }
  })
}
