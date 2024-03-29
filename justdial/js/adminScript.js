//TODO:Services Nes Offers
var state = 1;
var appUrl="Services";
var rootRef;
var urlStack = [];
var modalKey="";
var modalName="";
var count=0;

urlStack.push(appUrl);
$(document).ready(function () {

    listing();
    $('#deleteModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        //var recipient = button.data('whatever'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text('Delete ' + modalName);
        modal.find('.modal-body h3').text("Are you sure you want to delete "+modalName+"?");
    });
    $('#updateModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        //var recipient = button.data('whatever'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text('Update ' + modalName);
        modal.find('.modal-body input').val(modalName);
    });
});

function listing(){
    $('#btnAssignBusiness').hide();
    console.log("Listing::"+urlStack.join("/"));
    rootRef = firebase.database().ref().child(urlStack.join("/"));
    $('#tBody').empty();
    rootRef.off();
    rootRef.on("child_added",snap => {

        var name=snap.child('name').val();
        var key=snap.key;
        console.log('Added called in Listing');
        count++;
        var s=  "<tr id='"+key+"' style='cursor: pointer'>"+
                "<td onclick=\"itemClick('"+key+"')\" type='button'>"+name+"</td>"+
                "<td>"+
            "<button type='button' class='btn btn-danger pull-right' style='margin-left:10px' data-toggle='modal' data-whatever='ss' data-target='#deleteModal' onclick=\"setItemToModalKey('"+key+"','"+name+"')\">Delete</button>"+
                "<button type='button' class='btn btn-success pull-right' data-toggle='modal' data-target='#updateModal' onclick=\"setItemToModalKey('"+key+"','"+name+"')\">Update</button>"+

            "</td>"+
                "</tr>";
        $('#tBody').append(s);
    });


    rootRef.on("child_changed",snap => {
        var name=snap.child('name').val();
        var key=snap.key;
        console.log('Added called in Listing');
        var s=  "<tr id='"+key+"' style='cursor: pointer'>"+
            "<td onclick=\"itemClick('"+key+"')\" type='button'>"+name+"</td>"+
            "<td>"+
            "<button type='button' class='btn btn-danger pull-right' style='margin-left: 10px' data-toggle='modal' data-whatever='ss' data-target='#deleteModal' onclick=\"setItemToModalKey('"+key+"','"+name+"')\">Delete</button>"+
            "<button type='button' class='btn btn-success pull-right' data-toggle='modal' data-target='#updateModal' onclick=\"setItemToModalKey('"+key+"','"+name+"')\">Update</button>"+

            "</td>"+
            "</tr>";
        $('#'+key).replaceWith(s);
    });

    rootRef.on("child_removed",snap => {
        console.log("Removed called in Listing");
        $('#'+snap.key).remove();
    });
}




function itemClick(id){
    urlStack.push(id,"categories");
    console.log("AppUrl:"+appUrl+" UrlStack:"+urlStack.join("/"));
    count=0;

    listing();
    checkLeave();

    console.info(count);


    console.log("id:"+id+" UrlStackLast:"+urlStack[urlStack.length-2]);
    state++;
}
//----------------------------------------Business Code Start-----------------------------------------------------------

function businesslisting(){
    $('#btnAssignBusiness').hide();
    console.warn("Business Listing::"+urlStack.join("/"));
    var businessRef = firebase.database().ref().child("Businesses");

    rootRef = firebase.database().ref().child(urlStack.join("/"));
    $('#tBody').empty();
    rootRef.off();
    rootRef.on("child_added",snap => {
        //alert(snap.child('xyz').child('bid').val());
        var bid=snap.val();
        var key=snap.key;
        var bName;
        var bKey;
        businessRef.on('value', function(snap) {
            bName=snap.child(bid+"/name").val();
            bKey=snap.child(bid+"/name").key;

            var s=  "<tr id='"+key+"' style='cursor: pointer'>"+
                "<td onclick=\"itemClick('"+key+"')\" type='button'>"+bName+"</td>"+
                "<td>"+
                "<button type='button' class='btn btn-danger pull-right' style='margin-left: 10px' data-toggle='modal' data-whatever='ss' data-target='#deleteModal' onclick=\"setItemToModalKey('"+key+"','"+name+"')\">Delete</button>"+
                "<button type='button' class='btn btn-success pull-right' data-toggle='modal' data-target='#updateModal' onclick=\"setItemToModalKey('"+key+"','"+name+"')\">Update</button>"+

                "</td>"+
                "</tr>";
            $('#tBody').append(s);
        });




    });

}
//----------------------------------------Business Code End-------------------------------------------------------------


function checkLeave() {
    if(count==0){
        $('#btnAssignBusiness').show();
        urlStack.pop();
        urlStack.push("businesses");
        //TODO:call business listing
        businesslisting();
        //(urlStack.join("/"));
    }else{
        $('#btnAssignBusiness').hide();
    }

}

function btnBack() {
    if(state>1){
        urlStack.pop();
        urlStack.pop();
        //console.log("AppUrl:" + appUrl);
        //console.log("urlStack:" + urlStack.join("/"));
        count=0;
        listing();
        //checkLeave();
        state--;
    }
    else{
        $('#btnAssignBusiness').hide();
    }
}

function insert(){
    var txtItem = $('#txtItem').val();
    urlStack.pop();
    rootRef.push().set({'name':txtItem});
}

function insertBusiness(){
    var txtBusiness = $('#txtBusiness').val();
    urlStack.pop();
    urlStack.push('Businesses');
    //rootRef = firebase.database().ref().child(urlStack.join("/"));
    rootRef = firebase.database().ref().child("Businesses");
    rootRef.off();
    //TODO: Change to business branch
    rootRef.push().set({'name':txtBusiness});
}

function setItemToModalKey(id,name){
    modalKey=id;
    modalName=name;
}

function deleteItem(){
    rootRef.child(modalKey).remove();
}

function updateItem(){
    var name=$('#recipient-name').val();
    rootRef.child(modalKey).set({
        name: name
    });
}

