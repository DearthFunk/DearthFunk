
// https://github.com/DearthFunk/Animations/blob/master/animations/ring.service.js 
class AnimationCircle extends Animation {
  label = 'Ø';
  ringClusterAngle = 0;
  ringDots = [];
  dotsPerCluster = 10;
  ringTotalClusters = 30;
  radius = 250;

  newRingDot () {
    return {
      r: this.getRandomNumber(2, 10),
      speed: this.getRandomNumber(0.02, 0.04, 2),
      orbit: this.getRandomNumber(0.1, 5, 1),
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