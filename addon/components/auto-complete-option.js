import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'ember-autocomplete-option',
  classNameBindings: Ember.String.w('isSelected:active isFocused:focused'),

  item: null,
  'on-click': null,
  isFocused: false,
  isSelected: false,

  didClick: Ember.on('click', function() {
    const item = this.get('item');
    this.get('on-click')(item);
  })
});
