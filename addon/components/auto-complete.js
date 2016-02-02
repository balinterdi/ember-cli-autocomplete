import Ember from 'ember';
import layout from '../templates/components/auto-complete';

export default Ember.Component.extend({
  "on-select": null,
  "on-input": null,

  layout: layout,

  isDropdownOpen:   false,
  input:            null,
  inputValue:       '',
  focusedIndex:     null,
  selectedIndex:    null,
  options:          [],
  displayProperty:  '',

  optionsLength: Ember.computed.readOnly('options.length'),

  isBackspacing: false,

  toggleDropdown() {
    this.toggleProperty('isDropdownOpen');
  },

  openDropdown() {
    this.set('isDropdownOpen', true);
  },

  closeDropdown: function() {
    this.set('isDropdownOpen', false);
    this.removeFocusedOption();
  },

  keydownMap: {
    8:  'startBackspacing', // backspace
    13: 'selectOption',  // return
    27: 'closeDropdown', // escape
    38: 'focusPrevious', // up key
    40: 'focusNext', // down key
  },

  startBackspacing: function() {
    this.set('isBackspacing', true);
  },

  focusPrevious: function(event) {
    event.preventDefault();
    const currentIndex = this.get('focusedIndex');
    let newIndex;
    if (Ember.isNone(currentIndex)) {
      newIndex = this.get('optionsLength') - 1;
    } else if (currentIndex === 0) {
      newIndex = this.get('optionsLength') - 1;
    } else {
      newIndex = currentIndex - 1;
    }
    this.set('focusedIndex', newIndex);
    this.set('isDropdownOpen', true);
  },

  focusNext: function(event) {
    event.preventDefault();
    const currentIndex = this.get('focusedIndex');
    const lastIndex = this.get('optionsLength') - 1;
    let newIndex;
    if (Ember.isNone(currentIndex)) {
      newIndex = 0;
    } else if (currentIndex === lastIndex) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
    this.set('focusedIndex', newIndex);
    this.set('isDropdownOpen', true);
  },

  selectOption: function(event) {
    event.preventDefault();
    const focusedIndex = this.get('focusedIndex');
    if (Ember.isPresent(focusedIndex)) {
      this.set('selectedIndex', focusedIndex);
      this.send('selectOption', this.get('selectedOption'));
    }
    this.set('isDropdownOpen', false);
  },

  selectedOption: Ember.computed('selectedIndex', 'options.[]', function() {
    return this.get('options').objectAt(this.get('selectedIndex'));
  }),

  handleKeydown: Ember.on('keyDown', function(event) {
    const map = this.get('keydownMap');
    const code = event.keyCode;
    const method = map[code];
    if (method) {
      return this[method](event);
    }
  }),

  _displayForOption(option) {
    const displayProperty = this.get('displayProperty');
    return option.get(displayProperty);
  },

  actions: {
    selectOption(option) {
      this.get('on-select')(option);
      this.set('isDropdownOpen', false);
      this.set('inputValue', this._displayForOption(option));
    },

    inputDidChange(value) {
      this.get('on-input')(value);
      this.set('focusedIndex', null);
      this.set('isDropdownOpen', true);
      return new Ember.RSVP.Promise((resolve, reject) => {
        if (this.get('isBackspacing')) {
          this.set('isBackspacing', false);
          reject();
        } else {
          Ember.run.scheduleOnce('afterRender', this, function() {
            const firstOption = this.get('options.firstObject');
            if (firstOption) {
              const inputValue = this._displayForOption(firstOption);
              this.get('on-select')(firstOption);
              this.set('inputValue', inputValue);
              Ember.run.next(this, () => {
                resolve({ start: value.length, end: inputValue.length });
              });
            }
          });
        }
      });
    },

    toggleDropdown() {
      this.toggleDropdown();
    }
  }
});
