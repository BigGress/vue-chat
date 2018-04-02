import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

Vue.filter('date', (value, format = 'yyyy-MM-dd HH:mm:ss') => {
  let date = new Date(value);
  let time = format;
  if (date) {
    time = time.replace('yyyy', date.getFullYear());
    time = time.replace('MM', date.getMonth() + 1);
    time = time.replace('dd', date.getDay());
    time = time.replace('HH', date.getHours());
    time = time.replace('mm', date.getMinutes());
    time = time.replace('ss', date.getSeconds());
    return time;
  } else {
    return 'error'
  }

})

new Vue({
  render: h => h(App)
}).$mount('#app')
