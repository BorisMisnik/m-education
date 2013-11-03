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

}); 