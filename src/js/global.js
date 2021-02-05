import $ from 'jquery';
import Headroom from './headroom/headroom.js';
import './slick/slick.js';
import sal from 'sal.js';
import {
	CountUp
} from 'countup.js';

$(document).ready(function() {
	const GlobalScripts = {
		init() {
			this.cache();
			this.events();
			this.initHeadroom();
			this.initSal();
			this.navigationActiveLinks();
			this.hoverStates();
			this.mobileSliders();
			this.expandStaticBox();
			this.dynamicCount();
			this.customSliderNav();
			this.servicesOnScrollLine();
			this.heroSlider();
			this.wealthManagementInfographic();
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
		initSal() {
			sal({
				threshold: 0.1
			});
		},
		wealthManagementInfographic(){
			$("svg text").on('click', function(){
				$(".circle-text").removeClass("active");
				$("svg text").removeClass('visible');

				var itemId = $(this).attr('id');
				$(this).addClass('visible');

				$("."+itemId).addClass("active")
			});
		},
		navigationActiveLinks() {
			// this is only temporary active link state for now - should be reviewed once backend is done
			var pathname = window.location.pathname;
			$(".header__desktop a").each(function() {
				if (~pathname.indexOf($(this).attr('href'))) {
					$(this).addClass("active");
					return;
				}
			});
		},
		servicesOnScrollLine() {
			if ($(".services__box-bottom").length) {
				$(window).scroll(function() {
					var top_of_element = $(".services__box-bottom span").offset().top;
					var elementsHeight = $(".services__box-bottom span").outerHeight();
					var bottom_of_element = $(".services__box-bottom span").offset().top + $(".services__box-bottom span").outerHeight();
					var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
					var top_of_screen = $(window).scrollTop();

					if ((bottom_of_screen > top_of_element + 100) && (top_of_screen < bottom_of_element)) {
						console.log('visible');
						$(".services__box-bottom p").addClass('visible');
					}
				});
			}
		},
		customSliderNav() {
			$(".custom-slider__desktop-content").eq(0).show();
			$(".custom-slider__desktop-nav a").on('click', function() {
				var clickedItem = $(this).index();
				$(".custom-slider__desktop-nav a").removeClass("active");
				$(this).addClass('active');
				$(".custom-slider__desktop-content").hide();
				$(".custom-slider__desktop-content").eq(clickedItem).fadeIn(150);
			});
		},
		dynamicCount() {
			if ($(".dynamic-count").length) {
				var animated = false;
				const easingFn = function(t, b, c, d) {
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
					const options5 = {
						duration: 2,
						prefix: '~ ',
						easingFn,
					};
					const options6 = {
						duration: 2,
						prefix: '~ ',
						easingFn,
					};
					var countUp1 = new CountUp('count1', 11, options1);
					var countUp2 = new CountUp('count2', 189, options2);
					var countUp3 = new CountUp('count3', 456, options3);
					var countUp4 = new CountUp('count4', 10000, options4);
					var countUp5 = new CountUp('count5', 8234, options3);
					var countUp6 = new CountUp('count6', 1442, options4);
					countUp1.start();
					countUp2.start();
					countUp3.start();
					countUp4.start();
					countUp5.start();
					countUp6.start();
				};
				$(window).on('scroll', function() {
					var scrollTop = $(this).scrollTop();
					var topDistance = $(".dynamic-count").offset().top;
					if ((topDistance - 200) < scrollTop) {
						if (!animated) runAnimations();
						animated = true;
					}
				});
			}
		},
		expandStaticBox() {
			$(document).on({
				mouseenter: function() {
					$(this).addClass("active");
					$(this).find("span").text("WENIGER")
				},
				mouseleave: function() {
					$(this).find("span").text("Mehr")
					$(this).removeClass("active");
				}
			}, '.expand-boxes__item');

			$(document).on({
				mouseenter: function() {
					$(this).addClass("active");
					$(this).find("span").text("WENIGER")
				},
				mouseleave: function() {
					$(this).find("span").text("Mehr")
					$(this).removeClass("active");
				}
			}, '.explore-boxes__item--dynamic');
		},
		heroSlider() {
			var heroSlider = $('.js-hero-slider');
			var heroSliderSettings = {
				dots: true,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				fade: true,
				cssEase: 'linear',
				autoplaySpeed: 3000
			}
			if ($('.js-hero-slider').length) heroSlider.slick(heroSliderSettings);
		},
		mobileSliders() {

			var globalSettings = {
				centerMode: true,
				arrows: false,
				buttons: false,
				dots: false,
				infinite: false,
				centerPadding: '0px',
				slidesToScroll: 1,
				slidesToShow: 1,
				speed: 500,
				variableWidth: false,
				initialSlide: 0,
			}

			var servicesSlider = $('.js-services');
			var newsSlider = $('.js-news');
			var expandBoxesSlider = $('.js-expand-boxes');
			var exploreBoxesSlider = $('.js-explore-boxes');
			var customSlider = $('.js-custom-slider');
			var portfolioSlider = $('.js-portfolio-items');

			// slick on mobile
			function slick_on_mobile(slider, settings) {
				if ($(window).width() < 960) {
					if (!slider.hasClass('slick-initialized')) {
						return slider.slick(settings);
					}
				}
				$(window).on('load resize', function() {
					if ($(window).width() >= 960) {
						if (slider.hasClass('slick-initialized')) {
							slider.slick('unslick');
						}
						return;
					}
					if (!slider.hasClass('slick-initialized') && $(window).width() < 960) {
						return slider.slick(settings);
					}
				});
			};

			slick_on_mobile(portfolioSlider, globalSettings);
			slick_on_mobile(exploreBoxesSlider, globalSettings);
			slick_on_mobile(customSlider, globalSettings);
			slick_on_mobile(expandBoxesSlider, globalSettings);
			slick_on_mobile(newsSlider, globalSettings);
			slick_on_mobile(servicesSlider, globalSettings);

			$(window).on('load resize', function() {
				if ($(window).width() >= 960) {
					$(".portfolio__box--dynamic").removeClass("clicked");
				}
			});


			$('.js-portfolio-items').on('swipe', function(event, slick, direction){
			  console.log(direction);
				setTimeout(function(){
					$(".portfolio__box--dynamic").removeClass("clicked");
					$(".portfolio__box--dynamic.slick-current").addClass("clicked");
				},300);
			});

		},
		hoverStates() {
			// services boxes
			$(document).on({
				mouseenter: function() {
					$(".services__box .services__box-bottom").css('opacity', 0.6);
					$(".services__box img").css('opacity', 0.35);
					$(this).addClass('services__box--focus');
				},
				mouseleave: function() {
					$(".services__box").removeClass('services__box--focus');
					$(".services__box .services__box-bottom").css('opacity', 1);
					$(".services__box img").css('opacity', 1);
				}
			}, '.services__box');
		},
		initHeadroom() {
			$(".js-header").on('mouseover', function() {
				$(this).addClass('headroom--pinned').removeClass('headroom--unpinned headroom--not-top');
			});
			let theHeader = document.querySelector('.js-header');
			let headroom = new Headroom(theHeader, {
				"offset": 90,
				"tolerance": {
					down: 0,
					up: 10
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
