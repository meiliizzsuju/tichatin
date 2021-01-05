// work hover
// main nav
import $ from 'jquery';
import { SSection , register} from './../scripts/section';


export const CONTAINER_SELECTOR = '[data-v2-body]';
export const V2_MOBILE_BUTTON = '[data-mainnav-btn]';


export class v2Main extends SSection {
  constructor(container) {
    super(container);

    this.container = container;
    console.log("yeh??")

    // action
    this.container.on('click touchend', V2_MOBILE_BUTTON, e => this.onClickButton(e));
  }

  onClickButton(e){
    e.stopPropagation();
    e.preventDefault();
    
    let self = $(e.currentTarget);
    let id = self.attr('href').replace("#",'');
    let handle = 'data-section-'+id;
    let target = this.container.find('['+handle+']');
    let offsetHeight = 0;

    var targetOffeset = target.offset().top - offsetHeight;
    $('html, body').animate({
      scrollTop: targetOffeset +'px'
    }, 500, 'swing');
  }
}


register(CONTAINER_SELECTOR, v2Main);