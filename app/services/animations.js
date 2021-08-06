import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AnimationsService extends Service {

  @service animationOne;
  @service animationTwo;
  @service animationThree;
  @service animationFour;

  ctx;
  canvas;
  animations = [this.animationOne, this.animationTwo, this.animationThree, this.animationFour];
  @tracked selectedAnimation;
  @tracked mouseX;
  @tracked mouseY;
  
  get state() {
    let wCenter = this.canvas.width / 2;
    let hCenter = this.canvas.height / 2;
    return {
      w: this.canvas.width,
      h: this.canvas.height,
      x: this.mouseX,
      y: this.mouseY,
      wCenter,
      hCenter,
      mainRadius: hCenter,
      mouseDistanceFromCenter: Math.sqrt(
				Math.pow(this.mouseX - wCenter, 2) +
				Math.pow(this.mouseY - hCenter, 2)
			)
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
    if (animation == this.selectedAnimation) {
      this.selectedAnimation = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    else {
      this.selectedAnimation = animation;
      this.animLoop();
    }
  }

  @action
  animLoop() {
    if (this.selectedAnimation) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      requestAnimationFrame( this.animLoop );
      this.selectedAnimation.runLoop(this.ctx, this.state);
    }
  }
}
