var model = "../models/users.js";

module.exports = function (app) {

// Setup a route for the ready event, and add session data.
    app.io.route('ready', function (req) {
        req.session.name = req.data
        req.session.save(function () {
            req.io.emit('get-feelings')
        })
    })

// Send back the session data.
    app.io.route('send-feelings', function (req) {
        req.session.feelings = req.data
        req.session.save(function () {
            req.io.emit('session', req.session)
        })
    })

    // TODO add routes for all play, team1, team2 & Chat
    // reference all-play and team-play models
    // send and receive game state events

}