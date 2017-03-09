<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <div id="div1"></div>
    		<button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">点我弹出/隐藏弹出框</button>
	
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    $('#div1').text('123456');

				$('[data-toggle="popover"]').popover() 
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
