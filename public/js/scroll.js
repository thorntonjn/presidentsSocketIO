var startScroll = function (containerId, boxClass, delay) {
    var $window = $('#' + containerId),
        $boxes = $('.' + boxClass, $window);

    // arrange the boxes to be aligned in a row
    var arrangeBoxes = function () {
        $window = $('#' + containerId);
        $boxes = $('.' + boxClass, $window);
        $boxes.each( function(i, item) {
            var position = $window.position().left + 3 + i * ( $(item).width() + 10 );
            $(item).css('left', position+'px')
        });
    }

    // shifts all the boxes to the left, then checks if any left the window
    var shiftLeft = function() {
        $boxes.animate({'left' : "-=100px"}, delay, 'linear', checkEdge());
        checkEdge();
    }

    // returns the new location for the box that exited the window
    var getNewPosition = function() {
        return $('.' + boxClass + ':last').position().left + $('.' + boxClass + ':last').outerWidth() + 10;
    }

    // if the box is outside the window, move it to the end
    var checkEdge = function() {
        var windowsLeftEdge = $window.position().left;

        $boxes.each( function(i, box) {

            // right edge of the sliding box
            var boxRightEdge = $(box).position().left + $(box).width();

            // position of last box + width + 10px
            var newPosition = getNewPosition();
            if ( $(box).attr('class').indexOf('red') >=0 ) {
                console.log('box edge: ' + boxRightEdge + ' window edge: ' + windowsLeftEdge + ' new pos: ' +newPosition);
            }

            if ( parseFloat(boxRightEdge) < parseFloat(windowsLeftEdge) ) {
                $(box).css('left', newPosition);
                $(box).remove().appendTo($window);
            }
        });


    }

    arrangeBoxes();

    var timer = null,
        interval = delay + 10,
        value = 0;

        var startScrollTimer = function () {
            console.log("startTimer");
            timer =
                setInterval(
                    function () {
                        shiftLeft();
                    }, interval);
        };

    var stopScrollTimer = function () {
        console.log("stopTimer");
        $boxes.stop();
        clearInterval(timer);
        timer = null
    };

    $window.hover(function() {
        if (timer) {
            stopScrollTimer();
        }
    }, function () {
        if (!timer) {
            startScrollTimer();
        }
    });

    startScrollTimer();

    return {arrange:arrangeBoxes, startTimer:startScrollTimer, stopTimer:stopScrollTimer};

}


