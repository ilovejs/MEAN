/*
use nodemon / supervisor to monitor
*/
var express = require('express');
    stylus = require('stylus');
    mongoose = require('mongoose');

var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function compile(str, path){
    return stylus(str).set('filename', path);
}

//setting
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));
//end setting

//start mongodb setting
//set NODE_ENV=production
if(env === 'development'){
    mongoose.connect('mongodb://localhost/multivision');
}else{
    mongoose.connect('mongodb://mkw:85588558@ds045628.mongolab.com:45628/heroku_app25154595');
}
//mongodb://localhost/multivision

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
   console.log('heroku_app25154595 db opened');
});
//end monogo db

//set mongo schema
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;

});

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
	res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.DEFAULT_PORT || 3000;
app.listen(port);

console.log('Listening on port' + port + '...');