module.exports = function (app) {

    var presidents = require('../models/presidents');
    var team1Presidents = require('../models/team1Presidents');
    var team2Presidents = require('../models/team2Presidents');

    // Setup a route for the ready event, and add session data.
    app.io.route('ready', function (req) {
        req.session.name = req.data;
        req.session.save(function () {
            req.io.emit('game-type');
        })
    });

    // Send back the session data.
    app.io.route('game-type', function (req) {
//        console.log('game-type:' + req.data);

        req.session.gameType = req.data;

        if (req.session.gameType === "team1-play") {
            req.io.join("team1-play");
            req.io.room(req.data).broadcast('announce', {
              message: 'New client in the ' + req.session.gameType + ' room.'
            })
        }
        req.session.save(function () {
            console.log('session.save emit session:', req.session);

            req.io.emit('session', req.session)
        })
    });

    app.io.route('join-all-play', function (req) {
        switch (req.session.gameType) {
            case 'all-play':
                console.log('join-all-play io.emit:', presidents.getPresidentialData());
                req.io.emit('update-presidents', presidents.getPresidentialData());
                checkGameFinished(presidents);
                break;
            case 'team1-play':
                console.log('join-team1-play io.emit:', team1Presidents.getPresidentialData());
                req.io.emit('update-presidents', team1Presidents.getPresidentialData());
                checkGameFinished(team1Presidents);
                break;
            case 'team2-play':
                console.log('join-team1-play io.emit:', team1Presidents.getPresidentialData());
                req.io.emit('update-presidents', team1Presidents.getPresidentialData());
                checkGameFinished(team2Presidents);
                break;

            default:
                console.log("!!!! UNKNOWN GAMETYPE !!!!")
                break;
        }
    });

    var checkGameFinished = function (inPresidents) {
        if (inPresidents.gameFinished()) {
            console.log('GameFinished !!!');
            console.log("!!! gameTime:" + inPresidents.getElapsedGameTime());
            app.io.broadcast('game-finished', inPresidents.getElapsedGameTime());
        }
    }


    app.io.route('update-president', function (req) {
        console.log('update-president:', req.data);
        switch (req.session.gameType) {
            case 'all-play':
                console.log('join-all-play io.emit:', presidents.getPresidentialData());
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
                checkGameFinished(presidents);

                break;
            case 'team1-play':
                var updatedPresident = team1Presidents.updatePresident(req.data);
                if (updatedPresident) {
                    console.log('president was updated', updatedPresident)
                    req.io.room('team1-play').broadcast('update-president', [updatedPresident]);
                } else {
                    console.log('president was not updated !!!')

                    // If another person already found the president then notify recipient
                    var president = team1Presidents.getPresident(req.data);
                    if (president) {
                        req.io.emit('president-allready-found', president);
                    }
                }

                checkGameFinished(team1Presidents);

                break;
            case 'team2-play':
                var updatedPresident = team2Presidents.updatePresident(req.data);
                if (updatedPresident) {
                    console.log('president was updated', updatedPresident)
                    req.io.room('team1-play').broadcast('update-president', [updatedPresident]);
                } else {
                    console.log('president was not updated !!!')

                    // If another person already found the president then notify recipient
                    var president = team2Presidents.getPresident(req.data);
                    if (president) {
                        req.io.emit('president-allready-found', president);
                    }
                }

                checkGameFinished(team1Presidents);
                break;

            default:
                console.log("!!!! UNKNOWN GAMETYPE !!!!")
                break;
        }

    });

    app.io.route('reset-all-play-game', function (req) {
        console.log ('reset-all-play-game from ' + req.session.name);
        presidents.reset();
        req.io.broadcast('reset-all-play-game');

        switch (req.session.gameType) {
            case 'all-play':
                presidents.reset();
                req.io.broadcast('reset-all-play-game');
                break;
            case 'team1-play':
                team1Presidents.reset();
                req.io.room('team1-play').broadcast('reset-all-play-game');
                break;
            case 'team2-play':
                team1Presidents.reset();
                req.io.room('team1-play').broadcast('reset-all-play-game');
                break;

            default:
                console.log("!!!! UNKNOWN GAMETYPE !!!!")
                break;
        }

    });

};



// TODO add route for Chat and auto-complete
