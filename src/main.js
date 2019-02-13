import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'


Vue.config.productionTip = false

Vue.use(VueMaterial);

Vue.filter('priority', function (value) {
  if (!value) return ''
  value = value.toString()
  switch (value) {
    case '1': 
      return "Низкий";
    case '2':
      return "Средний";
    case '3':
      return "Высокий";
    default:
      return "Средний";
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
