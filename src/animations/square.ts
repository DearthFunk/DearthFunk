// https://github.com/DearthFunk/Animations/blob/master/animations/squares.service.js
import { Animation, AnimationState } from "./animation";

interface Point {
  x: number;
  y: number;
}

interface Square {
  x: number;
  y: number;
  angle: number;
}

interface Control {
  label: string;
  value: boolean;
}

export class AnimationSquare extends Animation {
  label: string = 'µ';
  private _squaresTotal: number = 40;
  squareLevelColors: string[] = [];
  globalCompositeOperation: GlobalCompositeOperation = 'lighten';
  squares: Square[] = [];
  rotate: number = 0;
  point1: Point = { x: -1, y: -1 };
  point2: Point = { x: -1, y: -1 };
  point3: Point = { x: -1, y: -1 };
  point4: Point = { x: -1, y: -1 };
  controls: Control[] = [
    { label: 'X-1', value: false },
    { label: 'Y-1', value: true },
    { label: 'X-2', value: true },
    { label: 'Y-2', value: false },
    { label: 'X-3', value: true },
    { label: 'Y-3', value: false },
    { label: 'X-4', value: true },
    { label: 'Y-4', value: false }
  ];

  constructor() {
    super();
    for (let i = 0; i < this._squaresTotal; i++) {
      this.squares.push({
        x: -1,
        y: -1,
        angle: 0
      });
    }
    this.squareLevelColors = new Array(12).fill(0);
    this.updateColors();
  }

  animationChangeEvent(): void {
    this.updateColors();
  }

  updateColors(): void {
    this.squareLevelColors.forEach((oldColor, index) => {
      const opacity = parseFloat((1 - (index / this.squareLevelColors.length)).toFixed(2));
      this.squareLevelColors[index] = this.randomRGBABetweenHexs('#000000', '#FF0000', opacity);
    });
  }

  runLoop(ctx: CanvasRenderingContext2D, state: AnimationState): void {
    this.fadeCanvas(ctx, state.w, state.h, 0.8);

    // ctx.clearRect(0, 0, state.w, state.h);
    this.rotate += 0.1;

    this.squareLevelColors.forEach((color, lvl) => {
      const growth = Math.pow(lvl * 1.5, 2);
      ctx.strokeStyle = color;
      this.squares.forEach((square, squareNum) => {
        square.angle += Math.min(200, state.mouseDistanceFromCenter) / 200 * 0.001;
        const directionToggle = (lvl % 2 === 0 ? -1 : 1);
        const squareAngle = square.angle * directionToggle;

        this.point1.x = state.wCenter + Math.cos(squareNum + (squareAngle * (this.controls[0].value ? 2 : 1) + (1 / 2 * Math.PI))) * growth;
        this.point1.y = state.hCenter + Math.sin(squareNum + (squareAngle * (this.controls[1].value ? 2 : 1) + (1 / 2 * Math.PI))) * growth;
        this.point2.x = state.wCenter + Math.cos(squareNum + (squareAngle * (this.controls[2].value ? 2 : 1) + (2 / 2 * Math.PI))) * growth;
        this.point2.y = state.hCenter + Math.sin(squareNum + (squareAngle * (this.controls[3].value ? 2 : 1) + (2 / 2 * Math.PI))) * growth;
        this.point3.x = state.wCenter + Math.cos(squareNum + (squareAngle * (this.controls[4].value ? 2 : 1) + (3 / 2 * Math.PI))) * growth;
        this.point3.y = state.hCenter + Math.sin(squareNum + (squareAngle * (this.controls[5].value ? 2 : 1) + (3 / 2 * Math.PI))) * growth;
        this.point4.x = state.wCenter + Math.cos(squareNum + (squareAngle * (this.controls[6].value ? 2 : 1) + (4 / 2 * Math.PI))) * growth;
        this.point4.y = state.hCenter + Math.sin(squareNum + (squareAngle * (this.controls[7].value ? 2 : 1) + (4 / 2 * Math.PI))) * growth;
        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.lineTo(this.point3.x, this.point3.y);
        ctx.lineTo(this.point4.x, this.point4.y);
        ctx.lineTo(this.point1.x, this.point1.y);
        ctx.stroke();
        ctx.closePath();
      });
    });
  }
}
