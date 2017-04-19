<template>
  <div class="login">
    <div class="y-list">
      <div class="form-group has-feedback">
        <input type="text"
               class="form-control"
               v-model="par.userName"
               placeholder="请输入用户名">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password"
               class="form-control"
               v-model="par.password"
               placeholder="请输入密码">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button class="btn btn-primary btn-block"
                  @click='login'>
            登录</button>
        </div>
  
      </div>
  
    </div>
  </div>
</template>
<style>
.login {
  padding: 200px;
  background-color: #3c8dbc;
  /*rgba(0,0,0,.8);*/
  height: 100%;
}

.y-list {
  width: 400px;
  margin: 0 auto;
  border: solid 1px #333;
  padding: 50px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
}
</style>
<script>
export default {
  // name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      par: {
        userName: 'admin',
        password: '111111',
        type: 1
      }
    }
  },
  mounted() {

  },
  methods: {
    login() {
      let self = this;
      app.post(app.method.user_login, self.par, d => {
        console.log('d::' + JSON.stringify(d))
        // this.$router.push({ path: '/' })
      })
    }
  }
}
</script>