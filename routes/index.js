var model = "../models/users.js";

module.exports = function (app) {

//    app.get('/', function (req, res, next) {
//        model.get_recent(function (err, results) {
//            // do stuff with your results
//            res.render('index');
//        });
//    });

    // socketio Session is automatically setup on initial request.
    app.get('/', function(req, res) {
        req.session.loginDate = new Date().toString()
        res.render('index', {title:'The Home page. Individual game play.'});
    });

    // Session is automatically setup on initial request.
    app.get('/all-play', function(req, res) {
        req.session.loginDate = new Date().toString()
        res.render('all-play', {title:'Play as Group'});
    });

    // Play as a team #1 for best time.
    app.get('/team1', function(req, res) {
        req.session.loginDate = new Date().toString()
        res.render('room1', {title:'Play as memer of team #1 for best time.'});
    });
     // Play as a team #2 for best time.
    app.get('/team2', function(req, res) {
        req.session.loginDate = new Date().toString()
        res.render('all-play', {title:'Play as member of team #2 for best time.'});
    });


}




