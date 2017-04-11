<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h1>
                表格自带分页功能
                <small>表格组件</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="glyphicon glyphicon-home"></i> 分公司多头开户信息</a></li>
                <!--<li class="active">Dashboard</li>-->
            </ol>
        </div>

        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="content-header">
                            <div class="form-inline">

                                <div class="form-group">
                                    <!--<label for="">类别：</label>-->
                                    <template>
                                        <select v-model='par.sex' class="form-control">
                                        <option value="-1">全部</option>
                                        <option value="0">男</option>
                                        <option value="1">女</option> 
						            </select>
                                    </template>
                                </div>
                                <div class="form-group">
                                    <!--<label for="">姓名：</label>-->
                                    <input type="text" v-model='par.txt' class="form-control" placeholder="姓名/备注">
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary " @click='sel'>
							            搜索
						            </button>
                                    <button class="btn btn-danger " @click='del'>
							            删除
						            </button>
                                </div>
                                <div class="form-group">
                                    {{checkIds}}
                                </div>
                            </div>
                        </div>
                        <!--:pageIndex='par.pageNo' :pageSize='par.pageSize' @on-change="changePage"-->
                        <div class="box-body">
                            <table-page :columns="tableColumns" :parWhere='par' @on-check="check">
                            </table-page>
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
                checkIds: [],
                par: {
                    txt: '',
                    sex: '0'
                },
                tableColumns: [{
                    title: '姓名',
                    class: 'col-xs-1',
                    key: 'name',
                    sort: 'name'
                }, {
                    title: '性别',
                    class: 'col-xs-1 text-center',
                    key: 'sex',
                    // sort:'sex'
                }, {
                    title: '年龄',
                    class: 'col-xs-1 text-right',
                    key: 'age',
                    sort: 'age'
                }, {
                    title: '备注',
                    class: '',
                    key: 'remark'
                }
                ],
            }
        },
        mounted() {

        },
        methods: {
            sel() {
                console.log('111');
                this.$children[0].$emit('on-load')
                // debugger
                // this.$emit('on-load', 1)
                // this.$children[0].load
            },
            del(){
                
            },
            check(check) {
                this.checkIds = check;
            }
        }

    }

</script>