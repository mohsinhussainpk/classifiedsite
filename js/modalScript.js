/**
 * Created by Bilal on 30-06-17.
 */

var modalTitle = document.getElementsByClassName('modal-title')[0];
var modalBody = document.getElementsByClassName('modal-body')[0];

var items1 = [
    [1, 'How many items need assembly?', ['Four', 'Five', 'Six']],
    [2, 'What kind of furniture would you like assembled?', ['Bed', 'Sofa', 'Cupboard']],
    [3, 'Are you able to provide assembly instructions or make and model information?', ['Yes', 'No']]
];

var items2 = [
    [1, 'What’s most important to you for this project?', ['Stay Close to my budget', 'Work around my schedule', 'Getting quality service']],
    [2, 'How many items need assembly?', ['1 item', '2 items', '3 items', 'Others']],
    [3, 'What kind of furniture would you like assembled?', ['Bed Frame', 'Chair', 'Dresser']],
    [4, 'Are you able to provide assembly instructions or make and model information?', ['Yes', 'No']]
];

//console.log(items1[1][2][0]);

var items = [];
var options = [];

var i = 0;
var gsnap;

$('#next').click(function () {

    if (i < items.length - 1) {
        i++;
        $('#previous').prop('disabled', false);
    }
    if (i == items.length - 1) {
        $('#next').prop('disabled', true);
        $('#finish').prop('disabled', false);
    }
    modalTitle.innerHTML = items[i];
    modalBody.innerHTML = '';

    var ops = gsnap.child((i+1) + '/options');

    options = [];
    ops.forEach(function (j) {
        console.log(j.key + " " + j.val());
        options.push(j.val());
    });

    for (var j = 0; j < options.length; j++) {
        var node = document.createElement("P");
        var textnode = document.createTextNode(options[j]);
        node.appendChild(textnode);
        modalBody.appendChild(node);
    }
    //console.log(items);
});

$('#previous').click(function () {
    if (i > 0) {
        i--;
        $('#next').prop('disabled', false);
        $('#finish').prop('disabled', true);
        $('#previous').prop('disabled', false);
    }
    if (i == 0) {
        $('#previous').prop('disabled', true);
    }

    modalTitle.innerHTML = items[i];
    modalBody.innerHTML = '';

    var ops = gsnap.child((i+1) + '/options');

    options = [];
    ops.forEach(function (j) {
        console.log(j.key + " " + j.val());
        options.push(j.val());
    });

    for (var j = 0; j < options.length; j++) {
        var node = document.createElement("P");
        var textnode = document.createTextNode(options[j]);
        node.appendChild(textnode);
        modalBody.appendChild(node);
    }
});

//console.log(items[i][2]['op1'].length);

function btnClick(clicked_id) {
    var servicesRef = firebase.database().ref().child("Services/" + clicked_id + "/questions");
    servicesRef.on('value', function (snapshot) {
        var count = 0;
        items = [];

        gsnap=snapshot;

        i = 0;
        snapshot.forEach(function () {
            count++;
            items.push(snapshot.child(count + '/text').val());
            console.log("Question Text:" + snapshot.child(count + '/text').val());

            var ops = snapshot.child((i+1) + '/options');
            options = [];
            ops.forEach(function (j) {
                console.log(i.key + " " + j.val());
                options.push(j.val());
            });
            console.warn(options);

        });
        //console.log(items);
        //console.log(snapshot.child('1/text').val());
    });
    //$('#previous').prop('disabled', true);
    $('#next').prop('disabled', false);
    $('#previous').prop('disabled', true);
    $('#finish').prop('disabled', true);


    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    if (items.length < 1) {
        $('#next').prop('disabled', true);
        $('#finish').prop('disabled', false);
    }

    modalTitle.innerHTML = items[i];
    modalBody.innerHTML = '';

    for (var j = 0; j < options.length; j++) {
        var node = document.createElement("P");
        var textnode = document.createTextNode(options[j]);
        node.appendChild(textnode);
        modalBody.appendChild(node);
    }
}

