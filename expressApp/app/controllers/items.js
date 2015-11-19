var bodyParser = require('body-parser');
//------------------------------------------------------------------------------------//
// Models
var Item = require('../models/item');

//------------------------------------------------------------------------------------//

// need to update to take parameters
// add them to the angular app
exports.showItems = function (req, res) {
  Item.find({}, function(error, items) {
    // console.log('Here are the items: ', items);
    if (items) {
      res.json(items);
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
    _list: req.query.list_id
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
  var item = new Item ({ _id: req.params.id})
  item.remove(function (error, deletedItem) {
    if (deletedItem) {
      res.json(deletedItem)
    } else if (error) {
      console.log(error.stack);
      res.redirect('/error');
    }
  })
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
