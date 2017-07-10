<template>
  <div id="wrapper">
      <nav class="navbar navbar-default navbar-cls-top" role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <router-link class="navbar-brand" to="/index">创赢直播平台</router-link>
          </div>
        <div class="pull-right" style="color:#fff;padding: 15px 50px 5px 50px;font-size: 16px;">
          <a @click="logout()" class="btn btn-danger square-btn-adjust">退出</a>
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
  .navbar-cls-top .navbar-brand {
    color: #fff;
    background: #C90000;
    width: 260px;
    text-align: center;
    height:auto;
    font-size: 20px;
    font-weight:500;
  }

  .navbar-brand:hover{
      color:#fff;
      font-size:20px;
  }
</style>