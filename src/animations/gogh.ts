// https://github.com/DearthFunk/Animations/blob/master/animations/galaxy.service.js
import { Animation, AnimationState } from "./animation";

interface GalaxyStar {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  targetSize: number;
  orbit: number;
  fillStyle: string;
  d: number;
  r: number;
}

export class AnimationGogh extends Animation {
  label: string = 'Æ';
  galaxyStars: GalaxyStar[] = [];
  galaxyMagnifyingGlass: number = 150;
  globalCompositeOperation: GlobalCompositeOperation = 'multiply';

  constructor() {
    super();
    const starCount = 500;
    for (let index = 0; index < starCount; index++) {
      this.galaxyStars.push({
        x: 0,
        y: 0,
        size: this.getRandomNumber(0.01, 3, 2),
        angle: 0,
        speed: Math.random() * 2,
        targetSize: 1,
        orbit: Math.random(),
        fillStyle: this.randomRgba(),
        d: 0,
        r: 0
      });
    }
  }

  updateLoop(state: AnimationState): void {
    this.galaxyStars.forEach((spin, index) => {
      const orbit = 1 + (200 * spin.orbit) + (state.mouseDistanceFromCenter / 3);
      spin.angle += (spin.speed / 100);
      spin.x = state.wCenter + (Math.cos(index + spin.angle) * orbit);
      spin.y = state.hCenter + (Math.sin(index + spin.angle) * orbit);
      spin.d = Math.distance(spin.x, spin.y, state.mouseX, state.mouseY);
      spin.r = Math.max(1, !(spin.d > this.galaxyMagnifyingGlass) ? spin.size * (this.galaxyMagnifyingGlass - spin.d) * 0.1 : spin.size);
    });
  }

  runLoop(ctx: CanvasRenderingContext2D, state: AnimationState): void {
    this.fadeCanvas(ctx, state.w, state.h, 0.95);
    this.galaxyStars.forEach((spin) => {
      ctx.beginPath();
      ctx.fillStyle = spin.fillStyle;
      ctx.arc(spin.x, spin.y, spin.r, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    });
  }
}
