function logout(){
	$.post('/logout', function(data, textStatus, xhr) {
		window.location = "/";
	});
}
function create(){
    $.post('/callaccounts', function(data, textStatus, xhr) {
        if(data=="success"){
           window.location = "/newproject"
        }else{
           window.location = "/"
        }
    });
}
function clickProject(page_id){
    window.location = '/project/'+page_id;
}