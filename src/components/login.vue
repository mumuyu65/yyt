<template>
  <div class="main">
     <div class="login_border">
        <h3 class="text-center">创赢直播后台管理系统</h3>
        <div class="row">
          <div class="col-sm-2 col-md-2 col-xs-6 col-sm-offset-1 col-md-offset-1">
             用户名：
          </div>
          <div class="col-sm-8 col-md-8 col-xs-6 ">
            <input type="text" name="account" placeholder="输入用户名" v-model="user.name" class="form-control" required/>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2 col-md-2 col-xs-6 col-sm-offset-1 col-md-offset-1">
            密码：
          </div>
          <div class="col-sm-8 col-md-8 col-xs-6">
             <input type="password" name="pwd" placeholder="输入密码" v-model="user.pwd" class="form-control" required/>
          </div>
        </div>
        <div class="row">
            <div class="col-sm-8 col-md-8 col-xs-6 col-xs-offset-6 col-sm-offset-3 col-md-offset-3">
              <input type="submit" value="登   录" @click="doLogin()" class="form-control"/>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name:'Login',
  data (){
    return {
        user:{
          name:'18516074685',
          pwd:'123456',
        },
    }
  },
  methods: {
    doLogin() {
      let params={
        account:this.user.name.trim(),
        pwd:this.user.pwd.trim()
      };

      let that= this;

      api.login(params).then(function(res){
          if(res.data.Code ==3){
              window.localStorage.setItem('user',JSON.stringify(res.data.Data));
              that.$store.dispatch("changeUser",res.data.Data);
              that.$router.push('/home');
              let roles=res.data.Data.Flag;
              if (roles == 4) {
                  roles = ['superman', 'admin'];
              } else if (roles == 3) {
                  roles = ['admin'];
              } else if (roles == 2) {
                  roles = ['checker'];
              } else if (roles == 1) {
                  roles = ['teacher'];
              } else {
                  roles = ['user']
              }

              that.$store.dispatch('generateRoutes', {
                  roles
              })
          }
          else{
            alert(res.data.Msg);
          }
      }).catch(function(err){
          console.log(err);
      });
    },
  },
}
</script>
<style scoped>
  .login_border{
    width:500px;
    height:300px;
    margin:0 auto;
    margin-top:10%;
    border:1px solid #ececec;
  }

  .login_border h3{
    color:#d1201d;
    margin-bottom:50px;
  }

  .login_border .row{
    margin-top:20px;
  }

  .login_border .text_5{
    margin-top:20px;
  }

  .login_border .row  input[type=submit]{
    background-color:#d1201d;
    color:#fff;
    border:1px solid transparent;
    width:100%;
  }
</style>