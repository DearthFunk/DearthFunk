import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class InfoComponent extends Component {
  @action
  togglePhotoGallery(event) {
    event.preventDefault();
    this.args.togglePhotoGallery();
  }
}
