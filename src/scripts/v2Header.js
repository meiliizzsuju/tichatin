// work hover
// main nav
import $ from 'jquery';
import { SSection , register} from './../scripts/section';


export const CONTAINER_SELECTOR = '[data-v2-header]';
export const V2_MOBILE_BUTTON = '[data-v2-mobile-button]';
export const V2_MOBILE_NAV = '[data-mainnav]';

export const CLASS_ACTIVE = 'is-active';
export const CLASS_REVERSE = 'is-reverse';
export const CLASS_NAV_ACTIVE = 'is-nav-active';

export class v2Header extends SSection {
  constructor(container) {
    super(container);

    this.container = container;
    this.buttons = container.find(V2_MOBILE_BUTTON);
    this.mobileNav = this.container.find(V2_MOBILE_NAV);
    this.v2body = $('[data-v2-body]');

    // action
    this.container.on('click touchend', V2_MOBILE_BUTTON, e => this.onClickButton(e));
  }

  onClickButton(e){
    e.stopPropagation();
    e.preventDefault();

    let self = $(e.currentTarget);
    if (!this.mobileNav.hasClass(CLASS_ACTIVE)){
      this.mobileNav.addClass(CLASS_ACTIVE);
      this.v2body.addClass(CLASS_NAV_ACTIVE);
    } else {
      this.mobileNav.removeClass(CLASS_ACTIVE);
      this.v2body.removeClass(CLASS_NAV_ACTIVE);
      this.mobileNav.addClass(CLASS_REVERSE).delay(2000).queue(function(next){
        $(this).removeClass(CLASS_REVERSE);
        next();
      });
    }
    console.log(this.v2body);
    console.log("yo")
  }
}


register(CONTAINER_SELECTOR, v2Header);