import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CanvasComponent extends Component {

  @tracked ctx;
  constructor() {
    super(...arguments);
    this.ctx = null;
  }
}
