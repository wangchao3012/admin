<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        图表
        <small>EChart</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="glyphicon glyphicon-home"></i> 主页</a></li>
        <!--<li class="active">Dashboard</li>-->
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
       
      <div id="main" style="width: 600px;height:400px;">
        
      </div>
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
      // 引入 ECharts 主模块
      var echarts = require('echarts/lib/echarts');
      // 引入柱状图
      require('echarts/lib/chart/bar');
      // 引入提示框和标题组件
      require('echarts/lib/component/tooltip');
      require('echarts/lib/component/title');

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        title: { text: 'ECharts' },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    }

  }

</script>