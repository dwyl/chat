var baseURL = 'https://r09u5uw11g.execute-api.eu-west-1.amazonaws.com/prod';

$(document).ready(function() {

  function getNotes () {

    $.ajax({
      type: "GET",
      // headers: { 'x-api-key' : API_KEY },
      url: baseURL + '/getmessages',
      dataType: "json",
      success: function(res, status, xhr) {
        console.log(' - - - - - - - - getNotes res:')
        console.log(res);
        $('#notes').val(res.notes)
        $('#form').fadeIn('slow'); // this is why I'm using jQuery ... feel free to remove.
      },
      error: function(xhr, err) {
        console.log(' - - - - - - - - xhr:')
        console.log(xhr);
        console.log(' - - - - - - - - error:')
        console.log(err);
      }
    });
  }
  getNotes(); // initialise the notes on the page

  // Ajax without JQuery if you prefer:
  function postNotes () {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL + '/SaveNotes');
    xhr.onreadystatechange = function() {
      // un-comment these console.logs in for debugging
      console.log( xhr.status, xhr.statusText )
      console.log(xhr.responseText);
      return;
    };
    var encoded = JSON.stringify({"notes":document.getElementById('notes').value });
    xhr.send(encoded);
  }

  $( "#save" ).click(function() {
    console.log('Save Button Clicked!');
    postNotes();
  });
});
