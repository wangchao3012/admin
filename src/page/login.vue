<template>
<div class="login-box"  >
  <div class="login-logo">
    <a href="../../index2.html"><b>Admin</b>LTE</a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Sign in to start your session</p>

    <form action="../../index2.html" method="post">
      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="Email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-12">
            <button class="btn btn-primary btn-block"
                @click='login'>
            登录</button>
        </div>
        
      </div>
    </form>

    <div class="social-auth-links text-center">
      <!--<p>- OR -</p>
      <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>-->
 

    </div>
    <!-- /.social-auth-links -->

    <a href="#">I forgot my password</a><br>
    <a href="register.html" class="text-center">Register a new membership</a>

  </div>
  <!-- /.login-box-body -->
</div>
</template>
<script>
export default {
    // name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    mounted() {

    },
    methods: {
        login() {
          app.post()
            // this.$router.push({ path: '/' })
        }
    }
}
</script>