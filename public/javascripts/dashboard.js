function logout(){
	$.post('/logout', function(data, textStatus, xhr) {
		window.location = "/";
	});
}
function create(){
	FB.login(function(res) {
    if(res.status == "connected"){
      console.log("connected")
      console.log(res)
      FB.api('/me/accounts',function(res){
        console.log(res)
        data = {res:JSON.stringify(res)}
        $.post('/setPages',data, function(data, textStatus, xhr) {
        	console.log(data)
			if(data=="success"){
				window.location = "/project"
			}else{
				window.location = "/"
			}
        });
      })
    }else {
      console.log("error")
      console.log(res)
    }
  }, {scope: 'public_profile,email,manage_pages,pages_show_list,publish_pages'});
}