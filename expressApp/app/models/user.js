// To create an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
  name: { type: String, required: true },
  user_name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

// To set up a mongoose model
var User = mongoose.model('User', userSchema);

// Pass the model using module.exports
module.exports = User;
