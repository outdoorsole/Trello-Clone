// Node modules
var bodyParser = require('body-parser');

// Bcrypt for encryption of password
 var bcrypt = require('bcrypt-nodejs');
//------------------------------------------------------//
// Models
var User = require('../models/user');
//------------------------------------------------------//

// Show one user
exports.showOneUser = function (req, res) {
  User.findOne({ _id: req.params.user_id }, function(error, foundUser) {
    if (foundUser) {
      res.json(foundUser);
    } else if (error) {
      console.error(error.stack);
    }
  });
}

exports.createUser = function (req, res) {
  var password = req.body.password;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  console.log('This is pw, salt, & hash: ', password, salt, hash);
  var user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash
  })

  user.save(function(error, savedUser) {
    if (savedUser) {
      User.findOne({ user_name: req.body.username}, function(error, returnedUser) {
        if (returnedUser) {
          res.json(returnedUser)
        } else if (error) {
          console.log('Failed to save: ', error);
        }
      })
    } else {
      console.log('Failed to save: ', error);
    }
  })
}

exports.removeUser = function (req, res) {
  var user = new User ({ _id: req.params.user_id});
  user.remove(function (error, deletedUser) {
    if (deletedUser) {
      res.json(deletedUser);
    } else if (error) {
      console.log(error.stack);
    }
  })
}

exports.updateUser = function (req, res) {
  User.findOne({ _id: req.params.user_id }, function (error, foundUser) {
    if (foundUser) {
      foundUser.user_name = req.query.user_name;
      foundUser.save();
      res.json(foundUser);
    } else if (error) {
      console.log('Failed to find and update user: ', error);
    }
  });
}
