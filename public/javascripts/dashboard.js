function logout(){
	$.post('/logout', function(data, textStatus, xhr) {
		window.location = "/";
	});
}
function create(){
	// FB.login(function(res) {
 //    if(res.status == "connected"){
 //      console.log("connected")
 //      FB.api('/me','GET',{"fields":"accounts{name,id,perms,picture}"},function(res){
 //        data = {res:JSON.stringify(res.accounts)}
 //        $.post('/setPages',data, function(data, textStatus, xhr) {
 //    			if(data=="success"){
 //    				window.location = "/newproject"
 //    			}else{
 //    				window.location = "/"
 //    			}
 //        });
 //      })
 //    }else {
 //      console.log("error")
 //      console.log(res)
 //    }
 //  }, {scope: 'public_profile,email,manage_pages,pages_show_list,publish_pages'});
  
}
