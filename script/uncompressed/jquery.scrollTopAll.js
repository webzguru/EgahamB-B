(function($) {

	$.fn.scrollTopAll = function( options ) {

		that = this;

		settings = $.extend( {
				  cssSuffix: '.menu-css',
				  speed: 500,
				  easing: 'linear'
			}, options );

		// Add suffix
		that.addClass(settings.cssSuffix.substring(1));

		lastId = "";
		topMenu = $(settings.cssSuffix);
		topMenuHeight = 0;
		menuItems = topMenu.find("a");

		scrollItems = menuItems.map(function(){

			var item = $($(this).attr("data-link"));

			if (item.length) {
				return item;
			}

		});

		menuItems.on('click', function(e){

			var tags = $(this).attr("data-link");
			tags=='#' ? offsetTop = 0 : offsetTop = $(tags).offset().top-topMenuHeight + 1 ;

			$('html, body').stop().animate({ 
				scrollTop: offsetTop
			}, settings.speed, settings.easing);

			e.preventDefault();
			return false;

		});

		$(window).scroll(function(){

			var fromTop = $(this).scrollTop()+topMenuHeight;

			var cur = scrollItems.map(function(){

				if ($(this).offset().top < fromTop) {
					return this;
				}

		   });

		   cur = cur[cur.length-1];
		   var id = cur && cur.length ? cur[0].id : "";

		   if (lastId !== id) {
			   lastId = id;
			   menuItems
				 .parent()
				 .removeClass("menu-active")
				 .end()
				 .filter("[data-link=#"+id+"]")
				 .parent()
				 .addClass("menu-active");
		   } 

		});

	}

})(jQuery);