export interface AnimationState {
  w: number;
  h: number;
  wCenter: number;
  hCenter: number;
  mouseX: number;
  mouseY: number;
  mouseDistanceFromCenter: number;
}

export class Animation {
  label?: string;
  globalCompositeOperation?: GlobalCompositeOperation;
  controls?: any[];

  getRandomNumber(from: number, to: number, decimals?: number): number {
    const response = decimals === undefined ?
      Number(Math.random() * (to - from) + from) :
      Number((Math.random() * (Number(to) - Number(from)) + Number(from)).toFixed(decimals));
    return response;
  }

  randomRgba(opacity: number = this.getRandomNumber(0, 1, 2)): string {
    const r = this.getRandomNumber(0, 255, 0);
    const g = this.getRandomNumber(0, 255, 0);
    const b = this.getRandomNumber(0, 255, 0);
    return `RGBA(${r},${g},${b},${opacity})`;
  }

  randomRGBABetweenHexs(
    hex1: string = '#000000',
    hex2: string = '#FFFFFF',
    opacity: number = this.getRandomNumber(0, 1, 2)
  ): string {
    // Helper function to convert hex to RGB
    const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    // Convert hex colors to RGB
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);

    // Generate random values between the two colors
    const r = this.getRandomNumber(Math.min(rgb1.r, rgb2.r), Math.max(rgb1.r, rgb2.r), 0);
    const g = this.getRandomNumber(Math.min(rgb1.g, rgb2.g), Math.max(rgb1.g, rgb2.g), 0);
    const b = this.getRandomNumber(Math.min(rgb1.b, rgb2.b), Math.max(rgb1.b, rgb2.b), 0);

    return `RGBA(${r},${g},${b},${opacity})`;
  }

  fadeCanvas(ctx: CanvasRenderingContext2D, width: number, height: number, amount: number): void {
    const oldArray = ctx.getImageData(0, 0, width, height);
    // count through only the alpha pixels and lighten them
    for (let d = 3; d < oldArray.data.length; d += 4) {
      oldArray.data[d] = Math.floor(oldArray.data[d] * amount);
    }
    ctx.putImageData(oldArray, 0, 0);
  }

  // Optional methods that can be implemented by subclasses
  updateLoop?(state: AnimationState): void;
  runLoop?(ctx: CanvasRenderingContext2D, state: AnimationState): void;
  animationChangeEvent?(): void;
}
