/**
 * Created by m.zhuang on 13/05/2014.
 */
module.exports = function(app, config){
    app.get('/partials/*', function(req, res){
        res.render('../../public/app/' + req.params);
    });


    app.get('/debug', function(req, res){
       res.send(config.rootPath);
    });


    app.get('*', function(req, res){
        res.render('index');
    });
};