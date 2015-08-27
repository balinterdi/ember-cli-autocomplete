import Ember from 'ember';

export default Ember.TextField.extend({
  autocomplete_: null,

  registerWithAutocomplete: Ember.on('didInsertElement', function() {
    this.get('autocomplete_').registerInput(this);
  }),

  valueDidChange: Ember.on('input', function() {
    const value = this.$().val();
    this.get('on-change')(value);
  })
});
