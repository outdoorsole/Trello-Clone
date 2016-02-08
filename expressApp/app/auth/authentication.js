// Node Modules
var express = require('express');
var app = require('../../app');
var bcrypt = require('bcrypt-nodejs');

// Used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');

// Models
var User = require('../../app/models/user');

exports.isUserAuthenticated = function(req, res) {
  // find the User
  User.findOne({ email: req.body.email }, function (error, foundUser) {
    if (error) {
      throw error;
    }
    if (!foundUser) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (foundUser) {

      // check if password matches
      if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right create a token
        var token = jwt.sign(foundUser, app.app.settings.superSecret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          name: foundUser.name,
          username: foundUser.username,
          _id: foundUser._id,
          email: foundUser.email,
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
};
