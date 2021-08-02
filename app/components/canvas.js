import Component from '@glimmer/component';

export default class CanvasComponent extends Component {

  @action
  onDidInsert() {
    canvas = document.getElementById('animation-canvas');
    ctx = canvas.getContext('2d');
  }
}
