import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | animation-two', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:animation-two');
    assert.ok(service);
  });
});
