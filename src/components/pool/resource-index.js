import elasticlunr from 'elasticlunr';

elasticlunr.clearStopWords();

export const index = elasticlunr(function index() {
  this.addField('name');
  this.addField('location');
  this.addField('website');
  this.setRef('id');
});

export const booster = {
  fields: {
    name: { boost: 3 },
    location: { boost: 2 },
    website: { boost: 1 },
  },
  expand: true,
};
