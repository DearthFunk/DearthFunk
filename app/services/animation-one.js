import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AnimationOneService extends Service {
  name = 'one';
  @tracked ringClusterAngle = 0;
  @tracked ringDots = [];
  ringTotalDots = 10;
  ringTotalClusters = 60;

  //https://github.com/DearthFunk/Animations/blob/master/animations/ring.service.js 

  getRandomNumber(from, to) {
    return Number(Math.random()*(to-from)+from)
  }

  newRingDot () {
    return {
      r: this.getRandomNumber(2, 10),
      speed: this.getRandomNumber(0, 0.04),
      orbit: this.getRandomNumber(0.1, 5),
      angle: 0
    }
  }

  runLoop(ctx, state) {
    ctx.fillStyle = '#000000';
    this.ringClusterAngle += 0.001;

    for (var cluster = 0; cluster < this.ringTotalClusters; cluster++) {
      var clusterA = cluster / this.ringTotalClusters * 2 * Math.PI;
      var clusterX = (state.mainRadius*2/3) * Math.cos(clusterA + (cluster%2==0?this.ringClusterAngle:-1*this.ringClusterAngle)) + state.wCenter;
      var clusterY =  (state.mainRadius*2/3) * Math.sin(clusterA + (cluster%2==0?this.ringClusterAngle:-1*this.ringClusterAngle)) + state.hCenter;

      if (this.ringDots[cluster] == undefined) {
        this.ringDots.push([]);
      }
      for (var i = 0; i < this.ringTotalDots; i++) {
        if (this.ringDots[cluster][i] === undefined) {
          this.ringDots[cluster].push(this.newRingDot());
        }

        var dot = this.ringDots[cluster][i];
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
