import Modal from './confirm'
let modalInstance;
function getModalInstance() {
    modalInstance = modalInstance || Modal.newInstance({
       
        // closable: false,
        // maskClosable: false,
        footerHide: true
    });

    return modalInstance;
}

function confirm(options) {
    let instance = getModalInstance();

    options.onRemove = function () {
        modalInstance = null;
    };

    instance.show(options);
}
Modal.info = function (props = {}) {

    return confirm(props);
};
export default Modal