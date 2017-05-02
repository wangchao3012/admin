<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
          XX管理系统
          <small>Version 1.0</small>
        </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="glyphicon glyphicon-home"></i> 主页</a></li>
        <!--<li class="active">Dashboard</li>-->
      </ol>
    </section>
  
    <!-- Main content -->
    <section class="content">
      <h4 class="text-center">
          您好，张三
        </h4>
      <h2 class="text-center">
          欢迎您，进入首页
        </h2>
      <!--<div class="mui-checkbox mui-left" style="border: solid 1px #f00">
          <label>checkbox示例</label>
          <input type="checkbox" />
        </div>-->
      <input type="checkbox"
             class="y-checkbox" />
      <input type="radio"
             name="a"
             class="y-radio" />
      <input type="radio"
             name="a"
             class="y-radio" />
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

  }
} 
</script>