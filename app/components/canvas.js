import Component from '@glimmer/component';

let canvas;
let ctx;
export default class CanvasComponent extends Component {

  onDidInsert() {
    canvas = document.getElementById('animation-canvas');
    ctx = canvas.getContext('2d');
  }
}
