var baseURL = 'https://r09u5uw11g.execute-api.eu-west-1.amazonaws.com/prod';

$( document ).ready(function() {

  function getName() {
    // prompt for person's name before allowing to post
    var name = Cookies.get('name');
    if(!name || name === 'null') {
      name = window.prompt("What is your name/handle?");
      Cookies.set('name', name);
    }
    // socket.emit('io:name', name);
    $( "#m" ).focus(); // focus cursor on the message input
    return name;
  }

  function leadZero(number) {
    return (number < 10) ? '0'+number : number;
  }

  function getTime(timestamp) {
    var t, h, m, s, time;
    t = new Date(timestamp);
    h = leadZero(t.getHours());
    m = leadZero(t.getMinutes());
    s = leadZero(t.getSeconds());
    return '' + h  + ':' + m + ':' + s;
  }

  /**
   * renders messages to the DOM
   * nothing fancy ... where's the React?! Don't Freak out! It works!
   */
  function renderMessage(msg) {
    msg = JSON.parse(msg);
    var html = "<li class='row'>";
    html += "<small class='time'>" + getTime(msg.t)  + " </small>";
    html += "<span class='name'>" + msg.n + ": </span>";
    html += "<span class='msg'>"  + msg.m + "</span>";
    html += "</li>";
    $('#messages').append(html);  // append to list
    return;
  }

  $('form').submit(function() {

    //if input is empty or white space do not send message
    if($('#m').val().match(/^[\s]*$/) !== null) {
      $('#m').val('');
      $('#m').attr('placeholder', 'please enter your message here');
      return false;
    }

    if(!Cookies.get('name') || Cookies.get('name').length < 1 || Cookies.get('name') === 'null') {
      getName();
      return false;
    } else {
      var msg  = $('#m').val();
      socket.emit('io:message', msg);
      $('#m').val(''); // clear message form ready for next/new message
      $('#m').attr('placeholder', ''); //clears placeholder once a msg is successfully sent
      return false;
    }
  });

  // keeps latest message at the bottom of the screen
  // http://stackoverflow.com/a/11910887/2870306
  function scrollToBottom () {
    $(window).scrollTop($('#messages').height());
  }

  window.onresize = function(){
    scrollToBottom();
  }

  // socket.on('chat:messages:latest', function(msg) {
  //   console.log(">> " +msg);
  //   renderMessage(msg);
  //   scrollToBottom();
  // });
  //
  // socket.on('chat:people:new', function(name) {
  //   $('#joiners').show();
  //   $('#joined').text(name)
  //   $('#joiners').fadeOut(5000);
  // });

  getName();

  function loadMessages() {
    $.get(baseURL + '/chat', function(data){
      console.log(data);
      data.map(function(msg){
        renderMessage(msg);
      })
        scrollToBottom();
    })
  }
  loadMessages();
});



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

  $( "#send" ).click(function() {
    console.log('Save Button Clicked!');
    postNotes();
  });
});
