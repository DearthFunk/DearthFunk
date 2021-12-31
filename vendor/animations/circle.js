
// https://github.com/DearthFunk/Animations/blob/master/animations/ring.service.js 
class AnimationCircle extends Animation {
  label = 'Ø';
  radius = 200;
  dots = [];
  galaxyTotalStars = 600;

  constructor() {
    super(...arguments);
    for (let i = 0; i < this.galaxyTotalStars; i++) {
			this.dots.push(this.newRingDot());
		}
  }

  newRingDot () {
    return {
      lengthAwayFromCenter: 0,
      radius: 10,
      radiusReduction: this.getRandomNumber(0.2,1,2), 
      speed: this.getRandomNumber(1, 5, 1),
      angle: Math.random()*Math.PI*2
    }
  }

  runLoop(ctx, state) {
    this.fadeCanvas(ctx, state.w, state.h, 0.8);

    this.dots.forEach((dot) => {
      dot.lengthAwayFromCenter += dot.speed;
      dot.radius -= dot.radiusReduction;
      let xPos = state.wCenter + Math.cos(dot.angle)*(this.radius + dot.lengthAwayFromCenter);
      let yPos = state.hCenter + Math.sin(dot.angle)*(this.radius + dot.lengthAwayFromCenter);
      let distance = Math.distance(xPos, yPos, state.mouseX, state.mouseY);
      let shouldApplyShrinkage = distance < (this.radius + 10);
      if (shouldApplyShrinkage) {
        dot.radius -= (dot.radiusReduction * 2);
      }
      if ( dot.lengthAwayFromCenter > 200 || dot.radius <= 0) {
        dot.lengthAwayFromCenter = 0;
        dot.radius = 10;
      }
      else {
        ctx.fillStyle = shouldApplyShrinkage ? '#FF0000' : '#000000';
        ctx.beginPath();
        ctx.arc(xPos, yPos, dot.radius, 0, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
      }
    })
  }
}