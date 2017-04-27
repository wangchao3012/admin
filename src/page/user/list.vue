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
                    <x-table :columns="tableColumns"
                             :parWhere='par'
                             :pageIndex='1'
                             :method='method'
                             @on-check="check">
                        <div class="form-inline">
    
                            <div class="form-group">
                                <label for="">性别：</label>
                                <select v-model='par.sex'
                                        class="form-control">
                                    <option value="-1">全部</option>
                                    <option value="0">男</option>
                                    <option value="1">女</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <!--<label for="">姓名：</label>-->
                                <input type="text"
                                       v-model='par.txt'
                                       class="form-control"
                                       placeholder="姓名/备注">
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input type="text"
                                           v-model='par.date'
                                           class="form-control pull-right datepicker"
                                           readonly="readonly">
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary "
                                        @click='sel'>
                                    搜索
                                </button>
                                <button class="btn btn-danger "
                                        @click='del'>
                                    删除
                                </button>
                            </div>
                            <div class="form-group">
                                {{checkIds}}
                            </div>
                        </div>
                    </x-table>
    
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
            method:'user_list',
            par: {
                txt: '',
                sex: '-1',
                date: ''
            },
            tableColumns: [{
                title: '姓名',
                class: 'col-xs-1',
                key: 'name',
                sort: 'name'
            }, {
                title: '用户名',
                class: 'col-xs-1',
                key: 'userName',
                sort: 'userName'
            },{
                title: '性别',
                class: 'col-xs-1 text-center',
                key: 'sex', 
            }, {
                title: '手机号',
                class: 'col-xs-1 text-right',
                key: 'mobile',
                sort: 'mobile'
            }
            , {
                title: '操作时间',
                class: 'col-xs-2 text-center',
                key: 'updatedAt',
                sort: 'updatedAt'
            }
            , {
                title: '备注',
                class: '',
                key: 'remark'
            }
            ],
        }
    },
    mounted() {
        let self = this;
        $('input.datepicker').datepicker({
            format: "yyyy-mm-dd",
            language: "zh-CN",
            autoclose: true,
            daysOfWeekHighlighted: "0,6",
            weekStart: 0,
            // minViewMode:1
        }).on('changeDate', v => {
            self.par.date = v.format('yyyy-mm-dd')
            console.log('par::', JSON.stringify(self.par));
        });

    },
    methods: {
        sel() {
            console.log('111');
            this.$children[0].$emit('on-load')
            // debugger
            // this.$emit('on-load', 1)
            // this.$children[0].load
        },
        del() {
            this.$Modal.info({ body: '请选择删除项！' });
        },
        check(check) {
            this.checkIds = check;
        }
    }

}

</script>