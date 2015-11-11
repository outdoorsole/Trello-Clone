// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var listSchema = new Schema({
  list_name: { type: String, required: true },
  description: { type: String },
  created_at: Date,
  updated_at: Date
});

// itemSchema.methods.lists = function() {
//   raise('Not implemented');
// }

// the schema is useless so far
// we need to create a model using it
var List = mongoose.model('List', listSchema);

module.exports = List;
