import $ from 'jquery';

const Sections = {};

export const register = (selector, initializer) => Sections[selector] = initializer;
export const deregister = (selector) => delete Sections[selector];

export class SSection {
  //container - jQuery container element
  constructor(container) {
    this.container = container;

    //Only sections that are really sections can be.. sections
    this.isSection = this.container.attr('data-section') && this.container.attr('data-section-id');

    //Get attributes
    if(this.isSection) {
      this.class = this.container.attr('class');
      this.id = this.container.attr('data-section-id');
    }
  }
}

//Initialize
$(document).ready(() => {
  let keys = Object.keys(Sections);
  keys.forEach(selector => {
    let init = Sections[selector];
    $(selector).each((i,e) => {
      new init($(e));
    });
  });
});
