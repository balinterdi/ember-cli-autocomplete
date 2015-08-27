import Ember from 'ember';
import layout from '../templates/components/auto-complete-list';

export default Ember.Component.extend({
  tagName: 'ul',
  attributeBindings: ['style'],
  classNames: 'ember-autocomplete-list',

  layout: layout,

  autocomplete: null,
  options: Ember.A(),

  firstOption: Ember.computed.reads('options.firstObject'),

  registerOption(option) {
    this.get('options').pushObject(option);
  },

  unregisterOption(option) {
    this.get('options').removeObject(option);
  },

  registerWithAutocomplete: Ember.on('didInsertElement', function() {
    this.get('autocomplete').registerList(this);
  }),

  style: Ember.computed('isVisible', function() {
    return this.get('isVisible') ? "display:block" : "display:none";
  }),

  openDropdown() {
    this.get('autocomplete').openDropdown();
  },
});
