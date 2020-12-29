import $ from 'jquery';
import Headroom from './headroom/headroom.js';
import './slick/slick.js';

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
		dynamicCount(){
			var data = [ "11", "189", "456", "10000" ];
			var animated = false;

			const animationDuration = 2000;
			const frameDuration = 1000 / 60;
			const totalFrames = Math.round( animationDuration / frameDuration );
			const easeOutQuad = t => t * ( 2 - t );
			const animateCountUp = (el, i) => {
				let frame = 0;
				const countTo = parseInt( data[i], 10 );
				const counter = setInterval( () => {
					frame++;
					const progress = easeOutQuad( frame / totalFrames );
					const currentCount = Math.round( countTo * progress );
					if ( parseInt( data[i] ) !== currentCount + 1 ) {
						$(el).text(currentCount);
					}
					if ( frame === totalFrames ) {
						clearInterval( counter );
					}
				}, frameDuration );
			};
			const runAnimations = () => {
				var countupEls = $(".dynamic-count__counter span");
				$.each(countupEls, function( index, value ) {
				  animateCountUp($(this), index);
				});
			};

			$(window).on('scroll', function() {
				var scrollTop = $(this).scrollTop();
				var topDistance = $(".dynamic-count").offset().top;
				if ( (topDistance - 200) < scrollTop ) {
					if(!animated) runAnimations();
					animated = true;
				}
			});

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
