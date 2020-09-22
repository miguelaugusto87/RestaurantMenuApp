// import '@fortawesome/fontawesome-free/css/all.min.css'
// import 'bootstrap-css-only/css/bootstrap.min.css'
//import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import Vuex from 'vuex'
import VModal from 'vue-js-modal'
import { i18n } from '@/plugins/i18n'
import App from './App.vue'

// import orouter from './frontend/router'
import router from './backoffice/router/index.js'

import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
import { add } from "ionicons/icons";
import { trash } from "ionicons/icons";
import { create } from "ionicons/icons";
import { addIcons } from "ionicons";
import { cart } from "ionicons/icons";
import { contact } from "ionicons/icons";
import { hammer } from "ionicons/icons";
import { list } from "ionicons/icons";
import { arrowRoundBack } from "ionicons/icons";
import { eye } from "ionicons/icons";
import { share } from "ionicons/icons";

// import AppMenu from './Menu';
addIcons({
  "ios-add": add.ios,
  "md-add": add.md,
  "ios-trash": trash.ios,
  "md-trash": trash.md,
  "ios-create": create.ios,
  "md-create": create.md,
  "md-cart": cart.md,
  "ios-cart": cart.ios,
  "md-contact": contact.md,
  "ios-contact": contact.ios,
  "md-hammer": hammer.md,
  "ios-hammer": hammer.ios,
  "md-list": list.md,
  "ios-list": list.ios,
  "md-arrow-round-back": arrowRoundBack.md,
  "ios-arrow-round-back": arrowRoundBack.ios,
  "md-eye": eye.md,
  "ios-eye": eye.ios,
  "md-share": share.md,
  "ios-share": share.ios,
});

Vue.use(Ionic);
Vue.use(Vuex);
Vue.use(VModal)

const store = new Vuex.Store({
  state: {
    authenticated: false,
    user: null,
    roles: [],
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
      console.log(state.authenticated);
    },
    setUser(state, userl){
      state.user = userl;
      console.log(state.user);
    },
    setRoles(state, roles){
      state.roles = roles;
      console.log(state.roles);
    },
  }
});


export default store;

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
  store: store
}).$mount('#app')
