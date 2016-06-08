"use strict";

var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  passport.use('local-signup', 
    new localStrategy({
      usernameField: 'email',
      passportField: 'password',
      passReqToCallback : true
    }, 
    function (req, email, password, done) {

      console.log(email);

      process.nextTick(function(){

        User.findOne({'local.email': email}, function(err, user){
          if(err){
            return done(err);
          }

          if(user){
            return done(null, false, {code: 1, msg: 'this email has registed!'});
          }else{
            var newUser = new User();

            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            newUser.save(function(err){
              if(err) return done(err);
              return done(null, newUser);
            });
          }
        });
      });
    }
  ));

  passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passportField: 'password'
  }, function(username, password, done) {
    User.findOne({'local.email': username}, function(err, user){
      if(err){
        return done(err);
      }

      if(user){
        if(user.validPassword(password)){
          return done(null, user);
        }else{
          return done(null, false, {code: 1, msg: 'password is not rigth'});
        }
      }else{
        return done(null, false, {code:1, msg: 'not excise this email user'});
      }
    });
  }
  ));

}