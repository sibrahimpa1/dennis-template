import $ from 'jquery';
import Headroom from './headroom.js';

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
		// this.$doc.on('click', '.js-nav-mobile .menu-item a', event =>
		// 	this.showSubMenu(event)
		// );
	},
	initHeadroom() {
		console.log('headroom');
    let theHeader = document.querySelector('.js-header');
    let headroom = new Headroom(theHeader, {
      offset: 0,
      tolearnce: 0,
			classes : {
        // when element is initialised
        initial : "header",
        // when scrolling up
        pinned : "header--pinned",
        // when scrolling down
        unpinned : "header--unpinned",
        // when above offset
        top : "header--top",
        // when below offset
        notTop : "header--not-top",
        // when at bottom of scroll area
        bottom : "header--bottom",
        // when not at bottom of scroll area
        notBottom : "header--not-bottom",
        // when frozen method has been called
        frozen: "header--frozen",
        // multiple classes are also supported with a space-separated list
        pinned: "header--pinned foo bar"
    	},
    });
    headroom.init();
  },
	showSubMenu(event) {
		// const el = $(event.currentTarget).parent();
		// if (el.hasClass('menu-item-has-children')) {
		// 	event.preventDefault();
		// 	el.toggleClass('is-active');
		// }
	},
	showMobileNav(event) {
    console.log('senka');
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
