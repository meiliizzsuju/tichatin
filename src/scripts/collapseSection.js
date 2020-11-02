// Collapse section
import { SSection , register} from './../scripts/section';


export const CONTAINER_SELECTOR = '[data-collapse-container]';
export const BOTTON_SELECTOR = '[data-collapse]';

export const BOTTON_ATTR = 'data-collapse';


export const CLASS_ACTIVE = 'is-visible';

export class CollapseSec extends SSection {
  constructor(container) {
    super(container);

    this.container = container;
    this.allButtons = this.container.find(BOTTON_SELECTOR);

    // action
    $(window).on('resize orientationchange', () => this.onResize());
    this.onResize();
  }
  onClickButton(e){
    // e.stopPropagation();
    // e.preventDefault();
    
    let self = $(e.currentTarget);
    let id = self.attr(BOTTON_ATTR);

    // displaying button stage
    this.allButtons.removeClass(CLASS_ACTIVE);

    if(!self.hasClass(CLASS_ACTIVE)){
      self.toggleClass(CLASS_ACTIVE);
      // jump to section
      var targetOffeset = self.offset().top - 30;
      $('html, body').animate({
        scrollTop: targetOffeset +'px'
      }, 500, 'swing');
      
    }else{
      self.removeClass(CLASS_ACTIVE);
    }
  }
  onResize(){
    if(this.ResizeTimer) clearTimeout(this.ResizeTimer);
    this.ResizeTimer = setTimeout(() => {

      // on mobile
      if($(window).width() > 950){
        this.container.on('click touchend', BOTTON_SELECTOR, e => this.onClickButton(e));
      } else {
        return
      }

      this.ResizeTimer = null;
    }, 100);
  }


}


register(CONTAINER_SELECTOR, CollapseSec);