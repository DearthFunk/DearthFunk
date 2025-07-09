import { AnimationCircle } from '../animations/circle';
import { AnimationCylinder } from '../animations/cylinder';
import { AnimationSquare } from '../animations/square';
import { AnimationGogh } from '../animations/gogh';
import { Animation, AnimationState } from '../animations/animation';

// Extend Math with distance function for TypeScript
declare global {
  interface Math {
    distance(x1: number, y1: number, x2: number, y2: number): number;
  }
}

export default class AnimationsService {
  private static instance: AnimationsService | null = null;
  
  fps = 1 / 30;
  lastAnimationTime = 0;
  ctx!: CanvasRenderingContext2D;
  canvas!: HTMLCanvasElement;
  mouseX = 0;
  mouseY = 0;
  animations: Animation[] = [
    new AnimationCylinder(),
    new AnimationCircle(),
    new AnimationSquare(),
    new AnimationGogh(),
  ];
  selectedAnimation: Animation = this.getInitialAnimation();

  private constructor() {
    Math.distance = function (x1: number, y1: number, x2: number, y2: number): number {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
  }

  public static getInstance(): AnimationsService {
    if (!AnimationsService.instance) {
      AnimationsService.instance = new AnimationsService();
    }
    return AnimationsService.instance;
  }

  get controls() {
    return this.selectedAnimation?.controls;
  }

  get state(): AnimationState {
    const wCenter = this.canvas.width / 2;
    const hCenter = this.canvas.height / 2;
    return {
      w: this.canvas.width,
      h: this.canvas.height,
      wCenter,
      hCenter,
      mouseX: this.mouseX,
      mouseY: this.mouseY,
      mouseDistanceFromCenter: Math.distance(
        this.mouseX,
        this.mouseY,
        wCenter,
        hCenter
      ),
    };
  }

  onCanvasInserted() {
    this.canvas = document.getElementById('animation-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    document.onmousemove = this.mouseMoveEvent.bind(this);
  }

  mouseMoveEvent(event: MouseEvent) {
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;
  }

  selectAnimation(animation: Animation) {
    this.ctx.clearRect(0, 0, this.state.w, this.state.h);
    this.selectedAnimation = animation;
    // Save to localStorage
    localStorage.setItem('selectedAnimationLabel', animation.label || '');
    this.selectedAnimation.animationChangeEvent?.();
    this.ctx.globalCompositeOperation =
    this.selectedAnimation.globalCompositeOperation ?? 'source-over';
    this.animLoop();
  }

  animLoop() {
    if (this.selectedAnimation) {
      let now = performance.now();
      let elapsedTime = (now - this.lastAnimationTime) / 1000;
      if (elapsedTime > this.fps) {
        this.selectedAnimation.updateLoop?.(this.state);
        this.selectedAnimation.runLoop?.(this.ctx, this.state);
        this.lastAnimationTime = performance.now();
      }
      requestAnimationFrame(this.animLoop.bind(this));
    }
  }

  toggleControl(index: number): void {
    if (this.selectedAnimation.controls && this.selectedAnimation.controls[index]) {
      this.selectedAnimation.controls[index].value = !this.selectedAnimation.controls[index].value;
    }
  }

  private getInitialAnimation(): Animation {
    const storedLabel = localStorage.getItem('selectedAnimationLabel');
    if (storedLabel) {
      const foundAnimation = this.animations.find(anim => anim.label === storedLabel);
      if (foundAnimation) {
        return foundAnimation;
      }
    }
    return this.animations[0];
  }
}
