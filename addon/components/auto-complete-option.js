import Ember from 'ember';
const { w } = Ember.String;

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'ember-autocomplete-option',
  classNameBindings: w('isActive:active isFocused:focused'),

  list: null,
  id: null,
  label: null,
  item: null,
  activeId: null,

  isFocused: false,

  isActive: Ember.computed('id', 'activeId', function() {
    return this.get('id') === this.get('activeId');
  }),

  autocomplete: Ember.computed.reads('list.autocomplete'),

  registerWithList: Ember.on('didInsertElement', function() {
    this.get('list').registerOption(this);
  }),

  unregisterWithList: Ember.on('willDestroyElement', function() {
    this.get('list').unregisterOption(this);
  }),

  toggleDropdown: Ember.on('click', function() {
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
