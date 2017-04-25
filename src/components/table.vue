<template>
    <div class="box">
        <div class="content-header">
            <div class="form-inline">
                <slot>
                </slot>
            </div>
        </div>
        <div class="box-body">
    
            <table class="table table-striped table-bordered table-hover y-table">
                <thead>
                    <tr>
                        <th class="text-center">
                            <input @click='select'
                                   :checked='check.length==result.list.length'
                                   class="y-checkbox"
                                   type="checkbox" />
                        </th>
                        <th class="text-center">
                            序号
                        </th>
                        <th v-for="c in columns"
                            :data-sort='c.sort'
                            class="text-center"
                            @click='changeSort(c.sort,$event)'>
                            {{ c.title }}
                            <i v-if='c.sort'
                               class="fa"
                               :class="[sortKey != c.sort? 'fa-sort':sortOrder==''?'fa-sort-asc':'fa-sort-desc']"
                               aria-hidden="true"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s,i) in result.list">
                        <td class="y-item-checkbox text-center">
                            <input v-model='check'
                                   class="y-checkbox"
                                   :value="s.id"
                                   type="checkbox" />
                        </td>
                        <td class="text-right y-item-index">
                            {{(pageNo-1)*pageSize+i+1}}
                        </td>
                        <td v-for="c in columns"
                            :class='c.class'>
                            {{s[c.key]}}
                        </td>
                    </tr>
                </tbody>
            </table>
            <page :total='result.total'
                  :pageSize='par.pageSize'
                  @on-change="changePage"></page>
        </div>
    </div>
</template>

<script>
import page from '@/components/page'
export default {
    props: {
        columns: Array,
        pageSize: {
            type: Number,
            default: 10
        },
        parWhere: Object,
        method:{
            type: String,
            default:''
        }
    },
    data: function () {
        return {
            sortKey: '',
            sortOrder: '',
            check: [],
            pageNo:1,
            par: {
                offset: 0,
                pageSize: 10,
                sort: '',
                txt: ''
            },
            result: {
                total: 80,
                list: []
            },
        }
    },
    created() {
        var self = this;
        self.$on('on-load', () => {
            console.log('调用了加载', JSON.stringify(self.par));
            self.load();
        });
    },
    components: {
        page
    },
    watch: {
        check(val) {
            this.$emit('on-check', val)
        }
    },
    mounted() {
        var self = this;
        self.load();
    },
    computed: {

    },
    methods: {
        changeSort: function (sort, event) {
            if (this.sortKey == sort) {
                this.sortOrder = this.sortOrder ? '' : 'desc';
            }
            else {
                this.sortKey = sort;
                this.sortOrder = ''
            }
            this.check = []
            this.par.sort = this.sortKey + ' ' + this.sortOrder;
            this.load();
        },
        select(el) {
            this.check = el.target.checked ? Array.from(this.result.list, s => s.id) : [];
        },
        load() {
            var self = this;
            Object.assign(self.par, self.parWhere)
            console.log('par', JSON.stringify(self.par));
// debugger
            self.par.offset=(self.pageNo-1)*self.par.pageSize;
            app.post(app.method[self.method], self.par, d => {
                
                console.log('d111::' + JSON.stringify(d)) 
                self.result.list =d.rows;
                self.result.total=d.count;
            })

            // self.result.list = [];
             
            // for (var i = 0; i < self.par.pageSize; i++) {
            //     let n = (self.par.pageNo - 1) * self.par.pageSize + i + 1;
            //     self.result.list.push({
            //         id: n,
            //         name: '张三' + n,
            //         sex: '男' + n,
            //         age: n,
            //         remark: '这里是备注信息..................................................' + n,
            //     });
            // }
            // self.result.total = 80;
        },
        changePage(page) {
            var self = this;
            this.check = [];
            self.pageNo=page.pageNo;
            Object.assign(self.par, page)
            self.load();
        },
    },
    sortCls(key) {
        return [this.sortKey == key && 'fa-sort' + { asc, desc, '': '' }[this.sortOrder]]
    }
}

</script>