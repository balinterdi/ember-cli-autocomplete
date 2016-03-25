import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const artists = Ember.A([
  Ember.Object.create({ id: 1, name: "Eddie Vedder" }),
  Ember.Object.create({ id: 2, name: "Dave Grohl" }),
  Ember.Object.create({ id: 3, name: "John Paul Jones" }),
  Ember.Object.create({ id: 4, name: "Jimmy Page" })
]);

function typeInInput(text) {
  this.$('.auto-complete-input')
    .prop('value', text)
    .trigger('input');
}

moduleForComponent('auto-complete', 'Integration | Component | auto-complete', {
  integration: true
});

test('it works', function(assert) {
  assert.expect(4);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('selectedArtist', null);
  this.set('matchingArtists', artists);
  this.actions = {
    selectArtist(artist) {
      this.set('selectedArtist', artist);
    },
    filterArtists(searchTerm) {
      const matchingArtists = artists.filter(function(artist) {
        searchTerm = searchTerm.toLowerCase();
        return artist.get('name').toLowerCase().indexOf(searchTerm) === 0;
      });
      this.set('matchingArtists', Ember.A(matchingArtists));
    }
  };

  this.render(hbs`
    {{#auto-complete
        on-select=(action "selectArtist")
        on-input=(action "filterArtists")
        items=matchingArtists
        displayProperty="name"
        as |params|}}
        {{auto-complete-input
            class="auto-complete-input"
            value=params.inputValue
            on-change=params.onInput
            type="text"}}
        {{#auto-complete-list isVisible=params.isOpen}}
          {{#each params.options as |option|}}
            {{#auto-complete-option
                class="auto-complete-option"
                index=option.index
                on-click=params.onSelect
                isFocused=(eq params.focusedIndex option.index)
                isSelected=(eq params.selectedIndex option.index)}}
              <a href="#">{{option.value}}</a>
            {{/auto-complete-option}}
          {{else}}
            <li><a href="#">No results.</a></li>
          {{/each}}
        {{/auto-complete-list}}
        {{#auto-complete-dropdown-toggle on-click=params.toggleDropdown}}
          <span class="caret"></span>
        {{/auto-complete-dropdown-toggle}}
    {{/auto-complete}}
  `);

  function assertSelectedArtist(name) {
    assert.equal(this.get('selectedArtist.name'), name);
  }

  function assertOptionCount(count, message) {
    assert.equal(this.$('.auto-complete-option').length, count, message);
  }

  this.$('.auto-complete-option:first').click();
  assertSelectedArtist.call(this, 'Eddie Vedder');

  this.$('.auto-complete-option:last').click();
  assertSelectedArtist.call(this, 'Jimmy Page');

  typeInInput.call(this, 'J');
  assertOptionCount.call(this, 2, "The filtered artists are shown");

  typeInInput.call(this, 'Jo');
  assertSelectedArtist.call(this, 'John Paul Jones');

  typeInInput.call(this, '');
});
