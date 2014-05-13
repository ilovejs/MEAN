/*
use nodemon / supervisor to monitor
 heroku ps:scale web=1
 heroku open
 heroku log
 heroku restart
*/
var express = require('express');


var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config')[env];

//return function and invoke function by passing in app, config
require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/routes')(app, config);

//end monogo db

//set mongo schema
//var messageSchema = mongoose.Schema({message: String});
//var Message = mongoose.model('Message', messageSchema);
//var mongoMessage;
//Message.findOne().exec(function(err, messageDoc){
//    mongoMessage = messageDoc.message;
//});

app.listen(config.port);

console.log('Listening on port' + config.port + '...');