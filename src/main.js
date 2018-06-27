// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import 'animate.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import Vuebar from 'vuebar';

import chroma from 'chroma-js'
const debug = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = debug
Vue.config.performance = debug

// These are globally added to ALL components, beware
Vue.mixin({
  data() {
    return {
      colors: chroma.brewer.Set1,
      debug
    }
  }
})

// Add custom scrollbar so it doesn't make things look ewwie
Vue.use(Vuebar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
