 
<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h1>
                                                                                    表格组件
                                                                                    <small>排序、分页、选择、筛选</small>
                                                                                </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="glyphicon glyphicon-home"></i> 分公司多头开户信息</a></li>
                <!--<li class="active">Dashboard</li>-->
            </ol>
        </div>
    
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <button type="button"
                            class="btn btn-primary"
                            data-toggle="modal"
                            @click='def'>
                        默认
                    </button>
                    <button type="button"
                            class="btn btn-success" 
                            @click='success'>
                        成功
                    </button>
                    <button type="button"
                            class="btn btn-info" 
                            @click='info'>
                        信息
                    </button>
                    <button type="button"
                            class="btn btn-warning"
                            data-toggle="modal"
                            data-target="#myModal"
                            @click='warning'>
                        警告
                    </button>
                    <button type="button"
                            class="btn btn-danger"
                            data-toggle="modal"
                            data-target="#myModal"
                            @click='danger'>
                        错误
                    </button>
                </div>
    
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div id="myModal"
                         class="modal fade"
                         tabindex="-1"
                         role="dialog">
                        <div class="modal-dialog"
                             role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">标题</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-xs-2">
                                            <i class="fa fa-info-circle fa-4x"></i>
                                        </div>
                                        <div>
                                            aaaa
                                        </div>
                                    </div>
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
    
                </div>
            </div>
        </section>
    </div>
</template> 
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        // $('#myModal').modal('show')
    },
    methods: {
        def() {
            this.$Modal.info({
                title: '默认标题', body: '默认信息', onOk: () => {
                    console.log('您点击了确定');
                }
            });
        },
        success() {
            this.$Modal.info({ body: '请选择删除项！' });
        },
        info() {
            this.$Modal.info({ body: '请选择删除项！' });
        },
        warning() {
            this.$Modal.info({ body: '请选择删除项！' });
        },
        danger() {
            this.$Modal.info({ body: '请选择删除项！' });
        },

    }

}

</script>
