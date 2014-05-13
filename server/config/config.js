/**
 * Created by m.zhuang on 13/05/2014.
 */
var path = require('path');
//go up 2 directories
//var rootPath = path.normalize(__dirname + '/../../');
var rootPath = path.resolve();  //resolve start from root
//var rootPath = path.normalize(__dirname); //D:\CODE\MEAN\server\config

module.exports = {
    development:{
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db:'mongodb://mkw:85588558@ds045628.mongolab.com:45628/heroku_app25154595',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};