/*
use nodemon / supervisor to monitor
 heroku ps:scale web=1
 heroku open
 heroku log
 heroku restart
*/
var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config')[env];

//return function and invoke function by passing in app, config
require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username}).exec(function(err, user){
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }
));
passport.serializeUser(function(user,done){
    if(user){
        done(null, user._id);
    }
});
passport.deserializeUser(function(id,done){
    User.findOne({_id:id}).exec(function(err, user){
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
});


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