var bodyParser = require('body-parser');
//------------------------------------------------------//

// Models
var User = require('../models/user');

//------------------------------------------------------//

exports.showMultipleUsers = function (req, res) {
  User.find({}, function(error, users) {
    if (users) {
      console.log('These are the users: ', users);
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
  var user = new User({
    user_name: req.body.user_name
  })
  user.save(function(err, savedUser) {
    if (savedUser) {
      User.findOne({ user_name: req.body.user_name}, function(error, returnedUser) {
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
