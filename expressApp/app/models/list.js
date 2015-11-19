var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// List Schema
var listSchema = new Schema({
  list_name: { type: String, required: true },
  description: { type: String },
  created_at: Date,
  updated_at: Date,
  _items: [{type: mongoose.Schema.Types.ObjectId, ref:'Item'}]
});

var List = mongoose.model('List', listSchema);

module.exports = List;
