module.exports = function (app) {

    // socketio Session is automatically setup on initial request.
    app.get('/', function(req, res) {
        req.session.loginDate = new Date().toString()
        res.render('index', {title:'The Home page. Individual game play.'});
    });

    // Session is automatically setup on initial request.
    app.get('/all-play', function(req, res) {
        req.session.loginDate = new Date().toString()
        res.render('all-play', {title:'Play as Group.'});
    });

    // Play as a team #1 for best time.
    app.get('/team1', function(req, res) {
        req.session.loginDate = new Date().toString()
        res.render('team1-play', {title:'Play as member of team #1 for best time.'});
    });
     // Play as a team #2 for best time.
    app.get('/team2', function(req, res) {
        req.session.loginDate = new Date().toString()
        res.render('team2-play', {title:'Play as member of team #2 for best time.'});
    });


}




