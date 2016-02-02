import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('component:auto-complete', 'Unit | Component | auto-complete', {
  unit: true
});

function getValue(obj) {
  return obj.get('value');
}

function getIndex(obj) {
  return obj.get('index');
}

test('#options', function(assert) {
  assert.expect(3);

  let component = this.subject();

  let artists = [
    Ember.Object.create({ id: 1, name: "Eddie Vedder" }),
    Ember.Object.create({ id: 2, name: "Dave Grohl" }),
    Ember.Object.create({ id: 3, name: "John Paul Jones" }),
    Ember.Object.create({ id: 4, name: "Jimmy Page" })
  ];

  Ember.run(function() {
    component.setProperties({
      items: artists,
      displayProperty: 'name'
    });
  });

  let options = component.get('options');
  assert.equal(options.length, 4, "It has the same number of items as the `items` input");
  assert.deepEqual(options.map(getValue), ['Eddie Vedder', 'Dave Grohl', 'John Paul Jones', 'Jimmy Page'],
                   "For each option, `value` is extracted from the displayProperty of the corresponding item");
  assert.deepEqual(options.map(getIndex), [0, 1, 2, 3], "A zero-based index is assigned to each option");
});
