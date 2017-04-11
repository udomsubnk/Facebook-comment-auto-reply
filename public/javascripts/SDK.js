(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
window.fbAsyncInit = function() {
  FB.init({
    appId      : '106886806531561',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
};

function loginApp(){
  FB.login(function(res) {
    if(res.status == "connected"){
      console.log("connected : "+res)
    }else {
      console.log("error : "+res)
    }
  }, {scope: 'public_profile,email'});
}

function logoutApp(){
  FB.logout(function(res) {
    console.log("logout : "+res)
  });
}