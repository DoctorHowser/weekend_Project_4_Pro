/**
 * Created by danesmith on 11/6/15.
 */
$(document).ready(function(){
    console.log('reaching admin script');
   $('#postMaker').submit(clickSubmit);
    refreshPage();
});

function refreshPage(){
    console.log('refresh page fired');
    $.ajax({
        type: 'GET',
        url: '/submit',
        success: function(data){
            writeDom(data);
        }
    })
}
function writeDom(data){
    console.log('write dom fired');
    $('#messageBoard').empty();
    for(var i = 0; i < data.length; i++){
        var postInfo = "<div class='well post' data-id='" + data[i]._id +"'>" +
                            "<div>" + data[i].name + "</div>" +
                            "<div>" + data[i].post + "</div>" +
                            "<button type='button' class='btn btn-danger delete'>Delete</button>" +

                        "</div>";
        $('#messageBoard').append(postInfo);

    }
    $('.post').on('click', '.delete', deletePost)
}

function deletePost(){
    var deleteID = {
        id : $(this).closest('.post').data('id')
    };
    $.ajax({
        type: 'DELETE',
        url: '/admin',
        data: deleteID,
        success: function(data){
            refreshPage();
        }
    });
}

function clickSubmit(event){
    console.log('click submit fired');
    event.preventDefault();
    var values = {};

    $.each($(this).serializeArray(), function(i, field){
        values[field.name] = field.value;
    });


    //console.log(values);
    $.ajax({
        type: 'POST',
        url: '/submit',
        data: values,
        success: function(data){
            //reset form
            $('#postMaker').trigger("reset");
            //start repopulate
            refreshPage();
        }
    });
}
