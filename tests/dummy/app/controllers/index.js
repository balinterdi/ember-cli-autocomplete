import Ember from 'ember';

const artists = [
  { id: 1, name: 'Mike McCready', band: 'Pearl Jam', img: 'images/mike-mccready-1.jpg' },
  { id: 2, name: 'Dave Grohl', band: 'Foo Fighters', img: 'images/dave-grohl.jpg' },
  { id: 3, name: 'Josh Homme', band: 'Them Crooked Vultures', img: 'images/josh-homme.jpg' },
  { id: 4, name: 'Jimmy Page', band: 'Led Zeppelin', img: 'images/jimmy-page-1.jpg' },
  { id: 5, name: 'Eddie Vedder', band: 'Pearl Jam', img: 'images/eddie-vedder.jpg' }
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
