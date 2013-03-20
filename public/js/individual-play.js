$(document).ready(function() {
    myGame = playGame({name:"Me", type:"individual-play"});

    $('.new-game').click(function() {
        myGame = playGame({name:"Me", type:"individual-play"});
    });

});




