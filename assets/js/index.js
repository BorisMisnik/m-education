$(document).ready(function(){

	var links = $('ul.nav a');
	var section = $('section');
	var timer = null;

	function scrollById(id){
		var section = $('#' + id);
		var navBar = $('.navbar');
		var y = section.offset().top - navBar.outerHeight(true);
		navbar(id);
		$('html, body').scrollTop(y);
	}

	function navbar(className){
		$('.active').removeClass('active');
		$('.' + className).parent().addClass('active');
	}

	function scrollWindow(){

		if( timer !== null ){
			clearTimeout(timer);
		}
		timer = setTimeout(stopScroll, 500);

		function stopScroll(){

			if( window.history && 'pushState' in history ){
				var link = $('.active a').attr('href');
				history.pushState(null, null, link);
			}

		}

		section.each(function(){
			$this = $(this).get(0);
			var y1 = $this.getBoundingClientRect().top;
			var y2 = $(document).scrollTop();

			if( y1 <= 70 && y2 < $this.getBoundingClientRect().height + $(this).offset().top ){
				var className = $this.id;
				navbar(className);
			}
			else if( y2 === 0 ){
				var className = 'about';
				navbar(className);
			}
		});
	}

	function linkClick(e){
		var id = e.target.className;
		if( id !== '' ){
			scrollById(id);
		}
	}

	setTimeout(function(){
		scrollById(window.location.hash.replace('#/',''));
	},100);

	links.on('click', linkClick);
	$(window).scroll($.throttle(100, scrollWindow))

}); 