(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v2.9&appId=106886806531561";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function loginApp(){
  FB.login(function(res) {
    if(res.status == "connected"){
      console.log("connected")
      console.log(res)
      $.post('/login',res.authResponse, function(data, textStatus, xhr) {
        if(data=='success'){
          window.location = "/dashboard";
        }else{
          alert('Error!\nPlease try again.')
        }
      });
    }else {
      console.log("error")
      console.log(res)
    }
  }, {scope: 'public_profile,email,manage_pages,pages_show_list,publish_pages'});
}