// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

fontawesome.library.add(brands, faSpinner, faCoffee, faSearch)
Vue.config.productionTip = false
var eventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function () {
      return eventBus
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
