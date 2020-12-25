import $ from 'jquery';
import Headroom from './headroom/headroom.js';
import './slick/slick.js';

$(document).ready(function(){
	const GlobalScripts = {
		init() {
	    this.cache();
	    this.events();
			this.initHeadroom();
			this.hoverStates();
			this.mobileSliders();
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
		mobileSliders(){
			// services slider
			var servicesSlider = $('.js-services');
			var servicesSettings = {
				dots: false,
				arrows: false,
				slidesToShow: 1,
				infinite: false,
				autoplay: false,
				centerMode: true
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
				centerMode: true
			}
			slick_on_mobile( newsSlider, newsSettings);

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
