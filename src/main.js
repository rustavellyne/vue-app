import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import * as fb from 'firebase'
import config from './api_keys'
import BuyModal from './components/Shared/BuyModal.vue'
Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModal)

let app = null;

fb.initializeApp(config)

fb.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('autoLoginUser', user)
  }

  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
      created () {
        this.$store.dispatch('fetchAds')
      },
    }).$mount('#app')
  }
})


