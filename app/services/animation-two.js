import Service from '@ember/service';

export default class AnimationTwoService extends Service {
  name = 'two';

  //https://github.com/DearthFunk/Animations/blob/master/animations/squares.service.js 
  runLoop(ctx, state) {
    ctx.beginPath();
    let centerX = Math.random() * state.w;
    let centerY = Math.random() * state.h;
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI, false  );
    ctx.fillStyle = 'blue';
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
