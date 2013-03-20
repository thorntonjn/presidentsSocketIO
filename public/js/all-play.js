//var myGame;

var allPlay = function (myName) {
    var myGame;

    var startupSocketIO = function (myName) {
        var socket = io.connect();

        // Emit ready event.
        console.log('socket.emit("ready","' + myName + '")');
        socket.emit('ready', myName);

        // Listen for updates to one or more presidents
        socket.on('game-type', function () {
            console.log('socket.emit("ready","all-play")');

            socket.emit('game-type', 'all-play')
        });

        // Listen for updates to one or more presidents
        socket.on('update-presidents', function (presidents) {
            console.log('update-presidents' + JSON.stringify(presidents));
            myGame.updatePresidents(presidents, true);
        });

        socket.on('game-finished', function(data) {
            console.log('game-finished !!!!!');
            myGame.finishGame(data);
        });

        // Listen for updates to onepresidents
        socket.on('update-president', function (presidents) {
            console.log('update-presidents' + JSON.stringify(presidents));
            myGame.updatePresidents(presidents);
        });

        // Listen for update-collison when someone else beat me to the guess
        socket.on('president-allready-found', function (president) {
            myGame.updatePresidents([president], true);
        });

        var updateServerWithFoundPresident = function(presidentFound) {
           socket.emit('update-president', presidentFound );
        }

        // Listen for session event it will contain initial presidentialState state
        socket.on('session', function(data) {
            console.log('session: join-all-play');
            socket.emit('join-all-play');
            myGame = playGame({"name":myName, type:"all-play", updateServerWithFoundPresident:updateServerWithFoundPresident});
        })

        socket.on('reset-all-play-game', function () {
            console.log('reset-all-play-game received');
            myGame.reset();
        });
        return {socket:socket}
    }

    return startupSocketIO(myName);

}



$(document).ready(function() {
    var allPlayGame;
    $('#all-play-modal').modal('show');

    $('button.start-new-game').click(function() {
        if (allPlayGame) {
            allPlayGame.socket.emit('reset-all-play-game');
        }
        location.reload();
    });

    $('button.start-new-all-play-game').click(function() {
        // Login to socket IO with user name
        myName = $("#all-play-name").val();
        if (myName) {
            $('#all-play-modal').modal('hide');
            $("#sign-in-name").html("Signed in as " + myName);
            allPlayGame = allPlay(myName);
        }
    });

    $('#new-all-play-game').click(function () {
        console.log('new-all-play-game: socket.emit("reset-all-play-game")');
        allPlayGame.socket.emit('reset-all-play-game');
//        location.reload();
    });


    $('.nav li').removeClass('active');
    $('#nav-all-play').addClass('active');

//    $('start-new-all-play-game').click(function() {
//        allPlayGame = allPlay();
//    });

});


// ALL-PLAY
// Login - 15 min
// Send State From Server - 15 min
// Send State From Client - 15 min
// Update State Server - 15 min
// Update State Client - 15 min
// Autocomplete name submission - 30 minutes
// 2 hours