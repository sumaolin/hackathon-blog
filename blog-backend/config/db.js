var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hackthon-blog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection err'));
db.once('open', function(){
  console.log('mongodb connected!');
});

exports = module.exports = db;