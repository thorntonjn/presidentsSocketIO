// add all-play model logic here

var startTime = String(Math.round(new Date().getTime()/1000));
console.log("startTime - Presidents:", startTime);

var toHHMMSS = function (sec_numb) {
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    console.log("hours:minutes:seconds :" + hours+':'+minutes+':'+seconds );

    return hours+':'+minutes+':'+seconds;
};

var getElapsedGameTime = function () {
    var endTime = String(Math.round(new Date().getTime()/1000));
    console.log("startTime:", startTime);
    console.log("Elapsed Time: " + (endTime - startTime));
    return toHHMMSS(endTime - startTime);
};

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

var presidentialData = createPresidentialData();

var reset = function () {
    console.log("resetting presidentialData !!!")
    presidentialData = createPresidentialData();
    startTime = String(Math.round(new Date().getTime()/1000));
}

var updatePresident = function (foundPresident) {
    var updatedPresident = null;
    var president = getPresident(foundPresident);

    if (!president.foundBy && foundPresident.foundBy) {
        updatedPresident = president;
        updatedPresident.foundBy = foundPresident.foundBy;
    }
    return updatedPresident;
};

var getPresident = function (inPresident) {
    var outPresident = null;
    for (var i = 0; i < presidentialData.length; i++) {
        var president = presidentialData[i];
        if (president.president === inPresident.president && president.index === inPresident.index) {
            outPresident = president;
           break;
        }
    }
    return outPresident;
};

var gameFinished = function () {
    var gameFinished = true;
    for (var i = 0; i < presidentialData.length; i++ ){
        var president = presidentialData[i];
        if (!president.foundBy) {
            gameFinished = false;
            break;
        }
    }
    return gameFinished;
}

module.exports.getPresidentialData = function() { return presidentialData; };
module.exports.getPresident = getPresident;
module.exports.updatePresident = updatePresident;
module.exports.getElapsedGameTime = getElapsedGameTime;
module.exports.gameFinished = gameFinished;
module.exports.reset = reset;