// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './index'
import router from './router'

// require("!style!css!./bootstrap/css/bootstrap.css");
require("!style-loader!css-loader!bootstrap/css/bootstrap.css");
require("!style-loader!css-loader!./dist/css/skins/_all-skins.min.css");
require("!style-loader!css-loader!./dist/css/AdminLTE.min.css");
// require("!style-loader!css-loader!./bootstrap/css/bootstrap.css");

require("./js/jquery.js")
// require("./bootstrap/js/bootstrap.min.js")

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Index/>',
  components: { Index }
})
