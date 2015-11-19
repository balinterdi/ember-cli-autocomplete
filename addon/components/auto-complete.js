import Ember from 'ember';
import layout from '../templates/components/auto-complete';

export default Ember.Component.extend({
  "on-select": null,
  "on-input": null,

  layout: layout,

  isDropdownOpen: false,
  input: null,
  inputValue: '',
  list: null,

  isBackspacing: false,
  options: Ember.computed.reads('list.options'),

  registerInput(input) {
    this.set('input', input);
  },

  registerList(list) {
    this.set('list', list);
  },

  toggleDropdown() {
    this.toggleProperty('isDropdownOpen');
    if (!this.get('isDropdownOpen')) {
      this.removeFocusedOption();
    }
  },

  openDropdown() {
    this.set('isDropdownOpen', true);
  },

  closeDropdown: function() {
    this.set('isDropdownOpen', false);
    this.removeFocusedOption();
  },

  removeFocusedOption() {
    const focused = this.get('focusedOption');
    if (focused) {
      focused.blur();
      this.set('focusedOption', null);
    }
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
    const focused = this.get('focusedOption');
    let index = this.get('options').indexOf(focused);
    if (this.get('isDropdownOpen')) {
      index = index - 1;
    }
    this.focusOptionAtIndex(index);
  },

  focusNext: function(event) {
    //TODO: Refactor with focusPrevious
    event.preventDefault();
    let index = 0;
    const focused = this.get('focusedOption');
    if (focused) {
      index = this.get('options').indexOf(focused);
      if (this.get('isDropdownOpen')) {
        index = index + 1;
      }
    }
    this.focusOptionAtIndex(index);
  },

  focusOptionAtIndex: function(index) {
    const options = this.get('options');
    if (index === -1) {
      index = options.get('length') - 1;
    } else if (index === options.get('length')) {
      index = 0;
    }
    const option = this.get('options').objectAt(index);
    if (!option) {
      return;
    }
    this.focusOption(option);
  },

  focusOption: function(option) {
    const focused = this.get('focusedOption');
    if (focused) {
      focused.blur();
    }
    this.set('focusedOption', option);
    option.focus();
  },

  selectOption: function(event) {
    event.preventDefault();
    const focused = this.get('focusedOption');
    if (focused) {
      this.send('selectItem', focused.get('item'), focused.get('label'));
    }
    this.set('isDropdownOpen', false);
  },

  handleKeydown: Ember.on('keyDown', function(event) {
    const map = this.get('keydownMap');
    const code = event.keyCode;
    const method = map[code];
    if (method) {
      return this[method](event);
    }
  }),

  actions: {
    selectItem(item, value) {
      this.get('on-select')(item);
      this.set('isDropdownOpen', false);
      this.set('inputValue', value);
    },

    inputDidChange(value) {
      this.get('on-input')(value);
      this.set('isDropdownOpen', true);
      return new Ember.RSVP.Promise((resolve, reject) => {
        if (this.get('isBackspacing')) {
          this.set('isBackspacing', false);
          reject();
        } else {
          Ember.run.scheduleOnce('afterRender', this, function() {
            const firstOption = this.get('list.firstOption');
            if (firstOption) {
              const autocompletedLabel = firstOption.get('label');
              this.set('focusedOption', firstOption);
              this.get('on-select')(firstOption.get('item'));
              this.set('inputValue', autocompletedLabel);
              Ember.run.next(this, () => {
                resolve({ start: value.length, end: autocompletedLabel.length });
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
