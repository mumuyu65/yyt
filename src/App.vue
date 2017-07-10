<template>
  <div id="app">
    <div class="login_border">
          <div class="text_1">
              <p>登 录</p>
          </div>
          <div class="text_2">
              <input type="text" name="account" placeholder="输入用户名" v-model="user.name" required/>
          </div>
          <div class="text_3">
              <input type="password" name="pwd" placeholder="输入密码" v-model="user.pwd" required/>
          </div>
          <div class="text_5">
              <input type="submit" value="登   录" @click="doLogin()"/>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'login',
  data (){
    return {
      user:{
        name:'18516074685',
        pwd:'yu123456',
      },
    }
  },
  methods: {
    doLogin() {
      console.log(this.user);

      this.$router.push('/home/index');
    }
  },

}


</script>



<style scoped>

</style>
