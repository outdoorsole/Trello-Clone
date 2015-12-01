var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
  user_name: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
