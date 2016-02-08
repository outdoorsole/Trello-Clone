// Node modules
var bodyParser = require('body-parser');

// Bcrypt for encryption of password
 var bcrypt = require('bcrypt-nodejs');
//------------------------------------------------------//
// Models
var User = require('../models/user');
//------------------------------------------------------//

// Show all users
exports.showMultipleUsers = function (req, res) {
  User.find({}, function(error, users) {
    console.log('This is the list of found users in showMultipleUsers (server): ', users);
    if (users) {
      res.json(users);
    } else if (error) {
      console.error(error.stack);
    }
  });
}

// Show one user
exports.showOneUser = function (req, res) {
  User.findOne({ _id: req.params.user_id }, function(error, foundUser) {
    console.log('This is the foundUser in showOneUser (server): ', foundUser);
    if (foundUser) {
      res.json(foundUser);
    } else if (error) {
      console.error(error.stack);
    }
  });
}

// User Login
exports.loginUser = function(req, res) {
  var password = req.body.password;
  var email = req.body.email;
  User.findOne({ email: email })
  .populate('boards')
  .exec(function (error, foundUser) {
    if (foundUser) {
      console.log('This is password: ', password);
      console.log('This is email: ', email);
      console.log('This is foundUser.password: ', foundUser.password);
      if (bcrypt.compareSync(password, foundUser.password)) {
        res.json(foundUser);
      }
    } else if (error) {
      console.error(error.stack);
      res.json({status: 400, message: error.message});
    }
  })
  };

exports.createUser = function (req, res) {
  var password = req.body.password;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  var user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash
  })

  user.save(function(error, savedUser) {
    if (savedUser) {
      User.findOne({ username: req.body.username}, function(error, returnedUser) {
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
