import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const getRandomNumber = (from, to) => {
  return Number(Math.random()*(to-from)+from)
}
class Circle {
  // https://github.com/DearthFunk/Animations/blob/master/animations/ring.service.js 
  label = 'Ø';
  ringClusterAngle = 0;
  ringDots = [];
  ringTotalDots = 10;
  ringTotalClusters = 60;

  newRingDot () {
    return {
      r: getRandomNumber(2, 10),
      speed: getRandomNumber(0, 0.04),
      orbit: getRandomNumber(0.1, 5),
      angle: 0
    }
  }

  runLoop(ctx, state) {
    ctx.fillStyle = '#000000';
    this.ringClusterAngle += 0.001;

    for (let cluster = 0; cluster < this.ringTotalClusters; cluster++) {
      let clusterA = cluster / this.ringTotalClusters * 2 * Math.PI;
      let clusterX = (state.mainRadius*2/3) * Math.cos(clusterA + (cluster%2==0?this.ringClusterAngle:-1*this.ringClusterAngle)) + state.wCenter;
      let clusterY =  (state.mainRadius*2/3) * Math.sin(clusterA + (cluster%2==0?this.ringClusterAngle:-1*this.ringClusterAngle)) + state.hCenter;

      if (this.ringDots[cluster] == undefined) {
        this.ringDots.push([]);
      }
      for (let i = 0; i < this.ringTotalDots; i++) {
        if (this.ringDots[cluster][i] === undefined) {
          this.ringDots[cluster].push(this.newRingDot());
        }

        let dot = this.ringDots[cluster][i];
        dot.r -= 10 / (state.mouseDistanceFromCenter < 10 ? 10 : state.mouseDistanceFromCenter) ;
        dot.angle += dot.speed;

        if (dot.r < 0) {
          this.ringDots[cluster][i] = this.newRingDot();
        }
        else {
          ctx.beginPath();
          ctx.arc(
            clusterX + Math.cos(i + dot.angle) * dot.orbit * dot.angle * 4.5,
            clusterY + Math.sin(i + dot.angle) * dot.orbit * dot.angle * 4.5,
            dot.r,
            0, Math.PI*2, true
          );
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}

class Square {
  //https://github.com/DearthFunk/Animations/blob/master/animations/squares.service.js 
  label = 'µ';
  squaresTotal = 10;
  squaresLevels = 12;
  squaresHoverRadiusAdjust = 2;
  squares = [];
  rotate = 0;
  point1 = {x:-1, y:-1};
  point2 = {x:-1, y:-1};
  point3 = {x:-1, y:-1};
  point4 = {x:-1, y:-1};
  @tracked rotations = [true, false, true, false, true, false, true, false];
  squaresLevelColors = [ //gotta mach length of squaresLevels
    '#FFFFFF','#E7E7E7','#D0D0D0','#B9B9B9','#A2A2A2','#8B8B8B','#737373','#5C5C5C','#454545','#2E2E2E','#171717','#000000'
  ];

  constructor() {
    for (let i = 0; i < this.squaresTotal; i++) {
      this.squares.push({
        x: -1,
        y: -1,
        angle: 0
      });
    }
  }

  @action
  toggleRotation(index) {
    this.rotations[index] = !this.rotations[index];
  }

  runLoop(ctx, state) {
    this.rotate += 0.1;

    for (let lvl = 1; lvl < this.squaresLevels + 1; lvl++ ) {
      ctx.strokeStyle = this.squaresLevelColors[lvl];
      let growth = Math.pow(lvl * 1.5, 2);
      for (let squareNum = 0; squareNum < this.squaresTotal; squareNum++) {
        let square = this.squares[squareNum];
        square.angle += state.mouseDistanceFromCenter / 500000;
        let squareAngle = square.angle * (lvl % 2 == 0 ? -1 : 1);

        this.point1.x = state.wCenter + Math.cos(squareNum + (squareAngle *(this.rotations[0] ? this.squaresHoverRadiusAdjust : 1) + (1/2*Math.PI) )) * growth;
        this.point1.y = state.hCenter + Math.sin(squareNum + (squareAngle *(this.rotations[1] ? this.squaresHoverRadiusAdjust : 1) + (1/2*Math.PI) )) * growth;
        this.point2.x = state.wCenter + Math.cos(squareNum + (squareAngle *(this.rotations[2] ? this.squaresHoverRadiusAdjust : 1) + (2/2*Math.PI) )) * growth;
        this.point2.y = state.hCenter + Math.sin(squareNum + (squareAngle *(this.rotations[3] ? this.squaresHoverRadiusAdjust : 1) + (2/2*Math.PI) )) * growth;
        this.point3.x = state.wCenter + Math.cos(squareNum + (squareAngle *(this.rotations[4] ? this.squaresHoverRadiusAdjust : 1) + (3/2*Math.PI) )) * growth;
        this.point3.y = state.hCenter + Math.sin(squareNum + (squareAngle *(this.rotations[5] ? this.squaresHoverRadiusAdjust : 1) + (3/2*Math.PI) )) * growth;
        this.point4.x = state.wCenter + Math.cos(squareNum + (squareAngle *(this.rotations[6] ? this.squaresHoverRadiusAdjust : 1) + (4/2*Math.PI) )) * growth;
        this.point4.y = state.hCenter + Math.sin(squareNum + (squareAngle *(this.rotations[7] ? this.squaresHoverRadiusAdjust : 1) + (4/2*Math.PI) )) * growth;
        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.lineTo(this.point3.x, this.point3.y);
        ctx.lineTo(this.point4.x, this.point4.y);
        ctx.lineTo(this.point1.x, this.point1.y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

}

class Cylinder {
  //https://github.com/DearthFunk/Animations/blob/master/animations/lineConnections.service.js
  label = 'ƒ';
  galaxyStars = [];
  galaxyTotalStars = 600;
  lineFlux = 50;
  orbitFlux = 100;
  speed = 0.01;
  hPadding = 360;
  wPadding = 160;
  twoPI = Math.PI * 2;

  constructor() {
    for (let i = 0; i < this.galaxyTotalStars; i++) {
			this.galaxyStars.push({
				x: Math.random(),
				y: Math.random(),
				xD: 0,
				yD: 0,
				size: Math.random() + 0.01,
				angle: 0,
				speed: Math.random() * this.speed + 0.01,
				orbit: Math.random() * this.orbitFlux
			});
		}
  }

  runLoop(ctx, state) {
    ctx.fillStyle = '#FFFFFF';
    let w = state.w - (this.wPadding * 2);
    let h = state.h - (this.hPadding * 2);
    for (let i = 0; i < this.galaxyStars.length; i++) {
      let star = this.galaxyStars[i];

      star.angle += star.speed;
      star.xD = this.wPadding + Math.floor(star.x * w + ( Math.cos(i + star.angle) * star.orbit));
      star.yD = this.hPadding + Math.floor(star.y * h + ( Math.sin(i + star.angle) * star.orbit));

      ctx.beginPath();
      ctx.arc(star.xD, star.yD, star.size, 0, this.twoPI, true);
      ctx.fill();
      ctx.closePath();
    }

    for (let a = 0; a < this.galaxyStars.length; a++) {
      let p1 = this.galaxyStars[a];
      for (let b = a; b < this.galaxyStars.length; b++) {
        let p2 = this.galaxyStars[b];
        let d = Math.sqrt( Math.pow(p1.xD - p2.xD, 2) + Math.pow(p1.yD - p2.yD, 2) );
        if (d < this.lineFlux) {

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0,0,0,' + d / this.lineFlux + ')';
          ctx.lineWidth = 1 - (d / this.lineFlux);

          ctx.moveTo(p1.xD, p1.yD);
          ctx.lineTo(p2.xD, p2.yD);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }
}

class Space {
  // https://github.com/DearthFunk/Animations/blob/master/animations/galaxy.service.js
  label = 'Æ';
  galaxyTotalStars = 1500;
  galaxyStars = [];
  galaxyMagnifyingGlass = 300;

  constructor() {
    for (let i = 0; i < this.galaxyTotalStars; i++) {
			this.galaxyStars.push({
				x: 0,
				y: 0,
				size: Math.random(), //genColors.get.randomNumber(0.01,1),
				angle: 0,
				speed: Math.random(),
				targetSize: 1,
				orbit: Math.random()
			});
		}
  }

  runLoop(ctx, state) {
    let magnifySize = this. galaxyMagnifyingGlass; // + (galaxyBursts.length*6);
    for (let i = 0; i < this.galaxyStars.length; i++) {
      let spin = this.galaxyStars[i];
      let orbit = 1 + (600 * spin.orbit);
      spin.angle += (spin.speed / 100); // * (state.mouseHovering ? -1 : 1);
      spin.x = state.wCenter + Math.cos(i + spin.angle) * orbit;
      spin.y = state.hCenter + Math.sin(i + spin.angle) * orbit;

      let d = Math.sqrt( Math.pow(spin.x - state.x, 2) + Math.pow(spin.y - state.y, 2) );
      let r = !(d > magnifySize);
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (1-spin.orbit+0.5) + ')';
      ctx.arc(spin.x, spin.y, r ? spin.size * (magnifySize-d) * 0.1 : spin.size, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();
    }
  }
}
export default class AnimationsService extends Service {
  ctx;
  canvas;
  animations = [
    new Circle(),
    new Square(),
    new Cylinder(),
    new Space()
  ];

  @tracked selectedAnimation;
  mouseX;
  mouseY;
  
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
    //initialize each service, sets up some basic data objects for manipulating
    this.animations.forEach(animation => animation.initialize?.());
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
