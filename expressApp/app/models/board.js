var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Board Schema
var boardSchema = new Schema({
  board_name: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
  _lists: [{ type: mongoose.Schema.Types.ObjectId, ref:'List' }]
});

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;
