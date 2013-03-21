var ioPlay = function (myName, type) {
    var myGame;

    var startupSocketIO = function (myName) {
        var socket = io.connect();

        // Emit ready event.
        console.log('socket.emit("ready","' + myName + '")');
        socket.emit('ready', myName);

        // Send to the server what type of game I want to play
        socket.on('game-type', function () {
            console.log('socket.emit("ready",'+ type + '")');
            socket.emit('game-type', type)
        });

        // Listen for updates to one or more presidents
        socket.on('update-presidents', function (presidents) {
            console.log('update-presidents' + JSON.stringify(presidents));
            myGame.updatePresidents(presidents, true);
        });

        // Watch for game completion
        socket.on('game-finished', function(data) {
            console.log('game-finished !!!!!');
            myGame.finishGame(data);
        });

        // Listen for update to single president
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
            console.log('session: emit join-game');
            socket.emit('join-game');
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
        });

        // Only allow game to be reset once
        var gameReset = false;
        socket.on('reset-all-play-game', function () {
            console.log('reset-all-play-game received');
            gameReset = true;
        });

        var hasGameBeenReset = function () {
            return gameReset;
        }

        return {socket:socket, gameReset:hasGameBeenReset}
    }

    return startupSocketIO(myName);

}

