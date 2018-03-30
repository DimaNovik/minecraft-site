$(document).ready(function() {
	/*------------------------------------*/
	/* FUNCTIONS WINDOW SCROLL AND RESIZE */
	/*------------------------------------*/

	// Scroll page function 
	$(window).scroll( function () {
		if($(window).width() >= 992) {
			var scrollH = window.pageYOffset;
			fixedHeader(scrollH);
		}
		if($(window).width() <=720) {
			var scrollH = window.pageYOffset;
			showedBack(scrollH);
		}
	});
	// Resize page function
	$(window).resize(function() {
		if($(window).width() >= 720) {
			hoverFirstMenu();
			hoverSecondMenu();
		}
		if($(window).width() <= 780) {
			appendMobPag();
			handleFirstMenu();
			handleSecondMenu() 
		}
	})

	// Starting all function ofr big screen
	if($(window).width() >= 720) {
		hoverFirstMenu();
		hoverSecondMenu();
	}
	// Starting all function for ipad and mobile
	if($(window).width() <= 780 ) {
		appendMobPag();
		handleFirstMenu(); 
		handleSecondMenu()
	}


	/*------------------------------------*/
	/* FUNCTIONS WORK WITH DOM */
	/*------------------------------------*/

	// Hover for dropdown menu
	function hoverFirstMenu() {
		$('.dropdown').on('mouseover click', function(event) {
			event.preventDefault();
			$('.dropdown-menu').each(function() {
				$(this).removeClass('showed');
			});
			$(this).parent('li').children('.dropdown-menu').each(function() {
				$(this).css('left', '0');
				var widthThis = $(this).width();
				var widthFromLeft = $(this).offset().left;
				var widthToRight = $(window).width() - widthFromLeft;

				// Если ширина до левого края меньше размера меню, то
				// открывать его слева
				if(widthToRight < widthThis) {
					$(this).addClass('left-position').css('left', '-150%');
				} else {
					$(this).removeClass('left-position');
				}
			})
			$(this).parent('li').children('.dropdown-menu').addClass('showed');
		});
		$('.dropdown').on('mouseleave', function(event) {
			$('.dropdown-menu').each(function() {
				$(this).removeClass('showed');
			});
		});
	}
	// Hover for second dropdown menu
	function hoverSecondMenu() {
		$('.dropdown-second').on('mouseover click', function(event) {
			event.preventDefault();
			$('.dropdown-second').each(function() {
				$(this).removeClass('active');
			})
			$(this).addClass('active');
			$('.header-top-area, .header-main-photo, .header-nav-logo').on('mouseover', function() {
				$('.dropdown-second-menu').each(function() {
					$(this).removeClass('showed left-position');
				});
			});
			$('.dropdown-second-menu').each(function() {
				$(this).removeClass('showed active left-position');
			});

			$(this).parent('li').children('.dropdown-second-menu').each(function() {
				$(this).css('left', '100%');

				var widthThis = $(this).width();
				var widthFromLeft = $(this).offset().left;
				var widthToRight = $(window).width() - widthFromLeft;

				// Если ширина до левого края меньше размера меню, то
				// открывать его слева
				if(widthToRight < widthThis) {
					$(this).addClass('left-position').css('left', '-100%');
				} else {
					$(this).removeClass('left-position');
				}
			})
			$(this).parent('li').children('.dropdown-second-menu').addClass('showed');
		});
	}
	// Open dropdown menu on in burger
	function handleFirstMenu() {
		$('.dropdown').on('click', function(event) {
			event.preventDefault();
			$('.dropdown').each(function() {
				$(this).removeClass('active');
			})
			$(this).children('.fa').toggleClass('fa-angle-right fa-angle-down');
			$(this).toggleClass('active').parent('li').children('.dropdown-menu').toggle();
		})
	}
	// Open dropdown menu on in burger
	function handleSecondMenu() {
		$('.dropdown-second').on('click', function(event) {
			event.preventDefault();
			$('.dropdown-second').each(function() {
				$(this).removeClass('active');
			})
			$(this).children('.fa').toggleClass('fa-angle-right fa-angle-down');
			$(this).toggleClass('active').parent('li').children('.dropdown-second-menu').toggle();
		})
	}
	// Open search area
	$('.header-nav-search').on('click', function() {
		$('.search-area').toggleClass('active');
		$('#search-val').focus();
	});
	// Clear placeholder
	$('#search-val').click(function() {
		$(this).attr('placeholder','');
	})
	// Clear search input value
	$('.search-area-form span').click(function() {
		$('#search-val').val('').attr('placeholder', 'Что ищем?');
	})
	// Open burger menu
	$('.header-nav-burger').on('click', function() {
		$(this).find('.fa').toggleClass('fa-bars fa-close');
		$('.header-nav nav').toggle();
		$('.header-nav-menu .dropdown .fa').each(function() {
			$(this).removeClass('fa-angle-down').addClass('fa-angle-right');
		})		
	});
	// Function adding fixed header menu
	function fixedHeader(scrollH) {
		var topSocialHeight = $('.header-top-area').innerHeight();
		if(scrollH >= topSocialHeight) {
			$('.header-nav-area').addClass('fixed');
		} else {
			$('.header-nav-area').removeClass('fixed');
		}	
	}
	// Cut paggination on width max 720px and put append content area
	function appendMobPag() {
		$('.paggination').appendTo('.content-area');
	}
	// Showed back up button
	function showedBack(scrollH) {
		if(scrollH >= 600) {
			$('.return-up').addClass('active');
			
		} else {
			$('.return-up').removeClass('active');
		}		
	}
	// Back to TOP click
	$('.return-up').on('click', function() {
		$('html,body').animate({scrollTop: 0}, 600);
	});
	// Open comment area after focus first input
	$('.start input').on('click', function() {
		$(this).toggle();
		$('.comment-form .active').toggle();
		$('.comment-form .active').find('textarea').focus().val('');
	});
	// Open comment area for answer
	$('.comment-area-first-level a').on('click', function(event) {
		event.preventDefault();
	})
	// Open comment area for answer in second level
	$('.comment-area-second-level a').on('click', function(event) {
		event.preventDefault();
		$('.comment-area-second-level .comment-form').toggle();
		if($('.comment-area-second-level .comment-form').css("display") == "block") {
			$(this).html('Скрыть');
		} else {
			$(this).html('Ответить');
		}
	});
	// Init owlcarousel slider
	$('.card-area-slider-preview').owlCarousel({
		loop: true,
		margin:10,  
		dots: false,
		nav: false,
		responsive:{
			0:{
				items:3,
				margin: 20,

				center: true,
			},
			600:{
				items:3
			},
			1000:{
				items:5
			}
		}
	})
});