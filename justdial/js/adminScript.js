
var state = 1;
var appUrl="Services";
var rootRef;
var urlStack = [];
var modalKey="";


urlStack.push(appUrl);
$(document).ready(function () {
    listing();
});

function listing(){
    console.log(urlStack.join("/"));
    rootRef = firebase.database().ref().child(urlStack.join("/"));
    $('#tBody').empty();

    rootRef.off();
    rootRef.on("child_added",snap => {
        var name=snap.child('name').val();
        var key=snap.key;
        console.log('Added called in Listing');
        var s=  "<tr id='"+key+"' style='cursor: pointer'>"+
                "<td onclick=\"itemClick('"+key+"')\" type='button'>"+name+"</td>"+
                "<td>"+
            "<button type='button' class='btn btn-danger pull-right' style='margin-left: 10px' data-toggle='modal' data-whatever='ss' data-target='#deleteModal' onclick=\"setItemToModalKey('"+key+"')\">Delete</button>"+
                "<button type='button' class='btn btn-success pull-right' data-toggle='modal' data-target='#updateModal' onclick=\"setItemToModalKey('"+key+"')\">Update</button>"+

            "</td>"+
                "</tr>";
        $('#tBody').append(s);
    });
    rootRef.on("child_removed",snap => {
        console.log("Removed called in Listing");
        $('#'+snap.key).remove();
    });
}

function itemClick(id){
    urlStack.push(id,"categories");
    console.log("AppUrl:"+appUrl+" UrlStack:"+urlStack.join("/"));
    listing();
    console.log("id:"+id+" UrlStackLast:"+urlStack[urlStack.length-2]);
    //listing(urlStack[urlStack.length-2]);
    state++;
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

function insert(){
var txtItem = $('#txtItem').val();
    rootRef.push().set({'name':txtItem});
    //alert(txtItem);
}

function setItemToModalKey(id){
}

function deleteItem(){
    rootRef.child(modalKey).remove();
}

function updateItem(){

}
