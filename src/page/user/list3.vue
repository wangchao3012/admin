<template>
    <div class="content-wrapper">
        <div class="content-header">
            <h1>
                aa
                <small>bbb</small>
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
                                    <select class="form-control">
                                        <option value="all">全部</option>
                                        <option value="false">未通过</option>
                                        <option value="true">已通过</option>
                                        <option value="true">未审批</option>
						            </select>
                                </div>
                                <div class="form-group">
                                    <!--<label for="">姓名：</label>-->
                                    <input type="text" class="form-control" placeholder="姓名">
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary ">
							搜索
						</button>
                                </div>

                            </div>
                        </div>
                        <div class="box-body">

                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th class="col-xs-2">
                                            姓名
                                            <span></span>
                                        </th>
                                        <th>
                                            数量
                                            <span></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="s in data">
                                        <td>
                                            {{s.name}}
                                        </td>
                                        <td>
                                            {{s.num}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer">

                            <page :total='80' :pageSize='5' @on-change="changePage"></page>

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
                searchQuery: '',
                gridColumns: [{
                    title: '姓名',
                    class: '',
                    name: 'name'
                }, {
                    title: '数量',
                    class: 'col-xs-1',
                    name: 'power'
                }
                ],
                data: [
                    { name: 'Chuck Norris', num: Infinity },
                    { name: 'Bruce Lee', num: 9000 },
                    { name: 'Jackie Chan', num: 7000 },
                    { name: 'Jet Li', num: 8000 }
                ]
            }
        },
        methods: {
            changePage(page) {
                // debugger
                console.log(JSON.stringify(page))
            }
        }

    }

</script>