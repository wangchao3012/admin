import Vue from 'vue'

import Page from '@/components/page'
import Table from '@/components/table'
import Modal from '@/components/modal'
import Confirm from '@/components/confirm'


const xview = {
    Page,
    xTable: Table,
    Modal
};

// const install = function (Vue, opts = {}) {
// locale.use(opts.locale);
// locale.i18n(opts.i18n);

Object.keys(xview).forEach((k) => {
    Vue.component(k, xview[k]);
});

// Vue.prototype.$Loading = LoadingBar;
// Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Confirm = Confirm;

// Vue.prototype.$Notice = Notice;
// };


export default xview; 