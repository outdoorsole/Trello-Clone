var bodyParser = require('body-parser');
//------------------------------------------------------//

// Models
var User = require('../models/list');

//------------------------------------------------------//

exports.showUsers = function (req, res) {
  User.find({}, function(error, lists) {
    if (users) {
      res.json(users);
    } else if (error) {
      console.error(error.stack);
    }
  });
}
