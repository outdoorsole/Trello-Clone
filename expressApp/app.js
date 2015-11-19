var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');

// Models
var Item = require('./app/models/item');
var List = require('./app/models/list');

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
// var AuthenticationController

//--------------------------------------------------------------
//Routes for Items

// show items
app.get('/api/items', ItemsController.showItems);

// /create items
app.post('/api/item/create', ItemsController.createItem);

// delete item
app.post('/api/item/delete/:id', ItemsController.removeItem);

// update item
app.post('/api/item/update/:id', ItemsController.updateItem);


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
//Routes for Users
// app.get('/api/users', UsersController.showLists);

// app.post('/api/users/create', UsersController.createList);

// app.post('/api/users/delete/:user_id', UsersController.removeList);

// app.post('/api/users/update/:user_id', UsersController.updateList);

//--------------------------------------------------------------
app.listen(3000);
console.log('Connected to port 3000');

// Changing the way we are testing
// do not need to have the node server running this way when we export it
//
module.exports.app = app;
