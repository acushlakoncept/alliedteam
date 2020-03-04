/**
  * isMobile
  * responsiveMenu
  * headerFixed
  * ajaxContactForm
  * alertBox
  * blog_slider
  * detectViewport
  * flatIconboxCarousel
  * blogCarousel
  * flatClient
  * googleMap
  * testimonialSlide
  * onepage_nav
  * flatClient
  * responsiveVideo
  * swClick
  * activePattern
  * goTop
  * toggleExtramenu
  * retinaLogos
  * parallax
  * popupGallery
  * removePreloader
*/

;(function($) {

   'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    }   

    var headerFixed = function() { 
        if ( $('body').hasClass('header-sticky') ) {
            var hd_height = $('#header').height();           
            $(window).on('load scroll', function(){                
                if ( $(window).scrollTop() > hd_height ) {
                    $('#header').addClass('downscrolled');                      
                } else {                    
                    $('#header').removeClass('downscrolled');                   
                }
                if( $(window).scrollTop() > 300 ) {
                    $('#header').addClass('upscrolled');                    
                } else {
                    $('#header').removeClass('upscrolled');                    
                }
            })            
        }   
    }

    var ajaxContactForm = function() {  
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.form-submit').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;                            
                            if ( msg == 'Success' ) {                                
                                result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };   

    var alertBox = function() {
        $(document).on('click', '.close', function(e) {
            $(this).closest('.flat-alert').remove();
            e.preventDefault();
        })     
    }  

    var videoPopup =  function() {
        $(".fancybox").on("click", function(){
            $.fancybox({
              href: this.href,
              type: $(this).data("type")
            }); // fancybox
            return false   
        }); // on
    }

    var flatClient = function() {
        $('.flat-row').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.flat-client').owlCarousel({
                    loop: true,
                    margin: $('.flat-client').data('margin'),
                    nav: $('.flat-client').data('nav'),
                    dots: $('.flat-client').data('dots'),                     
                    autoplay: $('.flat-client').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 3
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: $('.flat-client').data('item')
                        }
                    }
                });
            }
        });
    };


    var parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax1').parallax("50%", 0.2);
            $('.parallax2').parallax("50%", 0.4);  
            $('.parallax3').parallax("50%", 0.5);            
        }
    };
  

    var counter = function() {
        $('.flat-counter').on('on-appear', function() {
            $(this).find('.numb-count').each(function() {
                var to = parseFloat($(this).attr('data-to')), speed = parseFloat($(this).attr('data-speed'));
                // var to = parseFloat($(this).attr(' data-to-float')), speed = parseFloat($(this).attr('data-speed'));
                if ( $().countTo ) {
                    $(this).countTo({
                        to: to,
                        speen: speed
                    });
                }
            });
        }); //counter
    };

    var detectViewport = function() {
        $('[data-waypoint-active="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });
    };


    var flatServicesCarousel = function() {
        $('.flat-portfolio').each(function(){
            if ( $().owlCarousel ) {
                $(this).find('.portfolio').owlCarousel({
                    loop: true,
                    margin: 30,
                    auto: true,
                    dots: false,
                    nav: true,
                    itemSelector: '.portfolio-item',
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 2
                        },
                        991:{
                            items: 3
                        }, 
                        1200:{
                            items: 6
                        }               
                    }
                });
            }
        });
    };

    var portfolioIsotope = function() {         
        if ( $().isotope ) {           
            var $container = $('.portfolio');
            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.portfolio-item',
                    transitionDuration: '1s'
                });
            });

            $('.portfolio-filter li').on('click',function() {                           
                var selector = $(this).find("a").attr('data-filter');
                $('.portfolio-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            });            
        };
    };


    var testimonialflexslider = function(){
        if ( $().flexslider ) {
            $('.flat-testimonial').flexslider({
                animation: "slide",
                direction: "history",

                controlNav: false,
                directionNav: true,
                slideshow: true,
                mousewheel: false,
                prevText: '<i class="ion-ios-arrow-thin-left"></i>',
                nextText: '<i class="ion-ios-arrow-thin-right"></i>'
            });
        };
    };

    var flatClient = function() {
        $('.flat-row').each(function() {            
            if ( $().owlCarousel ) {
                $(this).find('.flat-client').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: $('.flat-client').data('nav'),
                    dots: $('.flat-client').data('dots'),                     
                    autoplay: $('.flat-client').data('auto'),                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 3
                        },
                        991:{
                            items: 3
                        },
                        1200: {
                            items: $('.flat-client').data('item')
                        }
                    }
                });
            }
        });
    }; 

    var responsiveVideo= function() {
        if ( $().fitVids ) {
            $('.container').fitVids();
        }
    };
     
    var tabs = function() {
        $('.flat-tabs').each(function() {

            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show();

            $(this).find('.menu-tab').children('li').on('click', function(e) {
                var liActive = $(this).index(),
                    contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive);

                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
                e.preventDefault();
            });
        });
    };

    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        }); 

        $('.go-top').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };

    
    var removePreloader = function() {        
        $('.loading-overlay').fadeOut('slow',function () {
            $(this).remove();
        });
    };

    var onepage_nav = function () {
        $('.page-template-front-page .mainnav > ul > li > a').on('click',function() {           
            var anchor = $(this).attr('href').split('#')[1];            
            var largeScreen = matchMedia('only screen and (min-width: 992px)').matches;
            var headerHeight = 0;
            headerHeight = $('.header').height();            
            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                   if ( $('.header-sticky').length > 0 && largeScreen ) {
                        headerHeight = headerHeight;
                   } else {
                        headerHeight = 0;
                   }                   
                   var target = $('#'+anchor).offset().top - headerHeight;
                   $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                }
            }
            return false;
        })

        $('.mainnav ul > li > a').on( 'click', function() {
            $( this ).addClass('active').parent().siblings().children().removeClass('active');
        });
    }


   	// Dom Ready
	$(function() { 
        if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {
            headerFixed();
        } 
        responsiveMenu();                
        flatClient() ;
        tabs(); 
        goTop();  
        videoPopup ();
        testimonialflexslider ();
        counter();
        detectViewport();        
        parallax();
        portfolioIsotope();        
        onepage_nav();
        ajaxContactForm();
        alertBox();
        removePreloader();
   	});

})(jQuery);