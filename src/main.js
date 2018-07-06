// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'animate.css'
import chroma from 'chroma-js'
import 'normalize.css'
import Vue from 'vue'
import Vuebar from 'vuebar'
import App from './App'
import router from './router'

const debug = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = debug
Vue.config.performance = debug

// Add custom scrollbar so it doesn't make things look ewwie
Vue.use(Vuebar)

// These are globally added to ALL components, beware
Vue.mixin({
  data() {
    return {
      colors: chroma.scale(chroma.brewer.Set3).colors(20),
      debug
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
