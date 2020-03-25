;(function($) {
    "use strict";

    // Mobile menu
    $('.menu-toggle').on('click', function() {
        $('.header_area').toggleClass('mobile-menu-hide');
        $('.menu-toggle').toggleClass('open');
    });

    // Mobile menu - Disappear menu after being clicked
    $('.navigation_menu').on('click', function() {
        $('.header_area').removeClass('mobile-menu-hide');
        $('.menu-toggle').removeClass('open');
    });

    // preloader js
     $(window).on('load', function() { // makes sure the whole site is loaded
		$('.sampleContainer').fadeOut(); // will first fade out the loading animation
		$('.loader').delay(150).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(150).css({'overflow':'visible'})
    });

     $('.menu li a').on('click', function(){
        $('.menu li a').removeClass('active');
        $(this).addClass('active');
        var tagid = $(this).attr('href');
        $('.pt-page').removeClass('pt-page-current');
        $(''+tagid).addClass('pt-page-current');
    });

    // $('a[href="#cheri"]').on('click', function(e) {
    //     console.log("I'm here");
    //     e.preventDefault();
    //     $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    //   });
})(jQuery)
