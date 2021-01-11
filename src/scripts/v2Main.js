// work hover
// main nav
import $ from 'jquery';
import { SSection , register} from './../scripts/section';
import * as ResponsiveSizes from './../scripts/Responsive';


export const CONTAINER_SELECTOR = '[data-v2-body]';
export const V2_MOBILE_BUTTON = '[data-mainnav-btn]';
export const BUBBLE_ANIMATE = '[data-bubbles-animate]';
export const DATA_SPEED = 'data-animate-ratio';
export const DATA_SPIN = 'data-spin-ratio';
export const V2_MOBILE_NAV = '[data-mainnav]';
export const DATA_MAIN_CONTENT = '[data-main-content]';
export const DATA_MAIN_LOADER = '[data-loader]';
export const DATA_MAIN_POPUP = '[data-popup]';


export const CLASS_ACTIVE = 'is-active';
export const CLASS_REVERSE = 'is-reverse';
export const CLASS_NAV_ACTIVE = 'is-nav-active';
export const CLASS_LOADED = 'is-loaded';
export const CLASS_SHOWN = 'is-shown';

export class v2Main extends SSection {
  constructor(container) {
    super(container);

    this.container = container;
    this.animate = container.find(BUBBLE_ANIMATE);
    this.mobileNav = this.container.find(V2_MOBILE_NAV);
    this.v2body = $('[data-v2-body]');
    this.mainContent = this.container.find(DATA_MAIN_CONTENT);
    this.mainLoader = this.container.find(DATA_MAIN_LOADER);
    this.mainPopup = this.container.find(DATA_MAIN_POPUP);

    this.onLoading();
    
    //Setup data index
    this.animate.each((e, i) => {
      let self = $(i);
      if(self.attr('data-index')) return;
      //Setup indexes.
      self.attr('data-index', e);
    });

    // action
    this.container.on('click touchend', V2_MOBILE_BUTTON, e => this.onClickButton(e));
    this.onScroll();
    $(window).scroll('scroll', e => this.onScroll(e));


      // V2 Exp
  let expSlide = $('[data-v2-exp-slide]');

  // experiences slick
  expSlide.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 8000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 649,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          adaptiveHeight: true
        }
      },{
        breakpoint: 999,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 6000,
          adaptiveHeight: true
        }
      }
    ]
  });
  }
  loadPopup(){
    let popup = this.mainPopup
    setTimeout(function(){
      popup.addClass(CLASS_SHOWN);
    }, 5000);
  }
  

  onLoading(){
    this.mainContent.addClass(CLASS_LOADED);
    this.mainLoader.addClass(CLASS_LOADED);

    // Show popup
    this.loadPopup();
  }

  onClickButton(e){
    e.stopPropagation();
    e.preventDefault();
    
    
    let self = $(e.currentTarget);
    let id = self.attr('href').replace("#",'');
    let handle = 'data-section-'+id;
    let target = this.container.find('['+handle+']');
    let offsetHeight = 0;

    if($(window).width() < ResponsiveSizes.small){
      this.mobileNav.removeClass(CLASS_ACTIVE);
      this.v2body.removeClass(CLASS_NAV_ACTIVE);
      this.mobileNav.addClass(CLASS_REVERSE).delay(2000).queue(function(next){
        $(this).removeClass(CLASS_REVERSE);
        next();
      });
    }

    var targetOffeset = target.offset().top - offsetHeight;
    $('html, body').animate({
      scrollTop: targetOffeset +'px'
    }, 500, 'swing');
  }

  onScroll(){
    let animateItems = this.animate;
    requestAnimationFrame(() => this.onScroll());
    let scrolled = $(window).scrollTop();

    if($(window).width() < ResponsiveSizes.medium){
      scrolled = scrolled *2;
    } else if($(window).width() > ResponsiveSizes.large){
      scrolled = scrolled*2;
    } else if($(window).width() > ResponsiveSizes.xlarge){
      scrolled = scrolled*2;
    }

    animateItems.each((e, i) => {
      let self = $(i);
      // console.log(self.offset());
      let offsetTop = self.offset().top;
      // console.log(offsetTop);
      let speedRatio = self.attr(DATA_SPEED);
      let spinRatio = self.attr(DATA_SPIN);
      let spin = offsetTop - scrolled;

      let css = `translateY(${(spin) * speedRatio}%)`;


      if (spinRatio != undefined) {
        css =`translateY(${(spin) * speedRatio}%) rotate(${(spin) * spinRatio}deg)`;
      }

      self.css({
        "transform": css,
        "-webkit-transform": css
      });
    });
    

  }
}


register(CONTAINER_SELECTOR, v2Main);