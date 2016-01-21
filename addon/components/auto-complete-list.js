import Ember from 'ember';
import layout from '../templates/components/auto-complete-list';

export default Ember.Component.extend({
  tagName:            'ul',
  attributeBindings:  ['style'],
  classNames:         'ember-autocomplete-list',
  layout:             layout,

  style: Ember.computed('isVisible', function() {
    return this.get('isVisible') ? "display:block" : "display:none";
  })
});
