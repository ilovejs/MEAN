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
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
   console.log('multivision db opened');
});
//end monogo db

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
	res.render('index');
});

var port = 3000;
app.listen(port);

console.log('Listening on port' + port + '...');