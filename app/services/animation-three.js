import Service from '@ember/service';

export default class AnimationThreeService extends Service {
  name = 'three';
//https://github.com/DearthFunk/Animations/blob/master/animations/lineConnections.service.js
  runLoop(ctx, state) {
    ctx.beginPath();
    let centerX = Math.random() * state.w;
    let centerY = Math.random() * state.h;
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI, false  );
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(state.x, state.y, 50, 0, 2 * Math.PI, false  );
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx .closePath();

  }
}
