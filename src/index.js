
import _ from 'lodash';
import './style.scss';
import $ from 'jquery';
import './vendors/slick.js';
import './vendors/jquery.inview';

// mainav
import { MainNav } from './scripts/mainNav';
import { CollapseSec } from './scripts/collapseSection';

window.jQuery = $;
window.$ = $;

export const CLASS_ACTIVE = 'is-active';

$(document).ready(function(){

  var mainWrapper = $('[data-main-wrapper]');
  var container = $('[data-collapse-container]');
  var $window = $(window);
  var collapseSections = $('[data-collapse]')
  // Cache selectors
  var lastId,
  topMenu = $("#top-menu"),
  topMenuHeight = topMenu.outerHeight()+15,
  // All list items
  menuItems = topMenu.find("[data-mobile-button]");
  var menuItemIDs = menuItems.map(function(){
    let thisItem = $(this);
    let id = thisItem.attr('data-mobile-button');
    if(id.length != 0){
      return id;
    }
  })

  var menuItemsEle = container.find('[data-collapse]');

  var menuItemsEleList = menuItemsEle.each((e, i) => {
    let itemEle = $('[data-collapse="'+i+'"]');
    if(itemEle.length != 0){
      menuItemsEleList.push(itemEle);
    }
  });

  // detect section

  function onScrolling(){
    $(menuItemsEle).bind('inview', function(event, visible) {
      // check to only active the function on mobile
      if (visible) {
        $(this).stop().animate({ opacity: 1 });
        let currentTarget = $(event.currentTarget);
        let currentID = currentTarget.attr('data-collapse');
        let currentButton = topMenu.find('[data-mobile-button="'+currentID+'"]')
        // displaying button stage
        menuItems.removeClass(CLASS_ACTIVE);
        if(!currentButton.hasClass(CLASS_ACTIVE)){
          currentButton.addClass(CLASS_ACTIVE);
        }
      }
    });
  }

  // Nav in viewport
  if(this.ResizeTimer) clearTimeout(this.ResizeTimer);
  this.ResizeTimer = setTimeout(() => {

    // on mobile
    if($(window).width() < 950){
      onScrolling();
    }
    this.ResizeTimer = null;
  }, 100);
  // on mobile
  if($(window).width() < 950){
    onScrolling();
  }


  /** ------- nav bar -------  **/
    function onScroll(e){
      // chage nav stylne

      let mobileNav = mainWrapper.find('[data-mobile-nav]');
      let distance = mobileNav.offset().top;
      let windowTop = $window.scrollTop();

      if ( Math.round(windowTop) >= Math.round(distance) ) {
        // Your div has reached the top
        mobileNav.addClass("is-reached");
        return;
      } else{
        mobileNav.removeClass("is-reached");
        return;
      }


    }

    $(window).scroll('scroll', e => onScroll(e));
  /** ------- nav bar -------  **/


  let expSlide = $('[data-experiences-slide]');

  // experiences slick
  expSlide.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 649,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },{
        breakpoint: 999,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 6000,
        }
      }
    ]
  });


  // EXP slick page counter
  var stepPage = mainWrapper.find('[data-case-steps-page]');
  function onSlickChange(event, slick, currentSlide, nextSlide){
    let current = slick.currentSlide+1;

    let body = `<span class="slick-page-wrap"><span class="slick-page">${current} </span><span class="c-featured-reviews__header-paginate-text">of </span><span class="slick-page">${slick.slideCount}</span></span>`
    stepPage.html(body);
  }

  // On after slide change
  expSlide.on('afterChange', (e, slick, currentSlide, nextSlide) => onSlickChange(e, slick, currentSlide, nextSlide));

});


$(window).on("load", function() {
  let popup = $('[data-popup]');
    setTimeout(function(){
      popup.addClass('is-shown');
    }, 5000);
});