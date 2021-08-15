class AnimationCylinder extends Animation {
  //https://github.com/DearthFunk/Animations/blob/master/animations/lineConnections.service.js
  label = 'ƒ';
  galaxyStars = [];
  galaxyTotalStars = 150;
  lineFlux = 75;
  orbitFlux = 150;
  sidePadding = 200;
  twoPI = Math.PI * 2;

  constructor() {
    super(...arguments);
    for (let i = 0; i < this.galaxyTotalStars; i++) {
			this.galaxyStars.push({
				x: Math.random(),
				y: Math.random(),
				xD: 0,
				yD: 0,
				angle: 0,
				speed: this.getRandomNumber(0.001, 0.05, 3),
				orbit: Math.random() * this.orbitFlux
			});
		}
  }

  updateLoop(state) {
    let cylinderWidth = state.w - (this.sidePadding * 2);
    let cylinderHeight = 150; //remember: this is in addition to flux
    this.galaxyStars.forEach((star, index) => {
      star.angle += star.speed;
      star.xD = this.sidePadding + (
        Math.floor(star.x * cylinderWidth + (
          Math.cos(index + star.angle) * star.orbit
        ))
      );
      star.yD = (state.hCenter - (cylinderHeight / 2)) + (
        Math.floor(star.y * cylinderHeight + (
          Math.sin(index + star.angle) * star.orbit
        ))
      );
    });
  }

  runLoop(ctx, state) {
    this.fadeCanvas(ctx, state.w, state.h, 0.9);
    //ctx.clearRect(0, 0, state.w, state.h);
    for (let a = 0; a < this.galaxyStars.length; a++) {
      let p1 = this.galaxyStars[a];
      for (let b = a + 1; b < this.galaxyStars.length; b++) {
        let p2 = this.galaxyStars[b];
        let d = distance(p1.xD, p1.yD, p2.xD, p2.yD);

        if (d < this.lineFlux) {
          ctx.beginPath();
          let opacity = 1 - parseFloat((d / this.lineFlux).toFixed(2));
          ctx.strokeStyle = `rgba(0,0,0,${opacity})`;
          ctx.lineWidth = 2;
          ctx.moveTo(p1.xD, p1.yD);
          ctx.lineTo(p2.xD, p2.yD);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }
}