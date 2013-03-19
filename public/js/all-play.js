
    var socket = io.connect();

    // Emit ready event.
    socket.emit('ready', prompt('What is your name?'))

    // Listen for get-feelings event.
    socket.on('get-feelings', function () {
        socket.emit('send-feelings', prompt('How do you feel?'));
    })

    // Listen for session event.
    socket.on('session', function(data) {
        message = 'Hey ' + data.name + '!\n\n'
        message += 'Server says you feel '+ data.feelings + '\n'
        message += 'I know these things because sessions work!\n\n'
        message += 'Also, you joined ' + data.loginDate + '\n'
        alert(message)
    })

    var presidents=[
        'George_Washington', 'John_Adams', 'Thomas_Jefferson',  'James_Madison', 'James_Monroe',
        'John_Quincy_Adams', 'Andrew_Jackson', 'Martin_Van_Buren', 'William_Henry_Harrison', 'John_Tyler',
        'James_K_Polk', 'Zachary_Taylor', 'Millard_Fillmore', 'Franklin_Pierce', 'James_Buchanan',
        'Abraham_Lincoln', 'Andrew_Johnson', 'Ulysses_S_Grant', 'Rutherford_Hayes', 'James_Garfield',
        'Chester_Aurthur', 'Grover_Cleveland', 'Benjamin_Harrison', 'Grover_Cleveland', 'William_Mckinley',
        'Theodore_Roosevelt', 'William_Howard_Taft', 'Woodrow_Wilson', 'Warren_G_Harding', 'Calvin_Coolidge',
        'Herbert_Hoover', 'Franklin_D_Roosevelt', 'Harry_S_Truman', 'Dwight_D_Eisenhower', 'John_F_Kennedy',
        'Lindon_B_Johnson', 'Richard_Nixon', 'Gerald_Ford', 'Jimmy_Carter', 'Ronald_Reagan',
        'George_Bush', 'Bill_Clinton', 'George_W_Bush', 'Barak_Obama'];

    var createPresidentialData =
        function () {
            var data = [];
            for (var i = 0; i < presidents.length; i++) {
                var index = i + 1;
                var image = 'images/' + index + '_' + presidents[i].replace(/_/g, '') + '.jpg';
                var imageA = 'images/' + index + 'A_' + presidents[i].replace(/_/g, '') + '.jpg';
                var name = presidents[i].replace(/_/g, ' ');
                data.push({index:index, image:image, imageA:imageA, name:name, foundBy:"" });
            }
            return data;
        };
    var presidentialData = createPresidentialData();


    var waytoGoArray=[
        'images/bushwink.jpg',
        'images/reaganthumbsup.jpg',
        'images/obamawink.jpg',
        'images/obamathumbsup.jpg',
        'images/georgewashingtonwink.jpg'];

    var tryAgainArray=[
        'images/bushnoway.jpg',
        'images/bushthinkharder.jpg',
        'images/obamathumbsdown.jpg',
        'images/simonsayingno.jpg'
        ];

    var contentArray = [
    //    type, content,               link url, width, height, bgcol,    txtcol,   txtalign, fontsize
        //                0     1                      2         3      4       5         6         7         8
        {type:'TXT', content:'Some Text to Display',link:'', width:'', height:'', bgcol:'#FFCC66', txtcol:'#9966FF',
            txtalign:'center' , fontsize:'13px'}
        // ContentAry[2]=['IMG','Zero.gif','',100  ,80   ,];
    ];

    var setupImageSelectionBanner = function () {
        var $window2 = $('#window2');
        $window2.empty();

        for (var i = 0; i < presidentialData.length; i++) {
            var data = presidentialData[i];
            $('<div class="box2"><img src="' + data.image + '"/></div>').appendTo($window2);
        }
    }

    var showImages = function() {
    //    var i1 = new randImg('randimg1',100,100,4,mqAry1);
        var presidents = createPresidentialData();

        var i2 = new randObject('randimg2', 150, 150, 10, presidents, "image");
        var i3 = new randImg('waytogo', 250, 250, 10, waytoGoArray);
        var i4 = new randImg('tryagain', 250, 250, 10, tryAgainArray);
        var i5 = new randObject('nextPresidentToMatch', 100, 20, 10, presidents, "name");
//        setTimeout(function() {replaceImg(i1)},i1.t);
        setTimeout(function() {replaceObj(i2)},i2.t);
        setTimeout(function() {replaceImg(i3)},i3.t);
        setTimeout(function() {replaceImg(i4)},i4.t);
        setTimeout(function() {replaceObj(i5)},i5.t);
        setupImageSelectionBanner();
    }


$(document).ready(function() {
    // do stuff when DOM is ready
    showImages();
//    $('.banner img').floatingbanner();
    startScroll('window', 'box');
    startScroll('window2', 'box2');
});