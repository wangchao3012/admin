

<template>
    <div class="modal fade"
         :id='id'
         tabindex="-1"
         role="dialog"
         aria-labelledby="myModalLabel">
        <div class="modal-dialog"
             role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"><slot name='header'><div>{{title}}</div></slot></h4>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button"
                            class="btn btn-default"
                            data-dismiss="modal">取消</button>
                    <button type="button"
                            class="btn btn-primary">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    // props: {
    //     id: String,
    //     title: {
    //         type: String
    //     }
    // },
    data() {
        return {
            id: new Date().getTime()
        }
    }
} 
</script>