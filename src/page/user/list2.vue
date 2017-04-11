<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h1>
                表格
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
                                    <select class="form-control">
                                        <option value="all">全部</option>
                                        <option value="false">未通过</option>
                                        <option value="true">已通过</option>
                                        <option value="true">未审批</option>
						            </select>
                                    </template>
                                </div>
                                <div class="form-group">
                                    <!--<label for="">姓名：</label>-->
                                    <input type="text" v-model='par.txt' class="form-control" placeholder="姓名/备注">
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary " @click='load'>
							            搜索
						            </button>
                                </div>
                                <div class="form-group">
                                    {{checkIds}}
                                </div>
                            </div>
                        </div>
                        <div class="box-body">
                            <i-table :data="result.list" :columns="tableColumns" :pageIndex='par.pageNo' :pageSize='par.pageSize' @on-change="changePage"
                                @on-select="select">
                            </i-table>
                        </div>
                        <div class="box-footer">

                            <page :total='80' :pageSize='par.pageSize' @on-change="changePage"></page>

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
                    pageNo: 1,
                    pageSize: 5,
                    sort: '',
                    txt: ''
                },
                result: {
                    total: 0,
                    list: []
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
            var self = this;
            self.load();
        },
        methods: {
            load() {
                var self = this;
                self.result.list = [];
                for (var i = 0; i < self.par.pageSize; i++) {
                    let n = (self.par.pageNo - 1) * self.par.pageSize + i + 1;
                    self.result.list.push({
                        id: n,
                        name: '张三' + n,
                        sex: '男' + n,
                        age: n,
                        remark: '这里是备注信息..................................................' + n,
                    });
                }
                self.result.total = 80;
            },
            changePage(page) {
                var self = this;
                console.log('par1::', JSON.stringify(self.par));
                Object.assign(self.par, page)
                console.log('par2::', JSON.stringify(self.par));
                self.load();
                console.log(JSON.stringify(page))
            },
            select(check) {
                this.checkIds = check;
            }
        }

    }

</script>