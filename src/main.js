// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Index from './index'
import App from './App'

import component from './components'
import router from './router'


Vue.config.productionTip = false

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css'

import '!style-loader!css-loader!font-awesome/css/font-awesome.css'
import '!style-loader!css-loader!@/assets/AdminLTE/dist/css/skins/_all-skins.css'
import '!style-loader!css-loader!@/assets/AdminLTE/dist/css/AdminLTE.css'
import '!style-loader!css-loader!bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'


import '@/scss/main.scss'


import $ from '@/assets/jquery-vendor.js'
import 'bootstrap'
import 'jquery-slimscroll'
import 'bootstrap-datepicker'
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js'
import app from '@/js/app.js'
import '@/js/index.js'

import store from '@/store/index'
console.log('store:', store);
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
// console.log('a', app.version);
// $(document).ajaxStart(function () { Pace.restart(); });
