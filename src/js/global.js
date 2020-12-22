import $ from 'jquery';
import Headroom from './headroom/headroom.js';

$(document).ready(function(){
	const GlobalScripts = {
		init() {
	    this.cache();
	    this.events();
			this.initHeadroom();
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
