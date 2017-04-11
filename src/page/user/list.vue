<template>
    <div class="content-wrapper">
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="glyphicon glyphicon-home"></i> 分公司多头开户信息</a></li>
                <!--<li class="active">Dashboard</li>-->
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">

            <!--<form id="search">
                Search <input name="query" v-model="searchQuery">
            </form>-->
            <demo-grid :data="gridData" :columns="gridColumns" :filter-key="searchQuery">
            </demo-grid>

        </section>
    </div>
</template>
<script>
    // import '../table'

    export default {
        
        data() {
            return {
                searchQuery: '',
                gridColumns: ['name', 'power'],
                gridData: [
                    { name: 'Chuck Norris', power: Infinity },
                    { name: 'Bruce Lee', power: 9000 },
                    { name: 'Jackie Chan', power: 7000 },
                    { name: 'Jet Li', power: 8000 }
                ]

            }
        }
    }

</script>