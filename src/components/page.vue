<template>

    <div class="form-inline y-pager">

        <!--<div class="form-group">-->
        <ul class="pagination no-margin form-group  pull-right">
            <li title="上一页" :class="prevClasses" @click="prev">
                <a aria-label="Previous">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </a>
            </li>
            <li :class='{"active":currentPage==1}' @click="changePage(1)"><a>1</a></li>
            <li title='向前5页' class="y-page-prev" v-if='currentPage-3>1' @click="fastPrev">
                <a aria-label="Next">
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                </a>
            </li>
            <li v-if='currentPage-2>1' @click="changePage(currentPage - 2)"><a>{{currentPage-2}}</a></li>
            <li v-if='currentPage-1>1' @click="changePage(currentPage - 1)"><a>{{currentPage-1}}</a></li>
            <li class="active" v-if="currentPage != 1 && currentPage != allPages"><a>{{currentPage}}</a></li>
            <li v-if='currentPage + 1<allPages' @click="changePage(currentPage + 1)"><a>{{currentPage+1}}</a></li>
            <li v-if='currentPage + 2<allPages' @click="changePage(currentPage + 2)"><a>{{currentPage+2}}</a></li>
            <!--<li v-for='n in total-2' :class='{"active":n+1==current}'><a>{{n+1}}</a></li>-->
            <li title='向后5页' class="y-page-next" v-if='currentPage + 3<allPages' @click="fastNext">
                <a>
                    <i class="fa fa-ellipsis-h"></i>
                </a>
            </li>
            <li :class='{"active":currentPage==allPages}' v-if='allPages>1' @click="changePage(allPages)"><a>{{allPages}}</a></li>
            <li title="下一页" :class="nextClasses" @click="next">
                <a aria-label="Next">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </a>
            </li>
        </ul>
        <!--</div>-->
        <div class="form-group">
            <select v-model.number='currentPageSize' class="form-control">
                <option value="5" >5条/页</option>
                <option value="10">10条/页</option>
                <option value="20">20条/页</option>
                <option value="50">50条/页</option>
                <option value="100">100条/页</option>
            </select>
        </div>
    </div>

</template>

<style>
    /*, .pagination > li > span*/
    
</style>
<script>
    export default {
        props: {
            current: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 0
            },
            pageSize: {
                type: Number,
                default: 10
            }
        },
        watch: {
            current(val) {
                this.currentPage = val;
            },
            pageSize(val) {
                console.log('111', val);
                this.currentPageSize = val;
            },
            currentPageSize(val) { 
                this.changePage(1)
            }
        },
        computed: {
            allPages() { 
                const allPage = Math.ceil(this.total / this.currentPageSize);
                return (allPage === 0) ? 1 : allPage;
            },
            prevClasses() {
                return [
                    // `${prefixCls}-prev`,
                    {
                        [`y-page-disabled`]: this.currentPage == 1
                    }
                ];
            },
            nextClasses() {
                return [
                    {
                        [`y-page-disabled`]: this.currentPage === this.allPages
                    }
                ];
            },
        },
        data() {
            return {
                // prefixCls: prefixCls,
                currentPage: this.current,
                currentPageSize: this.pageSize
            };
        },
        methods: {
            changePage(pageNo) {
                // if (this.currentPage != pageNo) {
                this.currentPage = pageNo; 
                this.$emit('on-change', { pageNo: pageNo, pageSize: this.currentPageSize });
                // }
            },
            prev() {
                const current = this.currentPage;
                if (current <= 1) {
                    return false;
                }
                this.changePage(current - 1);
            },
            next() {
                const current = this.currentPage;
                if (current >= this.allPages) {
                    return false;
                }
                this.changePage(current + 1);
            },
            fastPrev() {
                const page = this.currentPage - 5;
                if (page > 0) {
                    this.changePage(page);
                } else {
                    this.changePage(1);
                }
            },
            fastNext() {
                const page = this.currentPage + 5;
                if (page > this.allPages) {
                    this.changePage(this.allPages);
                } else {
                    this.changePage(page);
                }
            },

        }
    }

</script>