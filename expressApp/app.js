var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Models
var Item = require('./app/models/item');
var List = require('./app/models/list');
var Board = require('./app/models/board');
var User = require('./app/models/user');

// Database
var mongoose = require('mongoose');

// body-parser middleware for handling request variables (forms)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect to a MongoDB (either local or hosted):
mongoose.connect('mongodb://localhost/angulartodo');
// app.set('superSecret', thisismySecret); //secret variable

// Controllers
var ItemsController = require('./app/controllers/items');
var ListsController = require('./app/controllers/lists');
var UsersController = require('./app/controllers/users');
var BoardsController = require('./app/controllers/boards');
// var AuthenticationController


//--------------------------------------------------------------
// Routes for Users

// show users
app.get('/api/users', UsersController.showUsers);

// create a user
app.post('/api/user/create', UsersController.createUser);

// delete a user
app.post('/api/user/delete/:user_id', UsersController.removeUser);

// update a user
app.post('/api/user/update/:user_id', UsersController.updateUser);


// --------------------------------------------------------------
//Routes for Boards

// show boards
app.get('/api/boards', BoardsController.showMultipleBoards);

// // show one board
app.get('/api/boards/:board_id', BoardsController.showOneBoard);

// // create a board
app.post('/api/boards/create', BoardsController.createBoard);

// // delete a board
app.post('/api/boards/delete/:board_id', BoardsController.removeBoard);

// // update a board
app.post('/api/boards/update/:board_id', BoardsController.updateBoard);


//--------------------------------------------------------------
//Routes for Lists

// show lists
app.get('/api/lists', ListsController.showLists);

// create a list
app.post('/api/lists/create', ListsController.createList);

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



app.listen(3000);
console.log('Connected to port 3000');

// Changing the way we are testing
// do not need to have the node server running this way when we export it
//
module.exports.app = app;
