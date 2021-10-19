$(function() {
    "use strict";
    var $window = $(window),
    $body = $("body");

    $('.best-sell-slider-wrapper').slick({
        infinite: true,
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1,
        prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>',
        nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>',
        speed: 800,
        cssEase: 'linear',
        dots: false,
        responsive: [{
                breakpoint: 992,
                Settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                Settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 479,
                Settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }); 


    $('.hero-slider-wrapper').slick({
        infinite: true,
        slidesToShow: 1,
        arrows: true,
        prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>',
        nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>',
        slidesToScroll: 1,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });
});