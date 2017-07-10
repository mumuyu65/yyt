<template>
  <div id="wrapper">
      <nav class="navbar navbar-default navbar-cls-top " role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <router-link class="navbar-brand" to="/index">创赢后台管理系统</router-link>
          </div>
        <div class="pull-right" style="color:#fff;padding: 15px 50px 5px 50px;font-size: 16px;">
          Last access : 30 May 2017 &nbsp; <a @click="logout()" class="btn btn-danger square-btn-adjust">退出</a>
        </div>
      </nav>
  </div>
</template>

<script>
export default {
  name:'Header',
  methods:{
    logout (){
        this.$router.push('/');
    }
  }
}
</script>
<style scoped>
  .navbar-brand{
      color:#fff;
      font-size:25px;
  }

  .navbar-brand:hover{
      color:#fff;
      font-size:25px;
  }
</style>