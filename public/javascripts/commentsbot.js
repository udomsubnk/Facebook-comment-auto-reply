function addcommentsbot(){
	$('#addcommentsbot').show();
}
$(document).ready(function() {
	$('#addcommentsbot-btn').click(pageSelect);
	$('#pageSelect').on('change', function() {
		getposts();
	})
});


function pageSelect(){
	$.post('/callaccounts', function(data, textStatus, xhr) {
		$('#pageSelect').html('<option selected disabled>เลือกเพจของคุณ</option>}');
		console.log(data)
		if(data.accounts){
			for(i in data.accounts.data){
				$('#pageSelect').append(`<option value="${data.accounts.data[i].id}" page_access_token="${data.accounts.data[i].access_token}" picture="${data.accounts.data[i].picture.data.url}">${data.accounts.data[i].name}</option>`)
			}
		}
		$('.postSelect').show()
	});
}
function getposts(){
	let page_access_token = $('#pageSelect').find(":selected").attr('page_access_token');
	$.post('/getposts', {page_access_token}, function(data, textStatus, xhr) {
		$('#postSelect').html(`<option selected>โพสทั้งหมด</option>`)
		data = JSON.parse(data);
		if(data.posts){
			for(i in data.posts.data){
				var message;
				let picture = data.posts.data[i].picture
				if(data.posts.data[i].message){
					message = data.posts.data[i].message
				}else if(data.posts.data[i].attachments){
					if(data.posts.data[i].attachments.data[0].description)
						message = data.posts.data[i].attachments.data[0].description
					else 
						message = data.posts.data[i].attachments.data[0].title
				}else{
					message = ""
				}
				message = message.substring(0,50);
				$('#postSelect').append(`<option value="${data.posts.data[i].id}">${message}</option>`)
			}
		}
	});
}