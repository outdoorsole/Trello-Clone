// Node Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Models
var Item = require('./app/models/item');
var List = require('./app/models/list');
var Board = require('./app/models/board');
var User = require('./app/models/user');

// Controllers
var AuthController = require('./app/auth/authentication');
var ItemsController = require('./app/controllers/items');
var ListsController = require('./app/controllers/lists');
var UsersController = require('./app/controllers/users');
var BoardsController = require('./app/controllers/boards');

// Middleware
var AuthMiddleware = require('./app/auth/auth_middleware');

// Database
var mongoose = require('mongoose');

// Connect to a MongoDB (either local or hosted):
mongoose.connect('mongodb://localhost/angulartodo');

// Database configuration (secret for tokens, & database)
app.set('superSecret', 'thy3jbfv6dqwe9rtypoi1uy')

// Set port - used to create, sign, and verify tokens
var port = process.env.PORT || 3000;

// To log requests
var morgan = require('morgan');

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Body-parser middleware for handling request variables (forms)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Route middleware to verify a token when the route begins with '/api'
app.use('/api', AuthMiddleware.isUserAuthenticated);
//--------------------------------------------------------------
// Base route
app.get('/', function(req, res) {
  res.send('The API is at http://localhost:' + port + '/api');
});

//--------------------------------------------------------------
// Sign up route
app.route('/api/signup')

  // Show the sign up page (GET http://localhost:port/signup)
  .get(function(req, res) {
    res.send('This is the signup route!');
  })

  // Process the form (POST http://localhost:port/signup)
  .post(function(req, res) {
    res.send('This is the signup route!');
  })

//--------------------------------------------------------------
// // Log in route
// app.route('/api/login')

//   // Show the log in page (GET http://localhost:port/login)
//   .get(function(AuthController.isUserAuthenticated))

//   // Process the form (POST http://localhost:port/login)
//   .post(function(AuthController.isUserAuthenticated))


//--------------------------------------------------------------
// Route to authenticate a user on sign in (POST http://localhost:3000/api/authenticate)
app.post('/api/login', AuthController.isUserAuthenticated);

//--------------------------------------------------------------
// Routes for Users

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
