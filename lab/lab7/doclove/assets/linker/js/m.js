$('document').ready(function(){
	var c = true;
	$('form').submit(function(){
		$(this).remove($(this).children('button'))
	})
	$('input').click(function(){
		if(c && $('#cta span').attr('class') != 'error'){
			$('#signup').append('<input type="text" name="username" placeholder="Username"/><input type="password" name="password" placeholder="Password"/><button>Sign Up</button>');
			c = false;
		}
	})
	$('#login').click(function(){
		if(!$('#pop').text()){
			$('#pop').html("<div id='out'></div><form id='up' action='/Public/login' method='post' class='small-6 large-centered columns'><h2>Login</h2><label>Username</label><input type='text' name='username' /><label>Password</label><input type='password' name='password' /><button>Log In</button>");
			$('#out').click(function(){$('#pop').empty()})
		}
	})
	$('#out').click(function(){$('#pop').empty()})
	$("textarea").jqte();
	$('.jqte_editor').click(function(){
		$('.jqte').css('height',String($('aside').height()-55))
		setInterval(function(){
			post()
		},3000)
	})
})
function post(){
	$.ajax({
		url: '/Public/update',
		type: 'post',
		data: {
			id: $('#header').attr('docId'),
			header: $('#header').val(),
			cont: $('.jqte_editor').html()
		},
		dataType: 'json',
		success: function(response){
			// get()
			console.log('saved')
		},
		error: function (xhr) {
			console.log(xhr.responseText);
		}
	})
}
function get(){
	$.ajax({
		url: '/Public/get',
		type: 'get',
		data: {
			id: $('#header').attr('docId')
		},
		dataType: 'json',
		success: function(response){
			$('.jqte_editor').html(response.cont)
		},
		error: function (xhr) {
			console.log(xhr.responseText);
		}
	})
}