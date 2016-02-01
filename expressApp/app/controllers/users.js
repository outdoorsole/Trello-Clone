var bodyParser = require('body-parser');
//------------------------------------------------------//

// Models
var User = require('../models/user');

//------------------------------------------------------//

exports.showMultipleUsers = function (req, res) {
  User.find({}, function(error, users) {
    if (users) {
      res.json(users);
    } else if (error) {
      console.error(error.stack);
    }
  });
}

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
  console.log('We are now in the server createUser: ');
  console.log('------------------');
  var user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  console.log('This is user: ', user);
  user.save(function(error, savedUser) {
    console.log('This is savedUser: ', savedUser);
    console.log('This is error: ', error);
    if (savedUser) {
      User.findOne({ user_name: req.body.user_name}, function(error, returnedUser) {
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
