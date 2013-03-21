$(document).ready(function() {
    var ioPlayGame;
    $('#all-play-modal').modal('show');

    var gameReset = false;
    $('button.start-new-game').click(function() {
        if (ioPlayGame && !gameReset && !ioPlayGame.gameReset()) {
            gameReset = true;
            if (gameReset) {
                ioPlayGame.socket.emit('reset-all-play-game');
            }
        }
        location.reload();
    });

    $('button.start-new-all-play-game').click(function() {
        // Login to socket IO with user name
        myName = $("#all-play-name").val();
        if (myName) {
            $('#all-play-modal').modal('hide');
            $("#sign-in-name").html("Signed in as " + myName);
            ioPlayGame = ioPlay(myName, "team1-play");
        }
    });

    $('#new-all-play-game').click(function () {
        if (ioPlayGame && ioPlayGame.gameReset()) {
            console.log('new-all-play-game: socket.emit("reset-all-play-game")');
            ioPlayGame.socket.emit('reset-all-play-game');
        }
        location.reload();
    });

    $("#all-play-name").bind('keypress', function(e)
    {
        if(e.keyCode == 13)
        {
            myName = $("#all-play-name").val();
            if (myName) {
                $('#all-play-modal').modal('hide');
                $("#sign-in-name").html("Signed in as " + myName);
                ioPlayGame = ioPlay(myName, "team1-play");
            }
        }
    });

    $('.nav li').removeClass('active');
    $('#nav-team1-play').addClass('active');

});
