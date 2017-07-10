<template>
  <div id="app">
    <div class="login_border">
          <div class="text_1">
              <p>登 录</p>
          </div>
          <div class="text_2">
              <input type="text" name="account" placeholder="输入用户名" v-model="login.username" required/>
          </div>
          <div class="text_3">
              <input type="password" name="pwd" placeholder="输入密码" v-model="login.pwd" required/>
          </div>
          <div class="text_5">
              <input type="submit" value="登   录" @click="doLogin()"/>
          </div>
          <div class="text_6 pull-right">
              <a @click="changeLogin('register')">还没有账户？</a>
          </div>
      </div>
  </div>
</template>
