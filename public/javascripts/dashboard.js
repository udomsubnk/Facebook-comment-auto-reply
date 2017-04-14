function logout(){
	$.post('/logout', function(data, textStatus, xhr) {
		window.location = "/";
	});
}