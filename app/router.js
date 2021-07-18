import EmberRouter from '@ember/routing/router';
import config from 'dearthfunk/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('audio', { path: '/audio/:albumName'} );
  this.route('code', { path: '/code/:code'});
  this.route('info');
});
