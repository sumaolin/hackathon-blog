var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../config/db.js');

var articlesSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  body: {type: String, required: true},
  data: {type: Date, default: Date.now}
});

exports = module.exports = mongoose.model('Articles', articlesSchema);