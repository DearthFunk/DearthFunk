// https://github.com/DearthFunk/Animations/blob/master/animations/ring.service.js
import { Animation, AnimationState } from "./animation";

// Extend Math with distance function for TypeScript
declare global {
  interface Math {
    distance(x1: number, y1: number, x2: number, y2: number): number;
  }
}

interface RingDot {
  lengthAwayFromCenter: number;
  radius: number;
  radiusReduction: number;
  speed: number;
  angle: number;
}

export class AnimationCircle extends Animation {
  label: string = 'Ø';
  radius: number = 200;
  dots: RingDot[] = [];
  galaxyTotalStars: number = 600;

  constructor() {
    super();
    for (let i = 0; i < this.galaxyTotalStars; i++) {
      this.dots.push(this.newRingDot());
    }
  }

  newRingDot(): RingDot {
    return {
      lengthAwayFromCenter: 0,
      radius: 10,
      radiusReduction: this.getRandomNumber(0.2, 1, 2),
      speed: this.getRandomNumber(1, 5, 1),
      angle: Math.random() * Math.PI * 2
    };
  }

  runLoop(ctx: CanvasRenderingContext2D, state: AnimationState): void {
    this.fadeCanvas(ctx, state.w, state.h, 0.8);

    this.dots.forEach((dot) => {
      dot.lengthAwayFromCenter += dot.speed;
      dot.radius -= dot.radiusReduction;
      const xPos = state.wCenter + Math.cos(dot.angle) * (this.radius + dot.lengthAwayFromCenter);
      const yPos = state.hCenter + Math.sin(dot.angle) * (this.radius + dot.lengthAwayFromCenter);
      const distance = Math.distance(xPos, yPos, state.mouseX, state.mouseY);
      const shouldApplyShrinkage = distance < (this.radius + 10);
      if (shouldApplyShrinkage) {
        dot.radius -= (dot.radiusReduction * 2);
      }
      if (dot.lengthAwayFromCenter > 200 || dot.radius <= 0) {
        dot.lengthAwayFromCenter = 0;
        dot.radius = 10;
      } else {
        ctx.fillStyle = shouldApplyShrinkage ? '#FF0000' : '#000000';
        ctx.beginPath();
        ctx.arc(xPos, yPos, dot.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
      }
    });
  }
}
