import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

let getRandomNumber = (from, to, decimals) => {
  let response = decimals ?
    Number((Math.random()*(Number(to)-Number(from))+Number(from)).toFixed(decimals)) :
    Number(Math.random()*(to-from)+from)
  return response;
}

let randomRgba = (opacity = getRandomNumber(0, 1, 4)) => {
  var r = getRandomNumber(0,255,0);
  var g = getRandomNumber(0,255,0);
  var b = getRandomNumber(0,255,0);
  return `RGBA(${r},${g},${b},${opacity})`;
}

let distance = (x1, y1, x2, y2) => {
  return Math.sqrt(
    Math.pow(x1 - x2, 2) +
    Math.pow(y1 - y2, 2)
  );
}

let fadeCanvas = (ctx, width, height, amount) => {
  let oldArray = ctx.getImageData(0, 0, width, height);
  // count through only the alpha pixels and lighten them
  for (let d = 3; d < oldArray.data.length; d += 4) {
    oldArray.data[d] = Math.floor(oldArray.data[d] * amount);
  }
  ctx.putImageData(oldArray, 0, 0);
}

class Circle {
  // https://github.com/DearthFunk/Animations/blob/master/animations/ring.service.js 
  label = 'Ø';
  ringClusterAngle = 0;
  ringDots = [];
  dotsPerCluster = 20;
  ringTotalClusters = 100;
  radius = 250;

  newRingDot () {
    return {
      r: getRandomNumber(2, 10),
      speed: getRandomNumber(0.02, 0.04, 2),
      orbit: getRandomNumber(0.1, 5, 1),
      angle: 0
    }
  }

