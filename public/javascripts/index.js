function loginApp(){
  FB.login(function(res) {
    if(res.status == "connected"){
      console.log("connected")
      console.log(res)
      $.post('/login',res.authResponse, function(data, textStatus, xhr) {
        if(data=='success'){
          window.location = "/dashboard";
        }
      });
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