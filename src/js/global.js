import $ from 'jquery';

const GlobalScripts = {
	init() {
    this.cache();
    this.events();
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
