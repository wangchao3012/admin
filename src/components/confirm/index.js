import Confirm from './confirm.vue'
 
Confirm.show = function () {
    debugger
    $('#' + Confirm.id).modal('show');
}

export default Confirm