$(document).ready(function () {
    var rootRef = firebase.database().ref().child("Services");

    rootRef.on("child_added",snap => {
        var id=snap.key;
        var serviceName=snap.child('name').val();
        var serviceDesc=snap.child('description').val();
        var imgUrl=snap.child('imgUrl').val();
        console.log('Added');
        item(id,imgUrl,serviceName,serviceDesc);
        $("#ch").append(item(id,imgUrl,serviceName,serviceDesc));
        console.log(name);
    });
    rootRef.on("child_changed",snap => {
        var name=snap.child('Name').val();
        var email=snap.child('Email').val();
        console.log('Changed');
        document.getElementById(snap.key).innerHTML="<td>"+snap.key+"</td><td>"+name+"</td><td>"+email+"</td>";
        //$('#'+snap.key).innerHTML="<td>"+snap.key+"</td><td>"+name+"</td><td>"+email+"</td>";
        console.log($('#'+snap.key.innerText));
    });
    rootRef.on("child_removed",snap => {
        console.log('Removed');
        document.getElementById(snap.key).remove();
    });
});

function item(id,imgUrl,serviceName,serviceDesc) {
    return '<div class="col-sm-3">'+

    '<div class="card" id="'+id+'" onclick="btnClick(this.id)" data-toggle="modal" data-target="#myModal1" style="cursor: pointer;">'+
        '<img class="card-img-top" src="img/'+imgUrl+'" style="width:100%" alt="Card image cap">'+
        '<div class="card-block">'+
        '<h4 class="card-title">'+serviceName+'</h4>'+
    '<p class="card-text">'+serviceDesc+'</p>'+
    '<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>'+
    '</div> </div> </div>'
}

//
