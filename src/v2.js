import _ from 'lodash';
import './stylev2.scss';
import $ from 'jquery';
import './vendors/slick.js';

import { v2Header } from './scripts/v2Header';

$(document).ready(function(){
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
});