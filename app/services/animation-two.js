import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { set, action } from '@ember/object';

  //https://github.com/DearthFunk/Animations/blob/master/animations/squares.service.js 
export default class AnimationTwoService extends Service {
  label = 'µ';
  squaresTotal = 10;
  squaresLevels = 12;
  squaresHoverRadiusAdjust = 2;
  @tracked squares = [];
  @tracked rotate = 0;
  @tracked point1 = {x:-1, y:-1};
  @tracked point2 = {x:-1, y:-1};
  @tracked point3 = {x:-1, y:-1};
  @tracked point4 = {x:-1, y:-1};
  @tracked rotations = [true, false, true, false, true, false, true, false];
  squaresLevelColors = [ //gotta mach length of squaresLevels
    '#FFFFFF','#E7E7E7','#D0D0D0','#B9B9B9','#A2A2A2','#8B8B8B','#737373','#5C5C5C','#454545','#2E2E2E','#171717','#000000'
  ];

  initialize() {
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
