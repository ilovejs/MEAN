/**
 * Created by m.zhuang on 13/05/2014.
 */
var mongoose = require('mongoose');

module.exports = function(config){
    //start mongodb setting
//set NODE_ENV=production
//heroku config:set NODE_ENV=production
    mongoose.connect(config.db);
//mongodb://localhost/multivision

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
        console.log('heroku_app25154595 db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            User.create({firstName: 'Joe', lastName: 'Eames', username: 'joe'});
            User.create({firstName: 'John', lastName: 'Papa', username: 'john'});
            User.create({firstName: 'Dan', lastName: 'Walin', username: 'dan'});
        }
    });

};