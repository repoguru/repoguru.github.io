
GlobalProjectID = -1;
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
    callServer(msg,GlobalProjectID);
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
    $('<div class="message new"><figure class="avatar"><img src="images/bot.png" /></figure>' + "Hi there, how are you?"+ '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 5) * 10);

}



function SecondMessage() {


  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new">' + "Please choose a repository"+ '</div>').appendTo($('.mCSB_container')).addClass('new');

    setDate();
    updateScrollbar();
    i++;
  }, 1000);


  setTimeout(function() {
    $('<Button class="repository_Button" onclick=" GlobalProjectID = 1;" id="Kafka"> Kafka </Button>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 2000);

  setTimeout(function() {
    $('<Button class="repository_Button" onclick="GlobalProjectID = 2; " id="Hibernate"> Hibernate </Button>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 2500);

}

// set up event listener for clicking Kafka And Heibernate buttons.
// Change the GlobalProjectID and use it when sending a query to the server.
$( "#Kafka" ).click(function() {
      GlobalProjectID = 1;
      alert('Kafka');
});


$( "#Hibernate" ).click(function() {
      GlobalProjectID = 2;
      alert('Hibernate');
});


function responseMessage(msgText) {
  // if ($('.message-input').val() != '') {
  //   return false;
  // }

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


callServer = function(enteredText, var_projectID) {
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
        

        cor.open('POST', 'https://858973a4.ngrok.io/oz', true);
        cor.withCredential = "true";
        cor.setRequestHeader("Content-type", "application/x-www-form-urlencoded");       
        cor.send('userMsg=' + enteredText + "&projectID=" + var_projectID);

    }
