// https://github.com/DearthFunk/Animations/blob/master/animations/galaxy.service.js
class AnimationGogh extends Animation {
  label = 'Æ';
  galaxyStars = [...Array(150).keys()];;
  galaxyMagnifyingGlass = 150;
  globalCompositeOperation = 'multiply';

  constructor() {
    super(...arguments);
    this.galaxyStars.forEach((oldStar, index) => {
      this.galaxyStars[index] = {
        x: 0,
        y: 0,
        size: this.getRandomNumber(0.01, 3, 2),
        angle: 0,
        speed: Math.random() * 2,
        targetSize: 1,
        orbit: Math.random(),
        fillStyle: this.randomRgba(),
      }
    });
  }

  updateLoop(state) {
    this.galaxyStars.forEach((spin, index) => {
      let orbit = 1 + (250 * spin.orbit);
      spin.angle += (spin.speed / 100);
      spin.x = state.wCenter + (Math.cos(index + spin.angle) * orbit);
      spin.y = state.hCenter + (Math.sin(index + spin.angle) * orbit);
      spin.d = Math.distance(spin.x, spin.y, state.mouseX, state.mouseY); 
      spin.r = Math.max(1, !(spin.d > this.galaxyMagnifyingGlass) ? spin.size * (this.galaxyMagnifyingGlass - spin.d) * 0.1 : spin.size);
    });
  }

  runLoop(ctx, state) {
    this.fadeCanvas(ctx, state.w, state.h, 0.9);
    this.galaxyStars.forEach((spin) => {
      ctx.beginPath();
      ctx.fillStyle = spin.fillStyle;
      ctx.arc(spin.x, spin.y, spin.r, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    });
  }
}