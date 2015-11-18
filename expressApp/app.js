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

// Controllers
var ItemsController = require('./app/controllers/items');
var ListsController = require('./app/controllers/lists');

//--------------------------------------------------------------
//Routes for Items

// show items
app.get('/api/items', ItemsController.showItems);

// /create items
app.post('/api/items/create', ItemsController.createItem);

// delete item
app.post('/api/items/delete/:id', ItemsController.removeItem);

// update item
app.post('/api/items/update/:id', ItemsController.updateItem);


//--------------------------------------------------------------
//Routes for Lists
app.get('/api/lists', ListsController.showLists);

app.post('/api/lists/create', ListsController.createList);

app.post('/api/lists/delete/:list_id', ListsController.removeList);

app.post('/api/lists/update/:list_id', ListsController.updateList);

app.listen(3000);
console.log('Connected to port 3000');

// Changing the way we are testing
// do not need to have the node server running this way when we export it
//
exports.app = app;
