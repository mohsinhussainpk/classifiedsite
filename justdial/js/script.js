
var state = 1;
var appUrl="Services";
var rootRef;
var urlStack = [];
urlStack.push(appUrl);
$(document).ready(function () {

    rootRef = firebase.database().ref().child("Services");
    $('#tBody').empty();
    rootRef.on("child_added",snap => {
        var name=snap.child('name').val();
        var key=snap.key;
        console.log('Added');
        var s="<tr id='"+key+"' onclick='itemClick(this.id)'><td>"+name+"</td></tr>";
        $('#tBody').append(s);
    });

   /* rootRef.push().set({'name':'Banquets'});
    rootRef.push().set({'name':'Couriers'});
    rootRef.push().set({'name':'Education'});
    rootRef.push().set({'name':'Fitness'});
    rootRef.push().set({'name':'Entertainment'});
    rootRef.push().set({'name':'Hotel'});
    rootRef.push().set({'name':'House Keeping'});
    */

    /*
    rootRef.on("child_added",snap => {
        var id=snap.key;
        var serviceName=snap.child('name').val();
        var serviceDesc=snap.child('description').val();
        var imgUrl=snap.child('imgUrl').val();
        console.log('Added');
        $("#ch").append(itemAdd(id,imgUrl,serviceName,serviceDesc));
        console.log(name);
    });
    */

});

function listing(id){
    rootRef = firebase.database().ref().child(urlStack.join("/"));
    $('#tBody').empty();
    rootRef.on("child_added",snap => {
        var name=snap.child('name').val();
        var key=snap.key;
        console.log('Added');
        var s="<tr id='"+key+"' onclick='itemClick(this.id)'><td>"+name+"</td></tr>";
        $('#tBody').append(s);
    });
}

function itemClick(id){
    urlStack.push(id,"categories");
    console.log("AppUrl:"+appUrl+" UrlStack:"+urlStack.join("/"));    listing(id);
    console.log("id:"+id+" UrlStackLast:"+urlStack[urlStack.length-2]);    listing(urlStack[urlStack.length-2]);
    state++;
}


function btnfoo(){
   // pusher("/categories/-Kny5qffpHGY9S5yZLp3/categories/-Kny6WxQTJAx551WNpnT");
}

function btnBack() {
    if(state>1){
        urlStack.pop();
        urlStack.pop();
        console.log("AppUrl:" + appUrl);
        console.log("urlStack:" + urlStack.join("/"));
        listing(urlStack[urlStack.length - 2]);
        state--;
    }
}

function pusher(id) {
    rootRef.child("-Kny4bwbijMFPM53sYQ1/categories/-Kny5qffpHGY9S5yZLp3/categories/-Kny6WxQTJAx551WNpnT/categories").push().set({'name':'AC Compressor'});
    rootRef.child("-Kny4bwbijMFPM53sYQ1/categories/-Kny5qffpHGY9S5yZLp3/categories/-Kny6WxQTJAx551WNpnT/categories").push().set({'name':'AC Manufacturers'});
}
