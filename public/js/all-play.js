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

        var autoCompleteProcessCallBack = null;
        var autoCompleteQueryPrefix = null;
        var autoComplete = function (query, processCallBack) {
            autoCompleteProcessCallBack = processCallBack;
            autoCompleteQueryPrefix = query;
            console.log("autoComplete:" + query);
            socket.emit('auto-complete-guess', query);

        };

        var toTitleCase = function (str)
        {
            return $.trim(str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}));
        }

        var toTitleCaseWords = function (words) {
            var possiblePresidents = [];
            if (words) {
                for (var i = 0; i < words.length; i++) {
                    var word = autoCompleteQueryPrefix + words[i];
                    console.log("prefix:" + autoCompleteQueryPrefix);
                    console.log("word:" + word);
                    var camelCasedWord = toTitleCase(word);
                    console.log("toTitleCase:" + camelCasedWord);
                    possiblePresidents.push(camelCasedWord);
                }
            }
            return possiblePresidents;
        };


        // Listen for session event it will contain initial presidentialState state
        socket.on('session', function(data) {
            console.log('session: join-all-play');
            socket.emit('join-all-play');
            myGame = playGame(
                {   "name":myName, type:"all-play",
                    updateServerWithFoundPresident:updateServerWithFoundPresident,
                    autoComplete:autoComplete
                }
            );
        })

        socket.on('auto-complete-answer', function (possibilities) {
            console.log('auto-complete-answer');
            autoCompleteProcessCallBack(toTitleCaseWords(possibilities));
//            $("#input-president-name").data("source", possibilities);
        });

        // Only allow game to be reset one
        var gameReset = false;
        socket.on('reset-all-play-game', function () {
            console.log('reset-all-play-game received');
            gameReset = true;
        });

        var hasGameBeenReset = function () {
            return gameReset;
        }


//        var inputText = "";
//        $("#input-president-name").bind('keypress', function(e)
//        {
//            var  newInputText = $("#input-president-name").val();
//            if (inputText !== newInputText) {
//                inputText = newInputText;
//                if (inputText && inputText.length > 0) {
//                    console.log('auto-complete-guess' + inputText);
//                   socket.emit('auto-complete-guess', inputText);
//                }
//            }
//        });


        return {socket:socket, gameReset:hasGameBeenReset}
    }

    return startupSocketIO(myName);

}

$(document).ready(function() {
    var allPlayGame;
    $('#all-play-modal').modal('show');

    var gameReset = false;
    $('button.start-new-game').click(function() {
        if (allPlayGame && !gameReset && !allPlayGame.gameReset()) {
            gameReset = true;
            if (gameReset) {
                allPlayGame.socket.emit('reset-all-play-game');
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
            allPlayGame = allPlay(myName);
        }
    });

    $('#new-all-play-game').click(function () {
        if (allPlayGame && allPlayGame.gameReset()) {
            console.log('new-all-play-game: socket.emit("reset-all-play-game")');
            allPlayGame.socket.emit('reset-all-play-game');
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
                allPlayGame = allPlay(myName);
            }
        }
    });

    $('.nav li').removeClass('active');
    $('#nav-all-play').addClass('active');




});


// Autocomplete name submission - 30 minutes
