function playGame() {

    var foundByText = "Me";
    var startTime = new Date().getTime();

    var presidents = [
        'George_Washington', 'John_Adams', 'Thomas_Jefferson',  'James_Maddison', 'James_Monroe',
        'John_Quincy_Adams', 'Andrew_Jackson', 'Martin_Van_Buren', 'William_Henry_Harrison', 'John_Tyler',
        'James_K_Polk', 'Zachary_Taylor', 'Millard_Fillmore', 'Franklin_Pierce', 'James_Buchanan',
        'Abraham_Lincoln', 'Andrew_Johnson', 'Ulysses_S_Grant', 'Rutherford_Hayes', 'James_Garfield',
        'Chester_Aurthur', 'Grover_Cleveland', 'Benjamin_Harrison', 'Grover_Cleveland', 'William_Mckinley',
        'Theodore_Roosevelt', 'William_Howard_Taft', 'Woodrow_Wilson', 'Warren_G_Harding', 'Calvin_Coolidge',
        'Herbert_Hoover', 'Franklin_D_Roosevelt', 'Harry_S_Truman', 'Dwight_D_Eisenhower', 'John_F_Kennedy',
        'Lyndon_B_Johnson', 'Richard_Nixon', 'Gerald_Ford', 'Jimmy_Carter', 'Ronald_Reagan',
        'George_Bush', 'Bill_Clinton', 'George_W_Bush', 'Barack_Obama'];

    var createPresidentialData =
        function () {
            var data = [];
            for (var i = 0; i < presidents.length; i++) {
                var index = i + 1;
                var president = presidents[i];
                var image = 'images/' + index + '_' + presidents[i].replace(/_/g, '') + '.jpg';
                var imagewithAnswer = 'images/' + index + 'A_' + presidents[i].replace(/_/g, '') + '.jpg';
                var imageMask = 'images/' + index + '_' + presidents[i].replace(/_/g, '') + '_mask.png';
                var name = presidents[i].replace(/_/g, ' ');
                data.push({index:index, president:president, image:image, imagewithAnswer:imagewithAnswer, imageMask:imageMask, name:name, foundBy:"" });
            }
            return data;
        };

    var waytoGoImages=[
        'images/bushwink.jpg',
        'images/reaganthumbsup.jpg',
        'images/obamawink.jpg',
        'images/obamathumbsup.jpg',
        'images/georgewashingtonwink.jpg',
        'images/georgebushthumbs.jpg',
        'images/thumbs-up-mrbean.png'];

    var tryAgainImages=[
        'images/bushnoway.jpg',
        'images/bushthinkharder.jpg',
        'images/obamathumbsdown.jpg',
        'images/simonsayingno.jpg',
        'images/mrbean.jpg'
        ];

    var clearPresidentsMask = function (selectedPresident) {
        var presidentsFound = $.grep(presidentsNotFound, function (e) { return e.president === selectedPresident;}),
            presidentFound = presidentsFound[0];

        $('#' + presidentFound.index + presidentFound.president + '_mask').css('visibility', 'hidden');
    }

    var matchesCurrentPresidentName = function(selectedPresident) {
        console.log("selected:"+ selectedPresident);
        console.log("current:"+ currentPresidentName.president);
        return (selectedPresident === currentPresidentName.president);
    }

    var matchesCurrentPresidentImage = function(selectedPresident) {
        console.log("selected:"+ selectedPresident);
        console.log("current:"+ currentPresidentImage.president);
        return (selectedPresident === currentPresidentImage.president);
    }

    var flashCongratulations = function () {
        $('#waytogo-label').removeClass("label-danger").addClass("label-success").text("Congratulations !!! Press Next President To Get Another").css('visibility', 'show');
        $('#try-another-president').css('visibility', 'hidden');
        $('#play button').css('visibility', 'hidden');
        $('#play input').css('visibility', 'hidden');
        $('#play .label-info').css('visibility', 'hidden');
        $('#enter-presidents-name').css('visibility', 'hidden');
        $('#selectImageBelow').css('visibility', 'hidden');

        var index = Math.floor(Math.random() * waytoGoImages.length);

        $("#current-president-image").fadeOut(function() {
            $("#current-president-image").attr("src", waytoGoImages[index]);
            $("#current-president-image").fadeIn(500, function() {
                $('#try-another-president').css('visibility', 'visible');
            });
        });
    };

    var flashWrong = function () {
        $('#try-another-president').css('visibility', "hidden");
        $('#play button').css('visibility', 'hidden');
        $('#play input').css('visibility', 'hidden');
        $('#play .label-info').css('visibility', 'hidden');
        $('#enter-presidents-name').css('visibility', 'hidden');
        $('#selectImageBelow').css('visibility', 'hidden');

        var index = Math.floor(Math.random() * tryAgainImages.length);

        $("#current-president-image").fadeOut(function() {
            $("#current-president-image").attr("src", tryAgainImages[index]);
            $("#current-president-image").fadeIn(500, function() {
                $('#try-another-president').css('visibility', "visible");
                $('#waytogo-label').addClass("label-warning").removeClass("label-success").text("Wrong !!! Press Next President to Try Again !!!").show();
            });
        });
    };

    var removePresidentFromImageSelectionScroll = function(selectedPresident) {
        var presidentsFound = $.grep(presidentsNotFound, function (e) { return e.president === selectedPresident;}),
            presidentFound = presidentsFound[0];

        var $president = $("#" + presidentFound.index + presidentFound.president).detach();

        $president.appendTo($('#image-found-banner .scrollableArea'));

        presidentsNotFound = $.grep(presidentsNotFound, function (e) {
            return e.president !== selectedPresident;
        });

        if (presidentsFound.length > 1) {
            presidentsNotFound.push(presidentsFound[1]);
        }

        if (presidentsNotFound.length === 1) {
          endTime = new Date().getTime();
          totalTime = endTime = startTime;
        }


//        presidentImageSelectionScroll.arrange();
    };

    var updateFoundBadge = function (foundPresident) {
        var $badge = $('#' + foundPresident.president  + '_badge'+ foundPresident.index);
        $badge.addClass("found");
        $badge.attr('title', $badge.attr('title') + " found by " + foundByText);
    }

    function tryPresidentName(selectedPresident) {
        // determine if the selected image matches the current president displayed to user
        if (matchesCurrentPresidentName(selectedPresident)) {
            // clear the corresponding president's mask
            clearPresidentsMask(selectedPresident);

            // remove the image from the presidents not found
            removePresidentFromImageSelectionScroll(selectedPresident);

            // add the image to the score banner
            presidentsFound.push(currentPresidentImage);
            updateFoundBadge(currentPresidentName);

            // show the success image
            // and button to try another president
            flashCongratulations()

        } else {
            // show the failure image
            // and button to try another president
            flashWrong();
        }
    }

    function tryPresidentImage(selectedPresident) {
        // determine if the selected image matches the current president displayed to user
        if (matchesCurrentPresidentImage(selectedPresident)) {
            // clear the corresponding president's mask
            clearPresidentsMask(selectedPresident);

            // remove the image from the presidents not found
            removePresidentFromImageSelectionScroll(selectedPresident);

            // add the image to the score banner
            presidentsFound.push(currentPresidentImage);
            updateFoundBadge(currentPresidentImage);

            // show the success image
            // and button to try another president
            flashCongratulations()
        } else {
            // show the failure image
            // and button to try another president
            flashWrong();
        }
    }

    var presidentImageSelectionCH = function (e) {
        tryPresidentName($(e.target).parent().data('president'));
    };

    var addPresidentialImageMasksAndBadges = function () {
        var $allPresidentsContainer = $('.all-presidents');
        for (var i = 0; i < presidentialData.length; i++) {
            var data = presidentialData[i];
            $('<img id="'+ data.index + data.president + '_mask" src="' + data.imageMask + '"/>').appendTo($allPresidentsContainer);
            var title = "#" + data.index + " " + data.name;
            var id = data.president + '_badge'+ data.index;
            var $badge = $('<span class="badge hover" title="' + title + '" id="'+ id +'">' + data.index + '</span>');
            $badge.click("");

            $badge.appendTo($allPresidentsContainer);
        }
    }

    var createPresidentImageSelectionScroll = function () {
        var $imageSelectionBanner = $('#image-selection-banner');
        $imageSelectionBanner.empty();
        for (var i = 0; i < presidentialData.length; i++) {
            var data = presidentialData[i];
            $('<div id="'+ data.index + data.president + '" class="image-box" + data-president="' + data.president +  '"><img src="' + data.image + '"/></div>').appendTo($imageSelectionBanner);
        }
        $imageSelectionBanner.on('click', presidentImageSelectionCH);

        $("#image-selection-banner").smoothDivScroll({
            mousewheelScrolling: "allDirections",
            manualContinuousScrolling: true,
            autoScrollingMode: "onStart"
        });

//        return startScroll('image-selection-banner', 'image-box', 250);
    }

    var createPresidentsNotFoundArray = function () {
        var presidentsNotFound = []
        for (var i = 0; i < presidentialData.length; i++){
            presidentsNotFound.push(presidentialData[i]);
        }
        return presidentsNotFound;
    };

    var getNextPresidentImageSelection = function () {
        var newPresident = presidentsNotFound[Math.floor(Math.random() * presidentsNotFound.length)];
        $('#current-president-image').attr("src", newPresident.image);
        $('#current-president-image').data("president", newPresident.president);
        $('#play button').css('visibility', 'visible');
        $('#play input').css('visibility', 'visible');
        $('#play .label-info').css('visibility', 'visible');
        $('#enter-presidents-name').css('visibility', 'visible');
        $('#selectImageBelow').css('visibility', 'visible');
        $('#waytogo-label').css('visibility', 'hidden');

        return newPresident;
    };

    var getNextPresidentNameSelection = function () {
        var newPresident = presidentsNotFound[Math.floor(Math.random() * presidentsNotFound.length)];
        $("#input-president-name").val("");
        $('#selectImageBelow').data("president", newPresident.president);
        $('#selectImageBelow').html("Select " + newPresident.name +"'s image Below");
        $('#play .label-info').css('visibility', 'visible');
        $('#enter-presidents-name').css('visibility', 'visible');;
        $('#selectImageBelow').css('visibility', 'visible');;
        $('#waytogo-label').css('visibility', 'hidden');
        return newPresident;
    };

    var createPresidentImageFoundScroll = function () {
        var $imageFoundBanner = $('#image-found-banner');
        $imageFoundBanner.empty();


        $("#image-found-banner").smoothDivScroll({
            mousewheelScrolling: "allDirections",
            manualContinuousScrolling: true,
            autoScrollingMode: "onStart"
        });

//        return startScroll('image-selection-banner', 'image-box', 250);
    }

//    var startPresidentsImageFoundBanner = function () {
////        var showImages = function() {
//        //    var i1 = new randImg('randimg1',100,100,4,mqAry1);
//
//        var i2 = new randObject('current-president-image', 150, 150, 10, presidents, "image");
//        var i3 = new randImg('waytogo', 250, 250, 10, waytoGoArray);
//        var i4 = new randImg('tryagain', 250, 250, 10, tryAgainArray);
//        var i5 = new randObject('nextPresidentToMatch', 100, 20, 10, presidents, "name");
////        setTimeout(function() {replaceImg(i1)},i1.t);
//        setTimeout(function() {replaceObj(i2)},i2.t);
//        setTimeout(function() {replaceImg(i3)},i3.t);
//        setTimeout(function() {replaceImg(i4)},i4.t);
//        setTimeout(function() {replaceObj(i5)},i5.t);
//        setupImageSelectionBanner();
////        }
//        startScroll('score-banner', 'image-box', 250);
//
//    }

    // initialize presidential data
    var presidentialData = createPresidentialData();
    var presidentsNotFound = createPresidentsNotFoundArray();
    var presidentsFound = [];

    // 1. Grab a random president object to be the current president to identify
    //    populate the presidents photo beneath the text input field

    var currentPresidentImage = getNextPresidentImageSelection();
    var currentPresidentName = getNextPresidentNameSelection();

    $('#waytogo-label').css('visibility', 'hidden');

    // presidents with greyed out figures should be displayed
    // tryAgain image and button should be hidden & Congratulation image and label should be hidden


    // 1. Grab a random president object to be the current president to identify
    currentPresidentImage = getNextPresidentImageSelection();

    $('#try-another-president').click( function (e) {
      currentPresidentImage = getNextPresidentImageSelection();
      currentPresidentName = getNextPresidentNameSelection();
    });

    // 2. start rotating banner of presidents not yet found at the bottom attaching appropriate click handlers
    //    to test selection
    var presidentImageSelectionScroll = createPresidentImageSelectionScroll();

    // add all of the presidential masks
    addPresidentialImageMasksAndBadges();

    // 3. start rotating banner of presidents found by individual at top
    $.each(presidentialData, function(event) {

    });

    // 4. bind submit input to handler to test against current president's name
    $("#submit-president-name").click(function () {
        var presidentName = $("#input-president-name").val().replace(/\s/g, '_');
        tryPresidentImage(presidentName);
    })
    $("#input-president-name").bind('keypress', function(e)
    {
        if(e.keyCode == 13)
        {
            var presidentName = $("#input-president-name").val().replace(/\s/g, '_');
            tryPresidentImage(presidentName);
        }
    });


    // simulate hover on touch devices
    $('.badge.hover').bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover_effect');
    });

}

$(document).ready(function() {
    myGame = playGame();

    $('.new-game').click(function() {
        myGame = playGame();
    });

});


// OPTIONAL -  Found banner - 1 hour
// Show Finish image client 30 min
// 3 1/2 hours

// ALL-PLAY
// Login - 15 min
// Send State From Server - 15 min
// Send State From Client - 15 min
// Update State Server - 15 min
// Update State Client - 15 min
// Autocomplete name submission - 30 minutes
// 2 hours

// Team Play
// Join room - 15 minutes
// Track Time for team on server 15 min
// Report Finish event server - 15 min
// show final time client - 15 min
// 1 hour




