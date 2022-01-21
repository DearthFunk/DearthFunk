import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @tracked loading = true;
  @tracked showInfo = true;
  @tracked showLinks = true;
  @tracked showGradient = true;
  @tracked width = 0;
  @tracked height = 0;
  isMobile;
  @service animations;
  @computed.alias('animations.selectedAnimation.controls') controls;

  // https://stackoverflow.com/questions/2588181/canvas-is-stretched-when-using-css-but-normal-with-width-height-properties
  // https://html.spec.whatwg.org/multipage/canvas.html#attr-canvas-width

  constructor() {
    super(...arguments);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  @action
  didResize({ clientWidth, clientHeight }) {
    this.width = clientWidth;
    this.height = clientHeight;
  }
}