  runLoop(ctx, state) {
    ctx.clearRect(0, 0, state.w, state.h);
    ctx.fillStyle = '#000000';
    this.ringClusterAngle += 0.001;

    for (let cluster = 0; cluster < this.ringTotalClusters; cluster++) {
      let clusterA = cluster / this.ringTotalClusters * 2 * Math.PI;
      let clusterX = (this.radius) * Math.cos(clusterA + (cluster%2==0?this.ringClusterAngle:-1*this.ringClusterAngle)) + state.wCenter;
      let clusterY =  (this.radius) * Math.sin(clusterA + (cluster%2==0?this.ringClusterAngle:-1*this.ringClusterAngle)) + state.hCenter;

      if (this.ringDots[cluster] == undefined) {
        this.ringDots.push([]);
      }
      for (let i = 0; i < this.dotsPerCluster; i++) {
        if (this.ringDots[cluster][i] === undefined) {
          this.ringDots[cluster].push(this.newRingDot());
        }

        let dot = this.ringDots[cluster][i];
        let amount = state.mouseDistanceFromCenter > this.radius ? 0.1 : (
          state.mouseDistanceFromCenter / this.radius * 0.001
        );
        dot.r -= amount;
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
  squaresTotal = 100;
  squaresLevels = 12;
  squaresHoverRadiusAdjust = 2;
  squares = [];
  squaresLevelColors = [];
  rotate = 0;
  point1 = {x:-1, y:-1};
  point2 = {x:-1, y:-1};
  point3 = {x:-1, y:-1};
  point4 = {x:-1, y:-1};
  @tracked controls = [
    { label: 'x1', value: true },
    { label: 'y1', value: false },
    { label: 'x2', value: true },
    { label: 'y2', value: false },
    { label: 'x3', value: true },
    { label: 'y3', value: false },
    { label: 'x4', value: true },
    { label: 'y4', value: false }
  ];

  constructor() {
    for (let i = 0; i < this.squaresLevels; i++) {
      let opacity = 1 - (i / this.squaresLevels);
      this.squaresLevelColors.push(randomRgba(opacity));
    }
    for (let i = 0; i < this.squaresTotal; i++) {
      this.squares.push({
        x: -1,
        y: -1,
        angle: 0
      });
    }
  }

  runLoop(ctx, state) {
    ctx.clearRect(0, 0, state.w, state.h);
    this.rotate += 0.1;

    for (let lvl = 1; lvl < this.squaresLevels + 1; lvl++ ) {
      ctx.strokeStyle = this.squaresLevelColors[lvl];
      let growth = Math.pow(lvl * 1.5, 2);
      for (let squareNum = 0; squareNum < this.squaresTotal; squareNum++) {
        let square = this.squares[squareNum];
        square.angle += Math.min(200, state.mouseDistanceFromCenter) / 200 * 0.001;
        let directionToggle = (lvl % 2 === 0 ? -1 : 1);
        let squareAngle = square.angle * directionToggle;

        this.point1.x = state.wCenter + Math.cos(squareNum + (squareAngle *(this.controls[0].value ? this.squaresHoverRadiusAdjust : 1) + (1/2*Math.PI) )) * growth;
        this.point1.y = state.hCenter + Math.sin(squareNum + (squareAngle *(this.controls[1].value ? this.squaresHoverRadiusAdjust : 1) + (1/2*Math.PI) )) * growth;
        this.point2.x = state.wCenter + Math.cos(squareNum + (squareAngle *(this.controls[2].value ? this.squaresHoverRadiusAdjust : 1) + (2/2*Math.PI) )) * growth;
        this.point2.y = state.hCenter + Math.sin(squareNum + (squareAngle *(this.controls[3].value ? this.squaresHoverRadiusAdjust : 1) + (2/2*Math.PI) )) * growth;
        this.point3.x = state.wCenter + Math.cos(squareNum + (squareAngle *(this.controls[4].value ? this.squaresHoverRadiusAdjust : 1) + (3/2*Math.PI) )) * growth;
        this.point3.y = state.hCenter + Math.sin(squareNum + (squareAngle *(this.controls[5].value ? this.squaresHoverRadiusAdjust : 1) + (3/2*Math.PI) )) * growth;
        this.point4.x = state.wCenter + Math.cos(squareNum + (squareAngle *(this.controls[6].value ? this.squaresHoverRadiusAdjust : 1) + (4/2*Math.PI) )) * growth;
        this.point4.y = state.hCenter + Math.sin(squareNum + (squareAngle *(this.controls[7].value ? this.squaresHoverRadiusAdjust : 1) + (4/2*Math.PI) )) * growth;
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
  galaxyTotalStars = 200;
  lineFlux = 90;
  orbitFlux = 200;
  hPadding = 400;
  wPadding = 260;
  twoPI = Math.PI * 2;

  constructor() {
    for (let i = 0; i < this.galaxyTotalStars; i++) {
			this.galaxyStars.push({
				x: Math.random(),
				y: Math.random(),
				xD: 0,
				yD: 0,
				angle: 0,
				speed: getRandomNumber(0.001, 0.009, 3),
				orbit: Math.random() * this.orbitFlux
			});
		}
  }

  runLoop(ctx, state) {
    fadeCanvas(ctx, state.w, state.h, 0.9);
    let w = state.w - (this.wPadding * 2);
    let h = state.h - (this.hPadding * 2);

    this.galaxyStars.forEach((star, index) => {
      star.angle += star.speed;
      star.xD = this.wPadding + (
        Math.floor(star.x * w + (
          Math.cos(index + star.angle) * star.orbit
        ))
      );
      star.yD = this.hPadding + (
        Math.floor(star.y * h + (
          Math.sin(index + star.angle) * star.orbit
        ))
      );
    });

    for (let a = 0; a < this.galaxyStars.length; a++) {
      let p1 = this.galaxyStars[a];
      for (let b = a; b < this.galaxyStars.length; b++) {
        let p2 = this.galaxyStars[b];
        let d = distance(p1.xD, p1.yD, p2.xD, p2.yD);

        if (d < this.lineFlux) {
          ctx.beginPath();
          let opacity = d / this.lineFlux;
          ctx.strokeStyle = `rgba(0,0,0,${opacity})`;
          ctx.lineWidth = 1 - opacity;
          ctx.moveTo(p1.xD, p1.yD);
          ctx.lineTo(p2.xD, p2.yD);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }
}

class Gogh {
  // https://github.com/DearthFunk/Animations/blob/master/animations/galaxy.service.js
  label = 'Æ';
  galaxyTotalStars = 350;
  galaxyStars = [];
  galaxyMagnifyingGlass = 150;
  globalCompositeOperation = 'multiply';

  constructor() {
    for (let i = 0; i < this.galaxyTotalStars; i++) {
			this.galaxyStars.push({
				x: 0,
				y: 0,
				size: getRandomNumber(0.01, 3, 2),
				angle: 0,
				speed: Math.random(),
				targetSize: 1,
				orbit: Math.random(),
        fillStyle: randomRgba()
			});
		}
  }

  runLoop(ctx, state) {
    fadeCanvas(ctx, state.w, state.h, 0.99);
    this.galaxyStars.forEach((spin, index) => {
      let orbit = 1 + (350 * spin.orbit);
      spin.angle += (spin.speed / 100);
      spin.x = state.wCenter + (Math.cos(index + spin.angle) * orbit);
      spin.y = state.hCenter + (Math.sin(index + spin.angle) * orbit);

      let d = distance(spin.x, spin.y, state.mouseX, state.mouseY);
      //todo: fix this r & radius jazz
      let r = !(d > this. galaxyMagnifyingGlass);
      let radius = r ? spin.size * (this. galaxyMagnifyingGlass-d) * 0.1 : spin.size;
      ctx.beginPath();
      ctx.fillStyle = spin.fillStyle;
      ctx.arc(spin.x, spin.y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    });
  }
}
export default class AnimationsService extends Service {
  ctx;
  canvas;
  mouseX;
  mouseY;
  animations = [
    new Circle(),
    new Square(),
    new Cylinder(),
    new Gogh()
  ];
  @tracked selectedAnimation;
  
  get controls() {
    return this.selectedAnimation?.controls;
  }

  get state() {
    let wCenter = this.canvas.width / 2;
    let hCenter = this.canvas.height / 2;
    return {
      w: this.canvas.width,
      h: this.canvas.height,
      mouseX: this.mouseX,
      mouseY: this.mouseY,
      wCenter,
      hCenter,
      mainRadius: hCenter,
      mouseDistanceFromCenter: distance(this.mouseX, this.mouseY, wCenter, hCenter)
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
      this.ctx.globalCompositeOperation = this.selectedAnimation.globalCompositeOperation ?? 'source-over';
      this.animLoop();
    }
  }

  @action
  animLoop() {
    if (this.selectedAnimation) {
      requestAnimationFrame( this.animLoop );
      this.selectedAnimation.runLoop(this.ctx, this.state);
    }
  }
}
