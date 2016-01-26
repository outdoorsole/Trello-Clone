// Route middleware to verify a token
app.use(function (req, res, next) {

  // Check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // Decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(error, decoded) {
      if (error) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // If everything's good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {

    // If there is no token, return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});
