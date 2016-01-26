// Node Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// To log requests
var morgan = require('morgan');

// Models
var Item = require('./app/models/item');
var List = require('./app/models/list');
var Board = require('./app/models/board');
var User = require('./app/models/user');

// Database
var mongoose = require('mongoose');

// Database configuration (secret for tokens, & database)
app.set('superSecret', 'thy3jbfv6dqwe9rtypoi1uy')

// body-parser middleware for handling request variables (forms)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Set port - used to create, sign, and verify tokens
var port = process.env.PORT || 3000;

// Connect to a MongoDB (either local or hosted):
mongoose.connect('mongodb://localhost/angulartodo');

// Controllers
var ItemsController = require('./app/controllers/items');
var ListsController = require('./app/controllers/lists');
var UsersController = require('./app/controllers/users');
var BoardsController = require('./app/controllers/boards');

// TODO: route to authenticate a user (POST http://localhost:3000/api/authenticate)

// TODO: route middleware to verify a token


// // Route middleware to validate :name
// app.use(function(req, res, next) {

//   console.log(req.method, req.url);

//   next();
// });

// // Route middleware to validate :name
// app.param('name', function(req, res, next, name) {
//   console.log('doing some validations on ' + name);

//   req.name = name;

//   next();
// });

//--------------------------------------------------------------
// Login routes
app.route('/login')

  // show the form (GET http://localhost:8080/login)
  .get(function(req, res) {
    res.send('this is the login form');
  })

  // process the form (POST http://localhost:8080/login)
  .post(function(req, res) {
    console.log('processing');
    res.send('processing the login form!');
  });

// Route to authenticate a user (POST http://localhost:3000/api/authenticate)
app.post('/authenticate', function(req, res) {

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
});


//--------------------------------------------------------------
// Route to show a random message (GET http://localhost:3000/api/)
app.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// Route to return all users (GET http://localhost:3000/api/users)
app.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


//--------------------------------------------------------------
// Basic route
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

//--------------------------------------------------------------
// Basic route
app.get('/sample', function(req, res) {
  res.send('This is a sample!');
});

//--------------------------------------------------------------
// Route with parameters (http://localhost:3000/hello/:name)
app.get('/hello/:name', function(req, res) {
  res.send('hello ' + req.name + '!');
});

//--------------------------------------------------------------
// Routes for Users

// show users
app.get('/api/users', UsersController.showMultipleUsers);

// show one user
app.get('/api/user/:user_id', UsersController.showOneUser);

// create a user
app.post('/api/user/create', UsersController.createUser);

// delete a user
app.post('/api/user/delete/:user_id', UsersController.removeUser);

// update a user
app.post('/api/user/update/:user_id', UsersController.updateUser);


// --------------------------------------------------------------
//Routes for Boards

// show boards
app.get('/api/boards/:user_id', BoardsController.showMultipleBoards);

// // show one board
app.get('/api/boards/:board_id', BoardsController.showOneBoard);

// // create a board
app.post('/api/boards/create/:user_id', BoardsController.createBoard);

// // delete a board
app.post('/api/boards/delete/:board_id', BoardsController.removeBoard);

// // update a board
app.post('/api/boards/update/:board_id', BoardsController.updateBoard);


//--------------------------------------------------------------
//Routes for Lists

// show lists
app.get('/api/lists/:board_id', ListsController.showLists);

// create a list
app.post('/api/lists/create/:board_id', ListsController.createList);

// delete a list
app.post('/api/lists/delete/:list_id', ListsController.removeList);

// update a list
app.post('/api/lists/update/:list_id', ListsController.updateList);


//--------------------------------------------------------------
//Routes for Items

// show items
app.get('/api/items/:list_id', ItemsController.showItems);

// create items
app.post('/api/item/create/:list_id', ItemsController.createItem);

// delete item
app.post('/api/item/delete/:id', ItemsController.removeItem);

// update item
app.post('/api/item/update/:id', ItemsController.updateItem);


//--------------------------------------------------------------

app.listen(port);
console.log('Connected to port ' + port);

//--------------------------------------------------------------
module.exports.app = app;
