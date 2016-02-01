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
  User.findOne({ name: req.body.name }, function (req, res) {
    if (error) {
      throw error;
    }
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
};
