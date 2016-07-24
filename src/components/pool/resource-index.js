import lunr from 'lunr';

export default lunr(function index() {
  this.field('name', { boost: 100 });
  this.field('location', { boost: 10 });
  this.field('website');
  this.ref('key');
});
