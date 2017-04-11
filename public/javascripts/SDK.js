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
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};
function statusChangeCallback(res){
  if(res.status == "connected"){
    FB.api('/me', function(response) {
      console.log("Hello "+response.name);
    });
  }else console.log("Please Login");
}
function loginApp(){
  FB.login(function(res) {
    if(res.status == "connected"){
      console.log("connected")
      console.log(res)
    }else {
      console.log("error")
      console.log(res)
    }
  }, {scope: 'public_profile,email'});
}

function logoutApp(){
  FB.logout(function(res) {
    console.log("logout")
    console.log(res)
  });
}

function getProfile(){
  FB.api('/me', function(response) {
    console.log("Hello "+response.name);
  });
}