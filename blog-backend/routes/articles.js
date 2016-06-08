var express = require('express');
var router = express.Router();
var articleSchema = require('../models/articles');

router.get('/', function(req, res, next){
  articleSchema.find({}).limit(10).exec(function(err, data1){
    if(err){
      res.json({code: 1, msg: err});
    }

    res.json({code: 0, msg: 'success', data: data1});
  });
});

router.post('/', function(req, res, next){
  var art = req.body;
  console.info(art);
  var art = new articleSchema(art);
  art.save(function(err){
    if(err){
      res.json({code: 1, msg: err});
    }
    res.json({code: 0, msg: 'success'});
  });
});

module.exports = router;