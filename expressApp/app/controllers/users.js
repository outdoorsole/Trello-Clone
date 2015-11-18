var bodyParser = require('body-parser');
//------------------------------------------------------//

// Models
var User = require('../models/list');

//------------------------------------------------------//

exports.showUsers = function (req, res) {
  User.find({}, function(error, lists) {
    if (users) {
      res.json(users);
    } else if (error) {
      console.error(error.stack);
    }
  });
}

exports.createUser = function (req, res) {
  var user = new User({
    user_name: req.body.user_name
  })
  user.save(function(err, savedUser) {
    if (savedUser) {
      User.find( { user_name: req.body.user_name}, function(error, returnedUser) {
        if (returnedUser) {
          res.json(returnedUser)
        } else if (err) {
          console.log('Failed to save: ' + err);
        }
      })
    }
  })
}
