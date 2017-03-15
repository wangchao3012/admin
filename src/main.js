// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './index'
import router from './router'

Vue.config.productionTip = false

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css'

import '!style-loader!css-loader!font-awesome/css/font-awesome.css'
import '!style-loader!css-loader!@/assets/AdminLTE/dist/css/skins/_all-skins.css'
import '!style-loader!css-loader!@/assets/AdminLTE/dist/css/AdminLTE.css'

import $ from '@/assets/jquery-vendor.js'
import 'bootstrap'
import '@/plugins/slimScroll/jquery.slimscroll.min.js'
import '@/dist/js/app.js'
// $(document).ajaxStart(function() { Pace.restart(); });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Index/>',
  components: { Index }
})
