/*****************************************
******************************************
//////////// Reorder Modal Js ////////////
******************************************
*****************************************/
  
function openReorderPopUp(){
  $("#emailRedorder").val("");
  $("#reorderPopup").find(".errReorderMessage").html("");
  $('html, body').css({
    overflow: 'hidden',
    height: '100%'
  });
  $("#reorderPopup").removeClass("DN");
  $("#redorerLayouver").removeClass("DN");
  $("#js-nav-close").click();
  if($("body").hasClass("show-mobile-nav")){
     $(".toggle-mob-nav").click();
  }
}

function closeRedorderPopUp(){
  $('html, body').css({
    overflow: 'auto',
    height: 'auto'
  });
  $("#reorderPopup").addClass("DN");
   $("#skinTestPopup").addClass("DN");
  $("#redorerLayouver").addClass("DN");
}


function validateEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function sendReorderMail(){
 
  var errContainer = $("#reorderPopup").find(".errReorderMessage");
  errContainer.html("").removeClass("DN").css("color", "#d93025");
  var email = $("#emailRedorder").val();
  if(email != ""){

    if(validateEmail(email)){
      $("#emailRedorder").attr('disabled', 'disabled')
      $("#reorderPopup").find(".buttonrdr").attr('disabled', 'disabled').html("sending...");

      $.ajax({
        url:"https://europe-west1-metrics-production-1.cloudfunctions.net/sendReorderLink/"+email ,
        method:"GET"
      }).done(function(data){
        $("#emailRedorder").removeAttr('disabled')
        $("#reorderPopup").find(".buttonrdr").removeAttr('disabled').html("Reorder");
        if(data.contactExists){
          errContainer.html("Your personal reorder link has been sent to your email address.").removeAttr( 'style' );
          setTimeout(function(){ $("#reorderPopup").find(".closerdr").click(); }, 9000);
        }else{
          errContainer.html("Please start the skin test first to configure your personalized cream.");
        }


      })

    }else{
      errContainer.html("Please enter a valid email address.");
      return false;
    }
  }else{

    errContainer.html("Please enter the email address you used for your last order. We will then send you a personal link which you can use to directly reorder your skin care products.");

  }

}

function openTestResultPopUp(){
  $("#emailSkinTest").val("");
  $("#skinTestPopup").find(".errReorderMessage").html("");
  $('html, body').css({
    overflow: 'hidden',
    height: '100%'
  });
  $("#skinTestPopup").removeClass("DN");
  $("#redorerLayouver").removeClass("DN");
  $("#js-nav-close").click();

}


function sendSkinTestMail(){
 
  var errContainer = $("#skinTestPopup").find(".errReorderMessage");
  errContainer.html("").removeClass("DN").css("color", "#d93025");
  var email =  $("#emailSkinTest").val();
  if(email != ""){

    if(validateEmail(email)){
      $("#emailSkinTest").attr('disabled', 'disabled')
      $("#skinTestPopup").find(".buttonrdr").attr('disabled', 'disabled').html("sending...");

      $.ajax({
        url:"https://europe-west1-metrics-production-1.cloudfunctions.net/sendSkinTestEmail/"+email ,
        method:"GET"
      }).done(function(data){
        $("#emailSkinTest").removeAttr('disabled')
        $("#skinTestPopup").find(".buttonrdr").removeAttr('disabled').html("Skin test email");
        if(data.contactExists){
          errContainer.html("Your personal Skin test result link has been sent to your email address.").removeAttr( 'style' );
          setTimeout(function(){ $("#skinTestPopup").find(".closerdr").click(); }, 9000);
        }else{
          errContainer.html("Please start the skin test first to configure your personalized cream.");
        }


      })

    }else{
      errContainer.html("Please enter a valid email address.");
      return false;
    }
  }else{

    errContainer.html("Please enter the email address you used for your Skin test. We will then send you a personal link which you can use to directly see your personalized day and night cream.");

  }

}

if($(window).width() < 767){
  $('.reordrrLink').on('click', function(){
    $('body').removeClass('show-mobile-nav');
  });
}
  
$('.additional_text_button').on('click', function(){
  $(this).closest('.gallery__item').toggleClass('opened');
  
});