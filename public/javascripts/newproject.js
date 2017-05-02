var data;
function selected(page_id,page_access_token){
	page_name = $('span[page_id="'+page_id+'"]').text().replace(/\'/g,"\\'").replace(/\"/g,'\\"');
	$('.page').removeClass('selected');
	$('#'+page_id).addClass('selected');
	data = {
		page_id,
		page_name,
		page_access_token
	}
}
function next(){
	if(data == undefined){
		alert('Please choose one')
		return;
	}else{
		$('#next').prop('disabled', true); //disable continue button
		$.post('/choosedpage',data, function(data, textStatus, xhr) {
			data = data.split(',')
			if(data[0] == 'success'){
				window.location = '/project/'+data[1];
			}else{
				alert('ผิดพลาด')
				window.location = '/';
			}
		});
	}
}