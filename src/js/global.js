import $ from 'jquery';
import Headroom from './headroom/headroom.js';
import './slick/slick.js';
import { CountUp } from 'countup.js';

$(document).ready(function(){
	const GlobalScripts = {
		init() {
	    this.cache();
	    this.events();
			this.initHeadroom();
			this.navigationActiveLinks();
			this.hoverStates();
			this.mobileSliders();
			this.expandStaticBox();
			this.dynamicCount();
			this.customSliderNav();
		},
	  cache() {
	    this.$doc = $(document);
	    this.$win = $(window);
	    this.$html = $('html');
	    this.$body = $('body');
	    this.$htmlBody = $('html,body');
	    this.$mainWrap = $('main');
	    this.$mobileNav = $('.js-nav-mobile');
	    this.$hamburgerNav = $('.js-nav-hamburger');
	    this.$hamburger = $('.js-hamburger');
	  },
		events() {
			this.$doc.on('click', '.js-nav-hamburger', event => this.showMobileNav(event));
			this.$doc.on('click', '.js-share', event => this.openShareWindow(event));
		},
		navigationActiveLinks(){
			// this is only temporary active link state for now - should be reviewed once backend is done
			var pathname = window.location.pathname;
			$(".header__desktop a").each(function(){
			  if(~pathname.indexOf($(this).attr('href'))){
					$(this).addClass("active");
					return;
				}
			});
		},
		customSliderNav(){
			$(".custom-slider__desktop-content").eq(0).show();
			$(".custom-slider__desktop-nav a").on('click', function(){
				var clickedItem = $(this).index();
				$(".custom-slider__desktop-nav a").removeClass("active");
				$(this).addClass('active');
				$(".custom-slider__desktop-content").hide();
				$(".custom-slider__desktop-content").eq(clickedItem).fadeIn();
			});
		},
		dynamicCount(){
			if($(".dynamic-count").length){
				var animated = false;
				const easingFn = function (t, b, c, d) {
				  var ts = (t /= d) * t;
				  var tc = ts * t;
				  return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
			  }
				const runAnimations = () => {
					const options1 = {
					  duration: 6,
				 	  easingFn,
					};
					const options2 = {
					  duration: 5,
				 	  easingFn,
					};
					const options3 = {
					  duration: 4,
				  	prefix: '> ',
					  easingFn,
					};
					const options4 = {
					  duration: 3,
						prefix: '~ ',
					  easingFn,
					};
					var countUp1 = new CountUp('count1', 11, options1);
					var countUp2 = new CountUp('count2', 189, options2);
					var countUp3 = new CountUp('count3', 456, options3);
					var countUp4 = new CountUp('count4', 10000, options4);
					countUp1.start();
					countUp2.start();
					countUp3.start();
					countUp4.start();
				};
				$(window).on('scroll', function() {
					var scrollTop = $(this).scrollTop();
					var topDistance = $(".dynamic-count").offset().top;
					if ( (topDistance - 200) < scrollTop ) {
						if(!animated) runAnimations();
						animated = true;
					}
				});
			}
		},
		expandStaticBox(){
			$(document).on({
				mouseenter: function () {
					$(this).addClass("active");
					$(this).find("span").text("WENIGER")
				},
				mouseleave: function () {
					$(this).find("span").text("Mehr")
					$(this).removeClass("active");
				}
			}, '.expand-boxes__item');

			$(document).on({
				mouseenter: function () {
					$(this).addClass("active");
					$(this).find("span").text("WENIGER")
				},
				mouseleave: function () {
					$(this).find("span").text("Mehr")
					$(this).removeClass("active");
				}
			}, '.explore-boxes__item--dynamic');
		},
		mobileSliders(){
			// services slider
			var servicesSlider = $('.js-services');
			var servicesSettings = {
				dots: false,
				arrows: false,
				slidesToShow: 1,
				infinite: false,
				autoplay: false,
				centerMode: true,
				responsive: [{
					breakpoint: 700,
					settings: {
						slidesToShow: 1.3,
						slidesToScroll: 1.3
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			}
			slick_on_mobile( servicesSlider, servicesSettings);

			// news slider
			var newsSlider = $('.js-news');
			var newsSettings = {
				dots: false,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				autoplay: false,
				centerMode: true,
				responsive: [{
					breakpoint: 700,
					settings: {
						slidesToShow: 1.3,
						slidesToScroll: 1.3
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			}
			slick_on_mobile( newsSlider, newsSettings);

			// family expand boxes slider
			var expandBoxesSlider = $('.js-expand-boxes');
			var expandBoxesSettings = {
				dots: false,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				autoplay: false,
				centerMode: true
			}
			slick_on_mobile( expandBoxesSlider, expandBoxesSettings);

			// direct investments - portfolio slider
			var customSlider = $('.js-custom-slider');
			var customSliderSettings = {
				dots: false,
				arrows: false,
				slidesToShow: 1.2,
				slidesToScroll: 1,
				infinite: false,
				autoplay: false,
				centerMode: true,
				responsive: [{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			}
			slick_on_mobile( customSlider, customSliderSettings);

			// wealth management - explore boxes
			var exploreBoxesSlider = $('.js-explore-boxes');
			var exploreBoxesSliderSettings = {
				dots: false,
				arrows: false,
				slidesToShow: 1.2,
				slidesToScroll: 1,
				infinite: false,
				autoplay: false,
				centerMode: true,
				responsive: [{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			}
			slick_on_mobile( exploreBoxesSlider, exploreBoxesSliderSettings);


			// direct investments - portfolio slider
			var portfolioSlider = $('.js-portfolio-items');
			var portfolioSliderSettings = {
				dots: false,
				arrows: false,
				slidesToShow: 1.2,
				slidesToScroll: 1,
				infinite: false,
				autoplay: false,
				centerMode: true,
				responsive: [{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			}
			slick_on_mobile( portfolioSlider, portfolioSliderSettings);

	  	// slick on mobile
			function slick_on_mobile(slider, settings){
				$(window).on('load resize', function() {
					if ($(window).width() > 960) {
						if (slider.hasClass('slick-initialized')) {
							slider.slick('unslick');
						}
						return
					}
					if (!slider.hasClass('slick-initialized')) {
						return slider.slick(settings);
					}
				});

			};

			$(window).on('load resize', function() {
				if ($(window).width() > 960) {
					$(".portfolio__box--dynamic").removeClass("clicked");
					$(".portfolio__box--dynamic").unbind(addDoubleTap());
				}
				else{
					$(".portfolio__box--dynamic").bind(addDoubleTap());
				}
			});

			var addDoubleTap = () => {
				$(".portfolio__box--dynamic").on('click', function(e){
					if(!$(this).hasClass("clicked")){
						e.preventDefault();
						$(".portfolio__box--dynamic").removeClass("clicked");
						$(this).addClass("clicked");
					}
					else if($(this).hasClass("clicked")){
						console.log('go for it');
					}
				});
			}

		},
		hoverStates(){
			// services boxes
			$(document).on({
		    mouseenter: function () {
					$(".services__box .services__box-bottom").css('opacity', 0.6);
					$(".services__box img").css('opacity', 0.35);
					$(this).addClass('services__box--focus');
		    },
		    mouseleave: function () {
					$(".services__box").removeClass('services__box--focus');
					$(".services__box .services__box-bottom").css('opacity', 1);
					$(".services__box img").css('opacity', 1);
		    }
			}, '.services__box');
		},
		initHeadroom() {
			$(".js-header").on('mouseover', function(){
				$(this).addClass('headroom--pinned').removeClass('headroom--unpinned headroom--not-top');
			});
	    let theHeader = document.querySelector('.js-header');
	    let headroom = new Headroom(theHeader, {
			  "offset": 90,
				"tolerance" : {
	        down : 0,
	        up : 10
		    },
			});
	    headroom.init();
	  },
		showMobileNav(event) {
			event.preventDefault();
			this.$mobileNav.toggleClass('is-active');
			this.$hamburgerNav.toggleClass('is-active');
			this.$hamburger.toggleClass('is-active');
			this.$htmlBody.toggleClass('has-active-nav');
			if (this.$mobileNav.hasClass('is-active')) {
				this.$hamburger.attr('aria-pressed', 'true');
			} else {
				this.$hamburger.removeAttr('aria-pressed');
			}
		}
	}

	GlobalScripts.init();
});
