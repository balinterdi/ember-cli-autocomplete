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
  items:            [],
  displayProperty:  '',

  itemsLength: Ember.computed.readOnly('items.length'),

  isBackspacing: false,

  toggleDropdown() {
    this.toggleProperty('isDropdownOpen');
  },

  openDropdown() {
    this.set('isDropdownOpen', true);
  },

  closeDropdown: function() {
    this.set('isDropdownOpen', false);
  },

  keydownMap: {
    8:  'startBackspacing', // backspace
    13: 'selectItem',  // return
    27: 'closeDropdown', // escape
    38: 'focusPrevious', // up key
    40: 'focusNext', // down key
  },

  startBackspacing: function() {
    this.set('isBackspacing', true);
  },

  setFocusedIndex(index) {
    this.set('focusedIndex', index);
  },

  setSelectedIndex(index) {
    this.set('selectedIndex', index);
  },

  resetFocusedIndex() {
    this.setFocusedIndex(null);
  },

  resetSelectedIndex() {
    this.setSelectedIndex(null);
  },

  focusPrevious: function(event) {
    event.preventDefault();
    const currentIndex = this.get('focusedIndex');
    let newIndex;
    if (Ember.isNone(currentIndex)) {
      newIndex = this.get('itemsLength') - 1;
    } else if (currentIndex === 0) {
      newIndex = this.get('itemsLength') - 1;
    } else {
      newIndex = currentIndex - 1;
    }
    this.setFocusedIndex(newIndex);
    this.openDropdown();
  },

  focusNext: function(event) {
    event.preventDefault();
    const currentIndex = this.get('focusedIndex');
    const lastIndex = this.get('itemsLength') - 1;
    let newIndex;
    if (Ember.isNone(currentIndex)) {
      newIndex = 0;
    } else if (currentIndex === lastIndex) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
    this.setFocusedIndex(newIndex);
    this.openDropdown();
  },

  options: Ember.computed('items.[]', function() {
    const displayProperty = this.get('displayProperty');
    let options = this.get('items').map((item, index) => {
      return Ember.Object.create({
        id: item.get('id'),
        index: index,
        value: item.get(displayProperty)
      });
    });
    return Ember.A(options);
  }),

  selectItem: function(event) {
    event.preventDefault();
    const focusedIndex = this.get('focusedIndex');
    if (Ember.isPresent(focusedIndex)) {
      this.send('selectItem', focusedIndex);
    }
    this.closeDropdown();
  },

  selectedItem: Ember.computed('selectedIndex', 'items.[]', function() {
    return this.get('items').objectAt(this.get('selectedIndex'));
  }),

  handleKeydown: Ember.on('keyDown', function(event) {
    const map = this.get('keydownMap');
    const code = event.keyCode;
    const method = map[code];
    if (method) {
      return this[method](event);
    }
  }),

  _inputValueForItem(item) {
    let displayProperty = this.get('displayProperty');
    return item.get(displayProperty);
  },

  actions: {
    selectItem(index) {
      this.setSelectedIndex(index);
      let selectedItem = this.get('selectedItem');
      this.get('on-select')(selectedItem);
      this.closeDropdown();
      this.set('inputValue', this._inputValueForItem(selectedItem));
    },

    inputDidChange(value) {
      this.get('on-input')(value);
      this.resetFocusedIndex();
      this.resetSelectedIndex();
      this.openDropdown();
      return new Ember.RSVP.Promise((resolve, reject) => {
        if (this.get('isBackspacing')) {
          this.set('inputValue', value);
          this.set('isBackspacing', false);
          reject();
        } else {
          Ember.run.scheduleOnce('afterRender', this, function() {
            const firstItem = this.get('items.firstObject');
            if (firstItem) {
              this.get('on-select')(firstItem);
              this.setSelectedIndex(0);
              const inputValue = this._inputValueForItem(firstItem);
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
