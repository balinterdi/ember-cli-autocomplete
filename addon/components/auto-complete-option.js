import Ember from 'ember';
const { w } = Ember.String;

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'ember-autocomplete-option',
  classNameBindings: w('isActive:active isFocused:focused'),

  list: null,
  label: null,
  item: null,

  isFocused: false,

  autocomplete: Ember.computed.reads('list.autocomplete'),

  registerWithList: Ember.on('didInsertElement', function() {
    this.get('list').registerOption(this);
  }),

  unregisterWithList: Ember.on('willDestroyElement', function() {
    this.get('list').unregisterOption(this);
  }),

  selectOption: Ember.on('click', function() {
    const item = this.get('item');
    this.get('on-click')(item, this.get('label'));
  }),

  focus: function() {
    this.set('isFocused', true);
    this.get('list').openDropdown();
  },

  blur: function() {
    this.set('isFocused', false);
  },
});
