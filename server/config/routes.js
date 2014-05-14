/**
 * Created by m.zhuang on 13/05/2014.
 */
var passport = require('passport');

module.exports = function(app, config){
    app.get('/partials/*', function(req, res){
        res.render('../../public/app/' + req.params);
    });

    app.post('/login', function(req, res, next){
        var auth = passport.authenticate('local', function(err, user){
            if(err) { console.log('routes.js - 13'); return next(err); }
            if(!user) { console.log(user); res.send({success: false}) }

            req.logIn(user, function(err){
                if(err) { console.log('routes.js - 16'); return next(err); }
                console.log('routes.js - 17');
                res.send({success: true, user: user});
            })
        });
        auth(req, res, next);
    });

    app.get('/debug', function(req, res){
       res.send(config.rootPath);
    });

    app.get('*', function(req, res){
        res.render('index');
    });
};