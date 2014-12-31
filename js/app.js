$(document).ready(function() {

  $("#list").sortable();

  $("form").submit(function(event){
    console.log("submitted");

    event.preventDefault();

    var item = $.trim($('#add').val());
    /*upon submittal, appends added list items as new divisions,
            with delete and "check-off" cues incorporated as children and
            marked 'trash'and 'bag' respetively*/

    //var formData = JSON.stringify({"content": item});

    if (item == '') {
      $("#add").val('');
    }
    else {
      $.ajax({
      type: 'POST',
      url: "/",
      data: item,
      dataType: "json"
      })
      //.done(function(results) {
      console.log("why won't this console log work?");
      $("#list").prepend($("<li class='item-added animated flipInX'>" + item + "<div class='delete'><span>&#x2717</span></div><div class='check'><span>&#x2713</span></div></li>"));
      $("#add").val('');
      //})
      //.fail(function(jqXHR, textStatus) {
      //  console.log("failed:" + textStatus);
      //})
    }
  });

    /*allows user to delete a list item*/
    $(document).on("click", ".delete", function() {

			var $item = $(this);
      var itemId = $(this).parent('li').data('id');

      $.ajax({
        type: 'DELETE',
        url: "/",
        data: JSON.stringify({itemId: itemId}),
        dataType: "json",
        success: function(result) {
					$item.parent('li').addClass('flipOutX').delay(200).fadeOut();
        },
        error: function() {
					console.log(arguments);
        }
      });

    });
    /*allows user to toggle having completed or purchased ('placed-in-bag') an item*/
    $(document).on("click", ".check", function() {
      if ($(this).parent().hasClass("checked-off")) {
        $(this).parent().slideUp('slow', function() {
          $(this).slideDown('slow').prependTo('#list');
        });
      } else {
          $(this).parent().slideUp('slow', function() {
            $(this).slideDown('slow').appendTo('#list');
        });
      };
      $(this).parent('li').toggleClass('checked-off');
    });
});
