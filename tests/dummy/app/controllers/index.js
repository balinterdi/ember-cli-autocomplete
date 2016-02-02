import Ember from 'ember';

const Artist = Ember.Object.extend({
  name: '',
  bands: null,
  img: '',
  bornIn: null,

  age: Ember.computed('bornIn', function() {
    return new Date().getFullYear() - this.get('bornIn');
  })
});

const artists = Ember.A([
  Artist.create({
    id: 1,
    name: 'Mike McCready',
    bands: ['Pearl Jam', 'Mad Season'],
    img: 'images/mike-mccready-1.jpg',
    bornIn: 1966
  }),
  Artist.create({
    id: 2,
    name: 'Dave Grohl',
    bands: ['Foo Fighters', 'Nirvana'],
    img: 'images/dave-grohl.jpg',
    bornIn: 1969
  }),
  Artist.create({
    id: 3,
    name: 'Josh Homme',
    bands: ['Them Crooked Vultures', 'Queens of the Stone Age'],
    img: 'images/josh-homme.jpg',
    bornIn: 1973
  }),
  Artist.create({
    id: 4,
    name: 'Jimmy Page',
    bands: ['Led Zeppelin'],
    img: 'images/jimmy-page-1.jpg',
    bornIn: 1944
  }),
  Artist.create({
    id: 5,
    name: 'Eddie Vedder',
    bands: ['Pearl Jam'],
    img: 'images/eddie-vedder.jpg',
    bornIn: 1964
  }),
  Artist.create({
    id: 6,
    name: 'John Paul Jones',
    bands: ['Led Zeppelin', 'Them Crooked Vultures'],
    img: 'images/john-paul-jones.jpg',
    bornIn: 1946
  })
]);

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
      this.set('matchingArtists', Ember.A(matchingArtists));
    },

    selectArtist(artist) {
      this.set('selectedArtist', artist);
    }
  }
});
