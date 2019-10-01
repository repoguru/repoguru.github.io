
WasTheButtonPressed = false;

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

// $(window).load(function() {
//   $messages.mCustomScrollbar();
//   setTimeout(function() {
//     FirstMessage();
//   }, 1000);

//    setTimeout(function() {
//     SecondMessage();
//   }, 2000);
// });



function showFirstMessage(){
  $messages.mCustomScrollbar();
  setTimeout(function() {
    FirstMessage();
  }, 1000);

   setTimeout(function() {
    SecondMessage();
  }, 2000);
}


function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    callServer(msg);
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})


function FirstMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="images/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="images/bot.png" /></figure>' + "Hi there, how can I help you?"+ '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 5) * 10);

}



function SecondMessage() {


  // setTimeout(function() {
  //   $('.message.loading').remove();
  //   $('<div class="message new">' + "Please choose a repository"+ '</div>').appendTo($('.mCSB_container')).addClass('new');
  //
  //   setDate();
  //   updateScrollbar();
  //   i++;
  // }, 1000);

    // This creates the buttons for the Kafka and Hibernate projects. On click, corresponding functions are called to
    // send a msg to the server with the projectID.
  setTimeout(function() {
    $('<Button class="repository_Button" onclick=" KafkaClick();" id="Kafka"> Kafka </Button>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 2000);

  setTimeout(function() {
    $('<Button class="repository_Button" onclick="HibernateClick() " id="Hibernate"> Hibernate </Button>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 2500);

}

// This function is called when the Kafka button is pressed. It calls the server and sends a msg with the Kafka projectID
// so that Rasa does its actions on the Kafka project DB
  function KafkaClick() {
        msgText = "/ChooseProject{\"ProjectID\" : \"160589817614363620869739136112460307838\"}";
        callServer(msgText);
  }

// This function is called when the Hibernate button is pressed. It calls the server and sends a msg with the Hibernate projectID
// so that Rasa does its actions on the Hibernate project DB
function HibernateClick() {
    msgText = "/ChooseProject{\"ProjectID\" : \"251524647591854110437404345652251315955\"}";
    callServer(msgText);
}


function responseMessage(msgText) {

    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="images/bot.png" /></figure>' + msgText + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
}



$( "#welcome-button" ).click(function() {

  $( "#chat" ).toggle( "scale" );
  $("#chat").css("display", "flex");
  $("#chat").css("display", "flex");

  if(WasTheButtonPressed == false){
    showFirstMessage();
    WasTheButtonPressed = true;
  }
});

const url = "https://38d17a6d.ngrok.io/oz";

callServer = function(enteredText) {
        var cor = null; // cor stands alr Cross-Origin request
        if (window.XMLHttpRequest) {
            cor = new XMLHttpRequest();
        }
        else if (window.XDomainRequest) {
            cor = new XDomainRequest();
        }
        else {
            alert("Your browser does not support Cross-Origin request!");
            return;
        }

        cor.onreadystatechange = function () {

          $('<div class="message loading new"><figure class="avatar"><img src="images/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
          updateScrollbar();

            if (cor.readyState == 4) {

              responseMessage(cor.responseText.replace(/\n/g, "<br />"))

            }
        };

        cor.open('POST', url, true);
        cor.withCredentials = true;
        cor.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        cor.send('userMsg=' + enteredText);
    };
