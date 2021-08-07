import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

  // https://github.com/DearthFunk/Animations/blob/master/animations/galaxy.service.js
export default class AnimationFourService extends Service {

  label = 'Æ';
  galaxyTotalStars = 1500;
  @tracked galaxyStars = [];
  galaxyMagnifyingGlass = 120;

  initialize() {
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
