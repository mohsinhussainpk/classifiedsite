
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
    pusher("/categories/-Kny5qffpHGY9S5yZLp3/categories/-Kny6WxQTJAx551WNpnT");
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
    /*
    rootRef.child(id+"/categories").push().set({'name':'All Banquet Halls'});
    rootRef.child(id+"/categories").push().set({'name':'5 Star Banquet Halls'});
    rootRef.child(id+"/categories").push().set({'name':'AC Banquet Halls'});
    rootRef.child(id+"/categories").push().set({'name':'Lawn For Events'});
    rootRef.child(id+"/categories").push().set({'name':'Non AC Banquet Halls'});
    */

    /*
    rootRef.child(id+"/categories").push().set({'name':'Electronics & Electrical Supplies'});
    rootRef.child(id+"/categories").push().set({'name':'Industrial Machinery & Equipments'});
    rootRef.child(id+"/categories").push().set({'name':'Construction Machinery & Supplies'});
    rootRef.child(id+"/categories").push().set({'name':'Automobiles Spare Parts & Services'});
    rootRef.child(id+"/categories").push().set({'name':'Industrial Supplies'});
    rootRef.child(id+"/categories").push().set({'name':'Business Services & Consultants'});
    rootRef.child(id+"/categories").push().set({'name':'Food & Beverages'});
    rootRef.child(id+"/categories").push().set({'name':'Event Management'});
    rootRef.child(id+"/categories").push().set({'name':'Apparels Clothing & Footwear'});
    */

    /*
    rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'Air Conditioners Coolers & Heaters'});
    rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'Batteries Inverters UPS Stabilisers & Transformers'});
    rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'Bulbs Lamps & Decorative Lights'});
    *//*
    /rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'CCTV & Surveillance Products'});
    rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'Computer Peripherals Printers Parts & Softwares'});
    rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'Electricians'});
    rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'Electronic Products & Appliances'});
    rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'Industrial & Commercial Machineries'});
    rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'Office Electronics'});
    rootRef.child(id+"/categories/-Kny5qffpHGY9S5yZLp3/categories").push().set({'name':'Televisions Parts & Accessories'});
*/
}
