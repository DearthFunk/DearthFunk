import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class LoadAnimationComponent extends Component {

  @tracked animationRunning = true;
}
