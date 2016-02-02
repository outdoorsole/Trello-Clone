var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Item Schema
var itemSchema = new Schema({
  item_name: { type: String, required: true },
  description: { type: String },
  created_at: Date,
  updated_at: Date,
  _list: { type: Schema.Types.ObjectId, ref:'List' }
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
