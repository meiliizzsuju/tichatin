// main nav
import $ from 'jquery';
import { SSection , register} from './../scripts/section';


export const CONTAINER_SELECTOR = '[data-mobile-nav]';
export const BOTTON_SELECTOR = '[data-mobile-button]';
export const COLLAPSE_CONTAINER = '[data-collapse-container]';
export const COLLAPSE_ITEM = '[data-collapse]';

export const BOTTON_ATTR = 'data-mobile-button';
export const COLLAPSE_ATTR = 'data-collapse';

export const CLASS_ACTIVE = 'is-active';

export class MainNav extends SSection {
  constructor(container) {
    super(container);

    this.container = container;
    this.buttons = container.find(BOTTON_SELECTOR);
    this.collapseContainer = $(COLLAPSE_CONTAINER);

    // action
    this.container.on('click touchend', BOTTON_SELECTOR, e => this.onClickButton(e));
  }

  onClickButton(e){
    e.stopPropagation();
    e.preventDefault();

    let self = $(e.currentTarget);
    let id = self.attr(BOTTON_ATTR);
    let target = this.collapseContainer.find("["+COLLAPSE_ATTR+"="+id+"]");
    let offsetHeight = 80;

    // button stage
    // this.buttons.removeClass(CLASS_ACTIVE);
    // if(!self.hasClass(CLASS_ACTIVE)){
    //   self.addClass(CLASS_ACTIVE);
    // }

    // jump to section
    var targetOffeset = target.offset().top - offsetHeight;
    $('html, body').animate({
      scrollTop: targetOffeset +'px'
    }, 500, 'swing');
  }

}


register(CONTAINER_SELECTOR, MainNav);