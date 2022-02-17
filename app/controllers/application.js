import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @tracked loading = true;
  @tracked showInfo = true;
  @tracked showLinks = true;
  @tracked showGradient = true;
  @tracked photoGallery;
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

    this.photoGallery = [
      { src: '../photo-gallery/burnt.jpg', w: 3771, h: 2467 },
      { src: '../photo-gallery/camping.jpg', w: 1852, h: 3827 },
      { src: '../photo-gallery/oil=money_land.jpg', w: 3824, h: 2519 },
      { src: '../photo-gallery/oil=money_sea.jpg', w: 3906, h: 2672 },
      { src: '../photo-gallery/selfie.jpg', w: 2785, h: 3881 },
      { src: '../photo-gallery/sun.jpg', w: 3730, h: 2513 },
      { src: '../photo-gallery/bloodborne.jpg', w: 1968, h: 3851 },
      { src: '../photo-gallery/black_hole_sun.jpg', w: 3699, h: 2498 },
      { src: '../photo-gallery/bl00p.jpg', w: 4189, h: 2182 },
      { src: '../photo-gallery/metal-fire.jpg', w: 2865, h: 5639 },
      { src: '../photo-gallery/automata.jpg', w: 4195, h: 2090 },
      { src: '../photo-gallery/dirty-sunnado.jpg', w: 4066, h: 2042 },
      { src: '../photo-gallery/derp-m0lt.jpg', w: 2878, h: 5418 },
    ];
  }

  @action
  didResize({ clientWidth, clientHeight }) {
    this.width = clientWidth;
    this.height = clientHeight;
  }
}
