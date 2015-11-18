var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  user_name: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
  _boards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
