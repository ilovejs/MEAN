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
};