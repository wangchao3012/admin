import Vue from 'vue';
import Modal from './modal.vue';
Modal.newInstance = properties => {
    const _props = properties || {};
    let props = '';
    Object.keys(_props).forEach(prop => {
        let a = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        props += ' :' + a + '=' + prop;
    });
    // debugger
    let id = new Date().getTime();
    const div = document.createElement('div');
    div.innerHTML = `
    <Modal${props} id='${id}' :width="width"> 
    <div>
    <h4 class="modal-title">{{title}}</h4>
    <div class="row">
                                        <div class="col-xs-2">
                                            <i class="fa fa-4x" :class='iconCls'></i>
                                        </div>
                                        <div>
                                            {{body}}
                                        </div>
                                    </div> 
                                    <div class="row" >
                                       <button type="button"
                                class="btn btn-default"
                                data-dismiss="modal">取消1</button>
                        <button type="button"
                                @click="ok"
                                class="btn btn-primary">确定</button>
                                  </div> 
                                  </div> 
                                    </Modal>
    `;
    // <span v-html='title'></span>
    document.body.appendChild(div);
    const modal = new Vue({
        el: div,
        components: { Modal },
        data: Object.assign(_props, {
            title: '',
            body: '',
            width: 416,
            iconCls: 'fa-info-circle'
        }),
        methods: {
            ok() {
                console.log('ok11');
                this.onOk();
            },

            onOk() {
                console.log('ok22');
            },
        }
    }).$children[0];
    return {
        show(props) {
            // debugger
            if ('title' in props) {
                modal.$parent.title = props.title;
            }
            if ('body' in props) {
                modal.$parent.body = props.body;
            }
            if ('onOk' in props) {
                modal.$parent.onOk = props.onOk;
            }
            $('#' + id).modal('show');
            // $(div).children('#myModal').modal('show');
        }

    }
}
export default Modal;