
function Presidents() {

    var presidents = [
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
                var president = presidents[i];
                var image = 'images/' + index + '_' + presidents[i].replace(/_/g, '') + '.jpg';
                var imagewithAnswer = 'images/' + index + 'A_' + presidents[i].replace(/_/g, '') + '.jpg';
                var name = presidents[i].replace(/_/g, ' ');
                data.push({index:index, president:president, image:image, imagewithAnswer:imagewithAnswer, name:name, foundBy:"" });
            }
            return data;
        };

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

    return { createPresidentialData:createPresidentialData(), matchesCurrentPresidentsName:matchesCurrentPresidentName,
        matchesCurrentPresidentImage:matchesCurrentPresidentImage };

}