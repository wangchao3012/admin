<template>
    <div id="app">
        首页模板{{ msg }}
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'index',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                menu: [
                    {
                        name: '首页',
                        icon: '',
                    },
                    {
                        name: '用户管理',
                        icon: '',
                    }
                ]
            }
        }
    }

</script>