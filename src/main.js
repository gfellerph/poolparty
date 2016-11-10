import Vue from 'vue';
import store from 'config/store';
import router from 'config/router';
import App from 'src/App';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router,
});
