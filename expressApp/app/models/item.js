// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var itemSchema = new Schema({
  item_name: { type: String, required: true },
  description: { type: String },
  created_at: Date,
  updated_at: Date,
  _list: [{type: Schema.Types.ObjectId, ref:'List'}]
});

// itemSchema.methods.lists = function() {
//   raise('Not implemented');
// }

// the schema is useless so far
// we need to create a model using it
var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
