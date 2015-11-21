var bodyParser = require('body-parser');
//------------------------------------------------------//

// Models
var User = require('../models/user');

//------------------------------------------------------//

exports.showUsers = function (req, res) {
  console.log('We are in the showUsers action');
  User.find({}, function(error, users) {
    console.log('method fired');
    if (users) {
      console.log('Users: ', users);
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

exports.removeUser = function (req, res) {
  var User = new User ({ _id: req.params.user_id})
  user.remove(function (error, deletedUser) {
    if (deletedUser) {
      res.json (deletedUser);
    } else if (error) {
      console.log(error.stack);
    }
  })
}

exports.updateUser = function (req, res) {
  var User = { _id: req.params.user_id};
  User.update(user, {user_name: req.body.user_name}, function (error, updatedUser) {
    if (updatedUser) {
      User.findOne({_id: updatedUser.id}, function (error, returnedUser) {
        res.json(returnedUser)
      })
    } else if (error) {
      console.log(error.stack);
    }
  })
}
