import Service from '@ember/service';

export default class AnimationFourService extends Service {

  name = 'four';

  runLoop(ctx, state) {
    ctx.beginPath();
    let centerX = Math.random() * state.w;
    let centerY = Math.random() * state.h;
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI, false  );
    ctx.fillStyle = 'yellow';
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
