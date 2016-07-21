(function($) {

	$.fn.menuResponsive = function( options ) {

		$menu = this;

		$menu.find('a[data-type="submenu"]').on('click', function(e){

			if($(this).parent('li').attr('class')=='submenu open'){

			}else{
				$menu.find("ul").removeClass('submenu-active');
				$menu.find("ul li").removeClass('open');
				$menu.find("ul li a").removeClass('menu-active');
			}

			$(this).toggleClass('menu-active');
			$(this).next().toggleClass('submenu-active');
			$(this).parent().toggleClass('open');
			e.stopPropagation();
			return false;

		}).parent().addClass('submenu');
		
		$menu.find(".button").on('click', function() {
			$menu.toggleClass('active');
			return false;
		});

		$menu.find('a[data-link]').on('click', function(){
			$menu.toggleClass('active');
			return false;
		});

		$(document).on('click', function() {
			$menu.find("ul").removeClass('submenu-active');
			$menu.find("ul li").removeClass('open');
			$menu.find("ul li a").removeClass('menu-active');
		});
		
	}

})(jQuery);