import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AnimationsService extends Service {
  fps = 1/30;
  lastAnimationTime = 0;
  ctx;
  canvas;
  mouseX;
  mouseY;
  animations = [
    new AnimationCircle(),
    new AnimationSquare(),
    new AnimationCylinder(),
    new AnimationGogh()
  ];
  @tracked selectedAnimation;
  
  constructor(){
    Math.distance = function(x1, y1, x2, y2) {
      return Math.sqrt(
        Math.pow(x1 - x2, 2) +
        Math.pow(y1 - y2, 2)
      );
    }
    super(...arguments);
  }
  get controls() {
    return this.selectedAnimation?.controls;
  }

  get state() {
    let wCenter = this.canvas.width / 2;
    let hCenter = this.canvas.height / 2;
    return {
      w: this.canvas.width,
      h: this.canvas.height,
      wCenter,
      hCenter,
      mouseX: this.mouseX,
      mouseY: this.mouseY,
      mouseDistanceFromCenter: Math.distance(this.mouseX, this.mouseY, wCenter, hCenter)
    }
  }

  @action
  onCanvasInserted() {
    this.canvas = document.getElementById('animation-canvas');
    this.ctx = this.canvas.getContext('2d');
    document.onmousemove = this.mouseMoveEvent;
  }

  @action
  mouseMoveEvent(event) {
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;
  }

  @action
  selectAnimation(animation) {
    this.ctx.clearRect(0, 0, this.state.w, this.state.h);
    if (animation == this.selectedAnimation) {
      this.selectedAnimation = null;
    }
    else {
      this.selectedAnimation = animation;
      this.selectedAnimation.animationChangeEvent?.();
      this.ctx.globalCompositeOperation = this.selectedAnimation.globalCompositeOperation ?? 'source-over';
      this.animLoop();
    }
  }

  @action
  animLoop() {
    if (this.selectedAnimation) {
      let now = performance.now();
      let elapsedTime = (now - this.lastAnimationTime) / 1000;
      if (elapsedTime > this.fps) {
        this.selectedAnimation.updateLoop?.(this.state);
        this.selectedAnimation.runLoop?.(this.ctx, this.state);
        this.lastAnimationTime = performance.now();
      }
      requestAnimationFrame( this.animLoop );
    }
  }
}
