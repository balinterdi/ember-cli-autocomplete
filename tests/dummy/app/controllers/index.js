import Ember from 'ember';

const artists = [
  { id: 1, name: 'Mike McCready', band: 'Pearl Jam' },
  { id: 2, name: 'Dave Grohl', band: 'Foo Fighters' },
  { id: 3, name: 'Josh Homme', band: 'Them Crooked Vultures' },
  { id: 4, name: 'Jimmy Page', band: 'Led Zeppelin' },
  { id: 5, name: 'Eddie Vedder', band: 'Pearl Jam' }
];


export default Ember.Controller.extend({
  selectedArtist: null,

  init() {
    this._super(...arguments);
    this.set('matchingArtists', artists);
  },

  actions: {
    filterArtists(searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      const matchingArtists = artists.filter(function(artist) {
        return artist.name.toLowerCase().indexOf(searchTerm) === 0;
      });
      this.set('matchingArtists', matchingArtists);
    },

    selectArtist(artist) {
      this.set('selectedArtist', artist);
    }
  }
});
