
$(document).ready(function () {

    var rootRef = firebase.database().ref().child("Services");
    rootRef.on("child_added",snap => {
        var id=snap.key;
        var serviceName=snap.child('name').val();
        var serviceDesc=snap.child('description').val();
        var imgUrl=snap.child('imgUrl').val();
        console.log('Added');
        $("#ch").append(itemAdd(id,imgUrl,serviceName,serviceDesc));
        console.log(name);
    });


    /*
    rootRef.on("child_removed",snap => {
        console.log('Removed');
        document.getElementById(snap.key).remove();
    });*/
    rootRef.on("child_changed",snap => {
        var id=snap.key;
        var serviceName=snap.child('name').val();
        var serviceDesc=snap.child('description').val();
        var imgUrl=snap.child('imgUrl').val();
        console.log('Changed');
        //document.getElementById(snap.key).innerHTML="<td>"+snap.key+"</td><td>"+name+"</td><td>"+email+"</td>";
        //$(id).replaceWith('<h1>hello</h1>');
        //console.log(itemChange(id,imgUrl,serviceName,serviceDesc));
        $('#'+id).replaceWith(itemChange(id,imgUrl,serviceName,serviceDesc));
    });
});



function itemAdd(id,imgUrl,serviceName,serviceDesc) {
    return '<div class="col-sm-3">'+itemChange(id,imgUrl,serviceName,serviceDesc)+'</div>';
}

function itemChange(id,imgUrl,serviceName,serviceDesc) {
    return  '<div class="card" id="'+id+'" onclick="btnClick(this.id)" data-toggle="modal" data-target="#myModal1" style="cursor: pointer;">'+
                '<img class="card-img-top" src="img/'+imgUrl+'" style="width:100%" alt="Card image cap">'+
                    '<div class="card-block">'+
                        '<h4 class="card-title">'+serviceName+'</h4>'+
                        '<p class="card-text">'+serviceDesc+'</p>'+
                        '<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>'+
                    '</div>' +
            '</div>';
}

//
