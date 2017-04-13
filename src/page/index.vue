<template>
  <div class="wrapper">
    <header class="main-header">
      <router-link to="/"
                   class="logo">
        <span class="logo-mini">A</span>
        <span class="logo-lg"><b>Admin</b>Lte</span>
      </router-link>
  
      <nav class="navbar navbar-static-top">
        <a href="#"
           class="sidebar-toggle"
           data-toggle="offcanvas"
           role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li>
              <a href="#">
                <span class="hidden-xs">您当前拥有0积分</span>
              </a>
            </li>
            <li class="dropdown notifications-menu">
              <a href="#"
                 class="dropdown-toggle"
                 data-toggle="dropdown">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning">10</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header text-center">您有10条待办事项需要处理</li>
                <li>
                  <!-- inner menu: contains the actual data -->
                  <ul class="menu">
                    <li>
                      <a href="#">
                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-warning text-yellow"></i> Very long description here that may not fit into the page and may cause design problems
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-users text-red"></i> 5 new members joined
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart text-green"></i> 25 sales made
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-user text-red"></i> You changed your username
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="footer"><a href="#">查看全部</a></li>
              </ul>
            </li>
            <!-- Tasks: style can be found in dropdown.less -->
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#"
                 class="dropdown-toggle"
                 data-toggle="dropdown">
                <img src="../img/user2-160x160.jpg"
                     class="user-image"
                     alt="User Image">
                <span class="hidden-xs">张三</span>
              </a>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header">
                  <img src="../img/user2-160x160.jpg"
                       class="img-circle"
                       alt="User Image">
  
                  <p>
                    张三 - 前端开发者
                    <small>注册日期：2016年9月14日</small>
                  </p>
                </li>
  
                <li class="user-footer">
                  <div class="pull-left">
                    <a href="#"
                       class="btn btn-default btn-flat">个人资料</a>
                  </div>
                  <div class="pull-right">
                    <a href="#"
                       @click='exit'
                       class="btn btn-default btn-flat">退出登录</a>
                  </div>
                </li>
              </ul>
            </li>
  
          </ul>
        </div>
  
      </nav>
    </header>
  
    <aside class="main-sidebar">
      <section class="sidebar">
  
        <ul class="sidebar-menu">
          <li class="header"></li>
          <li v-for='(m,i) in menu'
              :class="[{ active: i==0 }, 'treeview']">
            <router-link :to="m.to"><i class="fa"
                 v-bind:class="[m.icon]"></i><span>{{m.name}}</span>
              <span v-if='m.menu'
                    class="pull-right-container">
                      <i class="fa fa-angle-left pull-right"></i>
                       <!--<small class="label pull-right bg-green">new</small> -->
                    </span>
            </router-link>
            <ul v-if='m.menu'
                class="treeview-menu">
              <li v-for='m1 in m.menu'>
                <router-link :to="m1.to"><i class="fa"
                     v-bind:class="[m1.icon]"></i><span>{{m1.name}}</span>
                  <span v-if='m1.menu'
                        class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i> 
                         </span>
                </router-link>
  
                <ul v-if='m1.menu'
                    class="treeview-menu">
                  <li v-for='m2 in m1.menu'>
                    <router-link :to="m2.to"><i class="fa"
                         v-bind:class="[m2.icon]"></i><span>{{m2.name}}</span>
                      <span v-if='m2.menu'
                            class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                          </span>
                    </router-link>
                    <ul v-if='m2.menu'
                        class="treeview-menu">
                      <li v-for='m3 in m2.menu'>
                        <router-link :to="m3.to"><i class="fa"
                             v-bind:class="[m3.icon]"></i><span>{{m3.name}}</span></router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
  
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>
    <router-view></router-view>
    <div class="control-sidebar-bg"></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      menu: [{
        name: '首页',
        icon: 'fa-home',
        to: '/'
      }, {
        name: '数据分析',
        icon: 'fa-area-chart',
        to: '',
        menu: [
          {
            name: '多头开户2',
            icon: 'fa-user',
            to: '/user/list2',
          }, {
            name: '多头开户3',
            icon: 'fa-user',
            to: '/user/list3',
          }, {
            name: '多头开户4',
            icon: 'fa-user',
            to: '/user/list4',
          }, {
            name: '多头开户',
            icon: 'fa-user',
            to: '',
            menu: [{
              name: '分公司多头开户信息',
              icon: 'fa-circle-o',
              to: '/user/list',
            }, {
              name: '用户画像',
              icon: 'fa-circle-o',
              to: '/',
            }]
          }
        ]
      }, {
        name: '示例',
        icon: 'fa-home',
        to: '',
        menu: [
          {
            name: '表格',
            icon: 'fa-table',
            to: '/demo/table',
          },
          {
            name: '图表',
            icon: 'fa-bar-chart',
            to: '/demo/echart',
          },
          {
            name: '模态窗口',
            icon: 'fa-bar-chart',
            to: '/demo/modal',
          }
        ]
      }
      ]
    }
  },

  mounted() {
    // app.post('aa/bb', { aa: 11 }, function (data) {
    //   console.log('data:', JSON.stringify(data));

    // })
    // this.$store.state.test
    // debugger
    // console.log('b',);
    // console.log('aa::', a.aaa());

    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      alert(1);

      $("a[href!='#']").attr("data-toggle", "offcanvas");
    } else {
      // alert(2);
    }
  },
  methods: {
    exit() {
      this.$router.push({ path: '/login' })
    }
  }
}

</script>
 