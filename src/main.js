// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import 'animate.css'

import Vue from 'vue'
import App from './App'
import router from './router'

import chroma from 'chroma-js'

Vue.config.productionTip = false

// These are globally added to ALL components, beware
Vue.mixin({
  data() {
    return {
      colors: chroma.brewer.Set1
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
