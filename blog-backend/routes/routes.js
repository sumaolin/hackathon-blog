var userSchema = require('../models/user');
var articleSchema = require('../models/articles');

module.exports = function(app, passport){

  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.get('/article', function(req, res, next){
    articleSchema.find({}).limit(10).exec(function(err, data1){
      if(err){
        res.json({code: 1, msg: err});
      }

      res.json({code: 0, msg: 'success', data: data1});
    });
  });

  app.post('/article', isLoggedIn, function(req, res, next){
    var art = req.body;
    art.author = req.user.local.email;
    var art = new articleSchema(art);
    art.save(function(err){
      
      if(err){
        return res.json({code: 1, msg: err});
      }
      return res.json({code: 0, msg: 'success'});
    });
  });

  app.get('/signup', function(req, res, next) {
    res.render('signup', {});
  });

  app.post('/signup', function(req, res, next){

    passport.authenticate('local-signup', function(err, user, info) {

      if (err) {
        return res.json({
          code: 404,
          msg: 'System error...'
        });
      }
      if (user) {
        console.log('');
        req.logIn(user, function(err) {

          if (err) {
            return next(err);
          } else {
            return res.json({
              code: 0,
              msg: 'rigister success!'
            });
          }
        });
      } else {
        return res.json(info);
      }

    })(req, res, next);

  });

  app.get('/signin', function(req, res, next) {
    res.render('signin', {});
  });

  app.post('/signin', function(req, res, next){

    passport.authenticate('local-signin', function (err, user, info) {

      if(err){
        return res.json({code: 404, msg: 'System error...'});
      }

      if(user){
        console.info(req.user)
        return res.json({
          code: 0, msg: 'success', 
          data: {user: user.local.email}
        });
      }else{
        return res.json(info);
      }
      
    })(req, res, next);

  });

  function isLoggedIn(req, res, next){


    if(req.isAuthenticated()){
      return next();
    } 

    res.redirect('/');
  }

};
