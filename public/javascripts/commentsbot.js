$(document).ready(function() {
	$('#pageSelect').on('change', function() {
		getposts();
		$('.postSelect').show()
	})
	$('#is_ms_reply').on('change', function() {
		if($('#is_ms_reply').is(':checked'))
			$('.ms_reply').show()
		else $('.ms_reply').hide()
	})
	checkColor();
});

function checkColor(){
	$('.change_status_btn').each((i,el)=>{
		if($(el).text()=='on') $(el).css('background-color', '#5FF53B');
		else $(el).css('background-color', '#FC1455');
	})
}
function changeStatus(cmbot_id,that){
	let old_status = $(that).text();
	let new_status = (old_status == 'on')?'off':'on';
	let data = {
		cmbot_id,new_status
	}
	$.post('/changeCmStatus', data, function(data, textStatus, xhr) {
		if(data != 'success'){
			window.location = '';
			return;
		}
		$(that).text(new_status);
		checkColor();
	});
}
function createCommentBot(){
	let contrain = $('#contrain').val()
	let cm_reply = $('#cm_reply').val()
	let page_select = $('#pageSelect').val()
	let post_select = $('#postSelect').val()
	let is_hide_comment = $('#is_hide_comment').is(':checked')
	let is_ms_reply = $('#is_ms_reply').is(':checked')
	let ms_reply = $('#ms_reply').val()
	if(contrain == ''){
		alert('กรุณาใส่ keywords');
		return;
	}
	if(page_select == null){
		alert('กรุณาเลือกเพจ');
		return;
	}
	let data = {
		contrain,cm_reply,page_select,post_select,is_hide_comment,is_ms_reply,ms_reply
	}
	console.log(data)
	$.post('/createCommentBot', data, function(data, textStatus, xhr) {
		if(data == 'error') {
			window.location = ''
			return;
		}
		alert('สำเร็จ')
		window.location = ''
	});
}
function addCommentsBot(){
	pageSelect();
	$('#addcommentsbot').show();
}
function pageSelect(){
	$.post('/callaccounts', function(data, textStatus, xhr) {
		$('#pageSelect').html('<option selected disabled>เลือกเพจของคุณ</option>}');
		if(data.accounts){
			for(i in data.accounts.data){
				$('#pageSelect').append(`<option value="${data.accounts.data[i].id}" page_access_token="${data.accounts.data[i].access_token}" picture="${data.accounts.data[i].picture.data.url}">${data.accounts.data[i].name}</option>`)
			}
		}
	});
}
function getposts(){
	let page_access_token = $('#pageSelect').find(":selected").attr('page_access_token');
	$.post('/getposts', {page_access_token}, function(data, textStatus, xhr) {
		$('#postSelect').html(`<option value ="all_posts" selected>โพสทั้งหมด</option>`)
		data = JSON.parse(data);
		console.log(data)
		if(data.posts){
			for(i in data.posts.data){
				var message = "";
				let picture = data.posts.data[i].picture
				let post_id = data.posts.data[i].id;
				if(data.posts.data[i].message){
					message = data.posts.data[i].message
				}else if(data.posts.data[i].attachments){
					if(data.posts.data[i].attachments.data[0].description)
						message = data.posts.data[i].attachments.data[0].description
					else 
						message = data.posts.data[i].attachments.data[0].title
				}
				if(typeof message == 'string')
					message = message.substring(0,50);
				$('#postSelect').append(`<option value="${post_id}">${message}</option>`)
			}
		}
	});
}