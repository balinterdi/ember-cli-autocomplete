import Ember from 'ember';

export default Ember.TextField.extend({
  valueDidChange: Ember.on('input', function() {
    const value = this.$().val();
    this.get('on-change')(value).then(({ start, end }) => {
      this.get('element').setSelectionRange(start, end);
    });
  })
});
