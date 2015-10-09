import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: 'ember-autocomplete-toggle',
  'data-dropdown': 'dropdown',
  'on-click': null,

  toggleDropdown: Ember.on('click', function() {
    this.attrs['on-click']();
  })

});
