import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'ember-autocomplete-option',
  classNameBindings: Ember.String.w('isSelected:active isFocused:focused'),

  label: null,
  item: null,
  'on-click': null,
  isFocused: false,
  isSelected: false,

  didClick: Ember.on('click', function() {
    this._selectItem();
  }),

  //FIXME: Very tricky bug. Select John Paul Jones by any means
  // and then start backspacing from the end. When only 'Jo' remains,
  // what happens is that now there are two choices, Josh Homme for 0
  // and John Paul Jones for 1. As now there are more optins, the
  // `auto-complete-options` are rerendered and the `isSelected` property
  // changes as JPJ is now at index 1. The observer is now fired and JPJ is
  // selected again, so I cannot backspace over his name.
  didBecomeSelected: Ember.observer('isSelected', function() {
    const isSelected = this.get('isSelected');
    if (isSelected) {
      this._selectItem();
    }
  }),

  _selectItem() {
    const item = this.get('item');
    this.get('on-click')(item, this.get('label'));
  }

});
