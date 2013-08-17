$(document).ready(function(){
	var p = $('#all-themes p');
	var li = $('#list li');

	p.hide();
	p.first().show();
	li.first().addClass('active');

	li.on('click', function(e){
		e.preventDefault();
		$this = $(this);
		$target = $this.find('a').data('target');

		p.hide();
		$('p[name='+$target+']').show();

		$('#list .active').removeClass('active');
		$this.addClass('active');
	});

	// authorizated

	$('label.checkbox').on('click', function(){
		var input = $(this).find('input');
		if( input.is( ':checked' ) )
			input.attr('checked', true );
		else
			input.attr('checked', false );
	});

	$('.text-error').hide();

	$('#login').on('click', function(e){
		e.preventDefault();

		$('.text-error').hide();
		
		var form = {
			email : $('#inputEmail').val(),
			pass  : $('#inputPassword').val(),
			remember : $('#remember').prop('checked')
		};
		$.post('/admin', form)
			.done(function(res){
				if( res === 'error' )
					$('.text-error[name="not-user"]').show();
				else if( res === 'OK' )
					window.location = '/admin/edit';
			})
			.fail(function(){
				$('.text-error[name="fail"]').show();
			});
	});


}); 