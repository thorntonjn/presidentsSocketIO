module.exports = function (app) {

    var presidents = require('../models/presidents');

    // Setup a route for the ready event, and add session data.
    app.io.route('ready', function (req) {
//        console.log('ready');
        req.session.name = req.data;
        req.session.save(function () {
            req.io.emit('game-type');
        })
    });

    // Send back the session data.
    app.io.route('game-type', function (req) {
//        console.log('game-type:' + req.data);

        req.session.gameType = req.data;
        req.session.save(function () {
            console.log('session.save emit session:', req.session);

            req.io.emit('session', req.session)
        })
    });

    app.io.route('join-all-play', function (req) {
        console.log('join-all-play io.emit:', presidents.getPresidentialData());
        req.io.emit('update-presidents', presidents.getPresidentialData());
    });

    app.io.route('update-president', function (req) {
        console.log('update-president:', req.data);

        var updatedPresident = presidents.updatePresident(req.data);
        if (updatedPresident) {
            console.log('president was updated', updatedPresident)
            req.io.broadcast('update-president', [updatedPresident]);
        } else {
            console.log('president was not updated !!!')

            // If another person already found the president then notify recipient
            var president = presidents.getPresident(req.data);
            if (president) {
                req.io.emit('president-allready-found', president);
            }
        }

        if (presidents.gameFinished()) {
            console.log("gameFinished !!!");
            console.log("gameTime:" + presidents.getElapsedGameTime());
            req.io.broadcast('game-finished', presidents.getElapsedGameTime());
        }
    });

    app.io.route('reset-all-play-game', function (req) {
        console.log ('reset-all-play-game from ' + req.session.name);
        presidents.reset();
        req.io.broadcast('reset-all-play-game');
    });



    // TODO add routes for team1, team2 & Chat
    // reference all-play and team-play models
    // send and receive game state events

};