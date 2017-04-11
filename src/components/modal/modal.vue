

<template>
    <div class="modal fade"
         :id='id'
         tabindex="-1"
         role="dialog"
         aria-labelledby="myModalLabel">
        <div class="modal-dialog"
             role="document"
             :style="mainStyles">
            <div class="modal-content">
                <div class="modal-header"
                     v-if='showHead'>
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"><slot name='header'><div>{{title}}</div></slot></h4>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer" v-if="!footerHide">
                    <slot name='footer'>
                        <button type="button"
                                class="btn btn-default"
                                data-dismiss="modal">取消</button>
                        <button type="button"
                                @click="ok"
                                class="btn btn-primary">确定</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        id: String,
        title: {
            type: String
        },
        body: String,
        styles: {
            type: Object
        },
        width: {
            type: [Number, String],
            default: 520
        },
         footerHide: {
                type: Boolean,
                default: false
            },
    },
    mounted() {
        let showHead = true;
        if (this.$slots.header === undefined && !this.title) {
            showHead = false;
        }
        this.showHead = showHead;
    },
    computed: {
        mainStyles() {
            let style = {};
            const styleWidth = {
                width: `${this.width}px`
            };
            const customStyle = this.styles ? this.styles : {};
            Object.assign(style, styleWidth, customStyle);
            return style;
        },
    },
    data() {
        return {
            showHead: true,
        }
    },
    methods: {
        ok() {
            console.log('kkkk');
            
            this.$emit('on-ok');
        },
    }
}
</script>