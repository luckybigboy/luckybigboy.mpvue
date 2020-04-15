import Vue from 'vue'
import App from './App'
import store from './store/index'
import Fly from 'flyio/dist/npm/wx'   // http

const fly = new Fly

Vue.config.productionTip = false

App.mpType = 'app'

// 将store(vuex)挂载到vue的实例上，就可以在其他组件中相互使用
Vue.prototype.$store = store;
Vue.prototype.$http = fly;

const app = new Vue(App);

app.$mount();