function playGame(config) {

    var myName = config.name || "Me";
    var startTime = String(Math.round(new Date().getTime()/1000));

    var getPresidentMaskId = function (president) { return  president.president + "_mask_" + president.index; };
    var getImageScrollSelectionId = function (president) { return  president.president + "_" + president.index; };
    var getBadgeId = function(president) { return president.president + "_badge_" + president.index; }

    var toHHMMSS = function (sec_numb) {
        var hours   = Math.floor(sec_numb / 3600);
        var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
        var seconds = sec_numb - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    };

    var finishGame = function (elapsedTime) {
        var timeString = elapsedTime;
        var endTime;

        if (!timeString) {
            endTime = String(Math.round(new Date().getTime()/1000));
            totalTime = (endTime - startTime);
            timeString = toHHMMSS(totalTime);
        }

        if (elapsedTime) {
            totalTime = elapsedTime;
        }

        // hide the select name and select image banner
        // modal with presidents and time completed

        $('#game-time').html("Game Time: " + timeString);
        $('#game-finished-modal').modal('show');
        $('button.start-new-game').click(function() {
          if (config.type == "individual-play") {
            location.reload();
          }
        })
    };

    var presidents = [
        'George_Washington', 'John_Adams', 'Thomas_Jefferson',  'James_Maddison', 'James_Monroe',
        'John_Quincy_Adams', 'Andrew_Jackson', 'Martin_Van_Buren', 'William_Henry_Harrison', 'John_Tyler'];
//        'James_K_Polk', 'Zachary_Taylor', 'Millard_Fillmore', 'Franklin_Pierce', 'James_Buchanan',
//        'Abraham_Lincoln', 'Andrew_Johnson', 'Ulysses_S_Grant', 'Rutherford_Hayes', 'James_Garfield',
//        'Chester_Aurthur', 'Grover_Cleveland', 'Benjamin_Harrison', 'Grover_Cleveland', 'William_Mckinley'];
//        'Theodore_Roosevelt', 'William_Howard_Taft', 'Woodrow_Wilson', 'Warren_G_Harding', 'Calvin_Coolidge',
//        'Herbert_Hoover', 'Franklin_D_Roosevelt', 'Harry_S_Truman', 'Dwight_D_Eisenhower', 'John_F_Kennedy',
//        'Lyndon_B_Johnson', 'Richard_Nixon', 'Gerald_Ford', 'Jimmy_Carter', 'Ronald_Reagan',
//        'George_Bush', 'Bill_Clinton', 'George_W_Bush', 'Barack_Obama'];

    var presidentNames = [
        'George Washington', 'John Adams', 'Thomas Jefferson',  'James Maddison', 'James Monroe',
        'John Quincy Adams', 'Andrew Jackson', 'Martin Van Buren', 'William Henry Harrison', 'John Tyler',
        'James K Polk', 'Zachary Taylor', 'Millard Fillmore', 'Franklin Pierce', 'James Buchanan',
        'Abraham Lincoln', 'Andrew Johnson', 'Ulysses S Grant', 'Rutherford Hayes', 'James Garfield',
        'Chester Aurthur', 'Grover Cleveland', 'Benjamin Harrison', 'Grover Cleveland', 'William Mckinley'];
        'Theodore Roosevelt', 'William Howard Taft', 'Woodrow Wilson', 'Warren G Harding', 'Calvin Coolidge',
        'Herbert Hoover', 'Franklin D Roosevelt', 'Harry S Truman', 'Dwight D Eisenhower', 'John F Kennedy',
        'Lyndon B Johnson', 'Richard Nixon', 'Gerald Ford', 'Jimmy Carter', 'Ronald Reagan',
        'George Bush', 'Bill Clinton', 'George W Bush', 'Barack Obama';



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

    var clearPresidentsMask = function (selectedPresident, index) {
        var presidentsFound = $.grep(presidentsNotFound, function (e) { return e.president === selectedPresident && e.index == index;});
        var presidentFound;

        if (presidentsFound && presidentsFound.length > 0) {
            presidentFound = presidentsFound[0];
            $('#' + getPresidentMaskId(presidentFound)).css('visibility', 'hidden');
        }

    };

    var restorePresidentsMask = function (selectedPresident, index) {
        var presidentsFound = $.grep(presidentsFound, function (e) { return e.president === selectedPresident.president && e.index == president.index;});
        var presidentFound;

        if (presidentsFound && presidentsFound.length > 0) {
            presidentFound = presidentsFound[0];
            $('#' + getPresidentMaskId(presidentFound)).css('visibility', 'visible');
        }

    };

    var matchesCurrentPresidentName = function(selectedPresident) {
        console.log("selected:"+ selectedPresident);
        console.log("current:"+ currentPresidentName.president);
        return (selectedPresident === currentPresidentName.president);
    };

    var matchesCurrentPresidentImage = function(selectedPresident) {
        console.log("selected:"+ selectedPresident);
        console.log("current:"+ currentPresidentImage.president);
        return (selectedPresident === currentPresidentImage.president);
    };

    var flashCongratulations = function () {
        $('#waytogo-label').removeClass().addClass("label-success").text("Congratulations !!! Press Next President To Get Another").css('visibility', 'visible');
        $('#try-another-president').css('visibility', 'hidden');
        $('#play').find('button').css('visibility', 'hidden');
        $('#play input').css('visibility', 'hidden');
        $('#play .label-info').css('visibility', 'hidden');
        $('#enter-presidents-name').css('visibility', 'hidden');
        $('#selectImageBelow').addClass("label-success").text("Congratulations !!! Press Next President To Get Another");
//        $('#selectImageBelow').css('visibility', 'hidden');

        var index = Math.floor(Math.random() * waytoGoImages.length);

        $("#current-president-image").fadeOut(function () {
            var $image = $("#current-president-image");
            $image.attr("src", waytoGoImages[index]);
            $image.fadeIn(500, function () {
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
        $('#selectImageBelow').html("Wrong !!! Press Next President to Try Again !!!");
//        $('#selectImageBelow').css('visibility', 'hidden');

        var index = Math.floor(Math.random() * tryAgainImages.length);

        $("#current-president-image").fadeOut(function() {
            var $image = $("#current-president-image");
            $image.attr("src", tryAgainImages[index]);
            $image.fadeIn(500, function() {
                $('#try-another-president').css('visibility', "visible");
                $('#waytogo-label').removeClass().addClass("label-warning").text("Wrong !!! Press Next President to Try Again !!!").css('visibility', 'visible');
            });
        });
    };

    var flashTooSlow = function (president) {
        var tooSlowLabelText = "Too slow !!! " + president.foundBy + " identified " + "#" + president.index + " " + president.name;
        $('#waytogo-label').removeClass().addClass("label-warning").text(tooSlowLabelText).css('visibility', 'visible');
        $('#try-another-president').css('visibility', 'hidden');
        $('#play').find('button').css('visibility', 'hidden');
        $('#play input').css('visibility', 'hidden');
        $('#play .label-info').css('visibility', 'hidden');
        $('#enter-presidents-name').css('visibility', 'hidden');
        $('#selectImageBelow').html(tooSlowLabelText);
//        $('#selectImageBelow').css('visibility', 'hidden');

        var index = Math.floor(Math.random() * tryAgainImages.length);

        $("#current-president-image").fadeOut(function () {
            var $image = $("#current-president-image");
            $image.attr("src", tryAgainImages[index]);
            $image.fadeIn(500, function () {
                $('#try-another-president').css('visibility', 'visible');
                $('#waytogo-label').removeClass().addClass("label-warning").css('visibility', 'visible');
            });
        });

    };



    var removePresidentFromImageSelectionScroll = function(selectedPresident) {

        // remove from selection scroll
        $("#" + getImageScrollSelectionId(selectedPresident)).remove();

        // remove from array
        presidentsNotFound = $.grep(presidentsNotFound, function (e) {
            return e.president !== selectedPresident.president || e.index !== selectedPresident.index;
        });

        // add the president to found list
        presidentsFound.push(selectedPresident);


    };

    var restorePresidentToImageSelectionScroll = function(resetPresident) {
        // remove from president's found array
        presidentsFound = $.grep(presidentsFound, function (e) { return e.president !== resetPresident.president || e.index !== resetPresident.index;});

        // Add back into selection banner
        var $imageSelectionBanner = $('#image-selection-banner');
        var $president = $('<div id="' + getImageScrollSelectionId(resetPresident) + '" class="image-box" + data-president="' + resetPresident.president +  '"><img src="' + resetPresident.image + '"/></div>');
        $president.appendTo($imageSelectionBanner);

        // Add back into presidentsNotFound array
        presidentsNotFound.push(resetPresident);

    };

    var updateFoundBadge = function (foundPresident) {
        var $badge = $("#" + getBadgeId(foundPresident));
        $badge.addClass("found");
        $badge.attr('title', $badge.attr('title') + " found by " + foundPresident.foundBy);
    };

    var updateResetBadge = function (resetPresident) {
        var $badge = $("#" + getBadgeId(resetPresident));
        var title = "#" + resetPresident.index + " " + resetPresident.name;
        $badge.removeClass("found").attr("title", title);
    };

    var updateServerWithFoundPresident = function (foundPresident) {
        if (config.updateServerWithFoundPresident) {
            config.updateServerWithFoundPresident(foundPresident);
        }
    };

    var updateClientWithFoundPresident = function(foundPresident){
        // clear the corresponding president's mask
        clearPresidentsMask(foundPresident.president, foundPresident.index);

        // remove the image from the presidents not found
        removePresidentFromImageSelectionScroll(foundPresident);

        // update the badge on the all presidents image
        updateFoundBadge(foundPresident);

    }

    var updateClientWithResetPresident = function(resetPresident){

        var presidents = $.grep(presidentsFound, function (e) { return e.president === resetPresident.president && e.index == resetPresident.index;});

        // see if we need to change the state of this president to not found
        if (presidents && presidents.length > 0 ) {
            // clear the corresponding president's mask
            restorePresidentsMask(resetPresident);

            // remove the image from the presidents found list
            restorePresidentToImageSelectionScroll(resetPresident);

            // update the badge on the all presidents image
            updateResetBadge(resetPresident);
        }

    }

    function tryPresidentName(selectedPresident) {
        // determine if the selected image matches the current president displayed to user
        if (matchesCurrentPresidentName(selectedPresident)) {
            currentPresidentName.foundBy = myName;
            updateServerWithFoundPresident(currentPresidentName);
            updateClientWithFoundPresident(currentPresidentName);

            // show the success image
            // and button to try another president
            flashCongratulations();

            // When the list of presidents not found goes to 0 we are done
            if (presidentsNotFound.length === 0) {
                if (config.type === 'individual-play') {
                    finishGame();
                }
            }

        } else {
            // show the failure image
            // and button to try another president
            flashWrong();
        }
    };

    function tryPresidentImage(selectedPresident) {
        // determine if the selected image matches the current president displayed to user
        if (matchesCurrentPresidentImage(selectedPresident)) {
            currentPresidentImage.foundBy = myName;
            updateServerWithFoundPresident(currentPresidentImage);
            updateClientWithFoundPresident(currentPresidentImage);
            // show the success image
            // and button to try another president
            flashCongratulations();

            // When the list of presidents not found goes to 0 we are done
            if (presidentsNotFound.length === 0) {
                if (config.type === 'individual-play') {
                    finishGame();
                }
            }

        } else {
            // show the failure image
            // and button to try another president
            flashWrong();
        }
    };

    var presidentImageSelectionCH = function (e) {
        tryPresidentName($(e.target).parent().data('president'));
    };

    var addPresidentialImageMasksAndBadges = function () {
        var $allPresidentsContainer = $('.all-presidents');
        for (var i = 0; i < presidentialData.length; i++) {
            var data = presidentialData[i];
            $('<img id="' + getPresidentMaskId(data) + '" src="' + data.imageMask + '"/>').appendTo($allPresidentsContainer);
            var title = "#" + data.index + " " + data.name;
            var id = getBadgeId(data);
            var $badge = $('<span class="badge hover" title="' + title + '" id="'+ id +'">' + data.index + '</span>');
            $badge.click("");
            $badge.appendTo($allPresidentsContainer);
        }
    };

    var createPresidentImageSelectionScroll = function () {
        var $imageSelectionBanner = $('#image-selection-banner');
        $imageSelectionBanner.empty();
        console.log("adding " + presidentialData.length + " presidents to image selection banner");
        for (var i = 0; i < presidentialData.length; i++) {
            var data = presidentialData[i];
            $('<div id="'+ getImageScrollSelectionId(data) + '" class="image-box" + data-president="' + data.president +  '"><img src="' + data.image + '"/></div>').appendTo($imageSelectionBanner);
        }
        $imageSelectionBanner.on('click', presidentImageSelectionCH);

        $("#image-selection-banner").smoothDivScroll({
            mousewheelScrolling: "allDirections",
            manualContinuousScrolling: true,
            autoScrollingMode: "onStart"
        });

//        return startScroll('image-selection-banner', 'image-box', 250);
    };

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
        $('#selectImageBelow').removeClass().addClass('label-important').css('visibility', 'visible');
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
        $('#selectImageBelow').removeClass().addClass('label-important').css('visibility', 'visible');;
        $('#waytogo-label').css('visibility', 'hidden');
        return newPresident;
    };

    var updatePresidents = function (presidents, initializing) {
        var president;
        for (var i = 0; i < presidents.length; i++){
            president= presidents[i];
            if (president.foundBy) {
                updateClientWithFoundPresident(president);

                if (president.president === currentPresidentImage.president && president.index === currentPresidentImage.index) {
                    if (!initializing) {
                        flashTooSlow(president);
                    } else {
                       getNextPresidentImageSelection();
                    }
                }

                if (president.president === currentPresidentName.president && president.index === currentPresidentName.index) {
                    if (!initializing) {
                        flashTooSlow(president);
                    } else {
                       getNextPresidentNameSelection();
                    }
                }


            } else {
                if (initializing) {
                    updateClientWithResetPresident(president);
                }
            }
        }

    };

    var reset = function () {

    }

    // initialize presidential data
    var presidentialData = createPresidentialData();
    var presidentsNotFound = createPresidentsNotFoundArray();
    var presidentsFound = [];

    if (config.autoComplete) {
        $("#input-president-name").data("source", config.autoComplete);
    } else {
        $("#input-president-name").data("source", presidentNames);
    }

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
    createPresidentImageSelectionScroll();

    // add all of the presidential masks
    // 3. start rotating banner of presidents found by individual at top
    addPresidentialImageMasksAndBadges();

    // 4. bind submit input to handler to test against current president's name
    $("#submit-president-name").click(function () {
        var presidentName = $("#input-president-name").val().replace(/\s/g, '_');
        tryPresidentImage(presidentName);
    });

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

    return { updatePresidents:updatePresidents, finishGame:finishGame, reset:reset};

}




