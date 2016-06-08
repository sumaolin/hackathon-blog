var express = require('express');
var passport = require('passport');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', function(req, res, next){

  passport.authenticate('local', function(err, user, info) {
      if (err) {
          console.log('System error.');
          return next();
      }
      if (user) {
          console.log('Login success!');
          // Login is successful  
          req.logIn(user, function(err) {
              if (err) {
                  return next(err);
              } else {
                  // process further job
                  // response as json or redirect.
                  res.redirect('/articles/');
              }
          });
      } else {
          return res.json({
            code: 1,
            msg: 'User not exist or wrong password.'
          })
          // return next();
      }

  })(req, res, next);

});

router.post('/', function (req, res, next) {

  var newUser = new userSchema({
    
  })
})

module.exports = router;
