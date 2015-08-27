import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  'data-dropdown': 'dropdown',
  classNames: 'ember-autocomplete-toggle',

  autocomplete: null,

  toggleDropdown: Ember.on('click', function() {
    this.get('autocomplete').toggleDropdown();
  })

});
