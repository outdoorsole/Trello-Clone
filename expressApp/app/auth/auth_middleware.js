// Node Modules
var express = require('express');
var app = require('../../app');
var bcrypt = require('bcrypt-nodejs');

// Used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');

// Models
var User = require('../../app/models/user');

// Route middleware to verify a token
exports.isUserAuthenticated = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(req.originalUrl == '/api/login' || '/api/user/signup'){
    next();
    return;

  // Check header or url parameters or post parameters for token

  // Decodes token
  } else if (token) {

    // Verifies secret
    jwt.verify(token, app.get('superSecret'), function(error, decoded) {
      if (error) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // If secret is verified, request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {

    // If there is no token, return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
