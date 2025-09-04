var pc = false;
var pn = location.pathname;
  if(pn.indexOf('/story') !== -1 || pn.indexOf('/story/') !== -1){
    var path = 'story';
  }else if(pn.indexOf('/campaign') !== -1 || pn.indexOf('/campaign/') !== -1){
    var path = 'campaign';
  }else if(pn.indexOf('/distilleries') !== -1 || pn.indexOf('/distilleries/') !== -1 || pn.indexOf('/guide') !== -1 || pn.indexOf('/guide/') !== -1){
    var path = 'distilleries';
  }else if(pn.indexOf('/products') !== -1 || pn.indexOf('/products/') !==-1){
    var path = 'products';
  }

var ua = navigator.userAgent

var os = window.navigator.platform;
if(os.indexOf('Win') != -1) {
  $("html,body").addClass("win");
}

$(function(){
/* set viewport */
  if(ua.indexOf('iPhone') > -1){
    if(pn.indexOf('/guide/') > -1){
      $("head").append(('<meta name="viewport" content="width=640, user-scalable=no" />'));
    }else if( pn != '/about.html' && pn.indexOf('/sitemap.html') == -1 && pn.indexOf('/eco.html')==-1 && pn.indexOf('/cultual.html')==-1 && pn.indexOf('/mailnews')==-1 ){
      $("head").append('<meta name="viewport" content="width=640, user-scalable=yes" />');
    }else{
      $("head").append(('<meta name="viewport" content="width=1030, user-scalable=yes" />'));
    }
    pc = false;
  }else if(ua.indexOf('Android') >-1 &&  ua.indexOf('Mobile') >-1){
    if(pn.indexOf('/guide/') > -1){
      if(ua.indexOf('Android 2.') > -1){
        $("head").append(('<meta name="viewport" content="width=640, target-densitydpi=320, initial-scale=1.0, minimum-scale=1.0,user-scalable=yes">'));
      }else{
        $("head").append(('<meta name="viewport" content="target-densitydpi=640, initial-scale=0.5, minimum-scale=0.5,user-scalable=yes">'));
      }
    }else if( pn != '/about.html' && pn.indexOf('/sitemap.html') == -1 && pn.indexOf('/eco.html')==-1 && pn.indexOf('/cultual.html')==-1 && pn.indexOf('/mailnews')==-1 ){
      if(ua.indexOf('Android 2.') > -1){
        $("head").append(('<meta name="viewport" content="width=640, target-densitydpi=320, initial-scale=1.0, minimum-scale=1.0,user-scalable=yes">'));
      }else{
        if(pn.indexOf('/twhisky/') > -1){
          $("head").append('<meta name="viewport" content="width=640, user-scalable=yes" />');
        }else{
          $("head").append(('<meta name="viewport" content="target-densitydpi=640, initial-scale=0.5, minimum-scale=0.5,user-scalable=yes">'));
        };
      }
    }else{
      $("head").append(('<meta name="viewport" content="width=1030, user-scalable=yes" />'));
    }
    pc = false;
  }else if(ua.indexOf('iPad') > -1){
    $("head").append('<meta name="viewport" content="width=1030, user-scalable=yes" />');
    pc = true;
  }else if(ua.indexOf('Android') >-1 &&  ua.indexOf('Mobile') ==-1){
    $("head").append('<meta name="viewport" content="width=1030, user-scalable=yes" />');
    pc = true;
  }else{
    pc = true;
  }
  $("html").attr('xmlns:mixi','http://mixi-platform.com/ns#');
  $("html").attr('xmlns:og','http://ogp.me/ns#');
  $("head").append('<meta property="mixi:content-rating" content="1" />');

/*  pc_menu  */
  if(path == 'products'){
    $("#header_menu1").addClass('selected');
  }else if(path == 'story'){
    $("#header_menu4").addClass('selected');
  }




/* sp_menu */
  $("#sp_menu").click(function(){
    $("html,body").css({
      overflow: 'hidden'
    });
    $("#sp_menu_content").css({
      height: '9999px'
    });
    $("#sp_menu_content").fadeIn(600);
  });
  $("#sp_menu_close").click(function(){
    $("#sp_menu_content").fadeOut(600,function(){
      $("html,body").css({
        overflow: 'visible'
      });
    });
  });

/* resize */
  $(window).resize(function(){
    if($(window).width()>=768){
      $("#sp_menu_content").hide();
    }
  });

/* back to top */
    $(".backToTop a").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});



/*  pc_menu  180516追加*/
$(document).ready(function() {
    var activeUrl = location.pathname.split("/")[2];
      navList = $("#menu2").find("a");
 
    navList.each(function(){
        if( $(this).attr("href").split("/")[2] == activeUrl ) {
         $(this).addClass("selected");
       };
  });
});
$(document).ready(function() {
    var activeUrl = location.pathname.split("/")[2];
      navList = $("#menu3").find("a");
 
    navList.each(function(){
        if( $(this).attr("href").split("/")[2] == activeUrl ) {
         $(this).addClass("selected");
       };
  });
});

