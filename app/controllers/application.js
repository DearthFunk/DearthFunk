import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked loading = true;
  @tracked width = 0;
  @tracked height = 0;

  // https://stackoverflow.com/questions/2588181/canvas-is-stretched-when-using-css-but-normal-with-width-height-properties
  // https://html.spec.whatwg.org/multipage/canvas.html#attr-canvas-width

  constructor() {
    super(...arguments);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  @action
  didResize({ clientWidth, clientHeight }) {
    this.width = clientWidth;
    this.height = clientHeight;
  }
}
