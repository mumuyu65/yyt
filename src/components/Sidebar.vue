<template>
   <div class="sidebar">
        <div class="text-center user-logo">
            <a href="javascript:void(0)">
                <img src="../../static/images/course_t.png" alt="" class="img-circle" />
            </a>
        </div>
        <ul class="list-unstyled">
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/" exact >
                    <img src="../../static/images/kechengzhongxin-icon.png"  alt="">
                    <h6>资讯</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
              <router-link to="/study" exact>
                <img src="../../static/images/pencil.png" alt="">
                <h6>学习</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/predict" exact>
                    <img src="../../static/images/zhuanjia-icon.png" alt="">
                    <h6>预测</h6>
                </router-link>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <router-link to="/transactions" exact>
                <img src="../../static/images/calendar-icon.png" alt="">
                <h6>财经日历</h6></router-link></li>
            <div class="divider"></div>
            <li class="text-center">
            <router-link to="/hangqing" exact>
                <img src="../../static/images/hangqing.png" alt="">
                <h6>行情</h6></router-link></li>
            <div class="divider"></div>
            <li class="text-center">
              <router-link to="/smallgame" exact>
                  <img src="../../static/images/youxi-icon.png" alt="">
                  <h6>小游戏</h6>
              </router-link>
            </li>
            <li class="text-center">
            <router-link to="/classes" exact >
                <img src="../../static/images/jinrong-icon.png" alt="">
                <h6>课程安排</h6></router-link></li>
            <div class="divider"></div>
            <li class="text-center">
                <a onclick="alert('开发中.....')" style="cursor:pointer">
                    <img src="../../static/images/kaihu.png"  alt="">
                    <h6>介绍</h6>
                </a>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <a onclick="alert('开发中.....')" style="cursor:pointer">
                    <img src="../../static/images/xiazai.png"  alt="">
                    <h6>战队</h6>
                </a>
            </li>
            <div class="divider"></div>
            <li class="text-center">
                <a onclick="alert('开发中.....')" style="cursor:pointer">
                    <img src="../../static/images/mobile.png"  alt="">
                    <h6>建仓提醒</h6>
                </a>
            </li>
            <div class="divider"></div>
        </ul>
        <div class="sidebar-divider"></div>
         <!--登录和注册部分-->
        <login></login>
    </div>
</template>

<script>
import Login from '@/pages/login'

import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  components: { Login },
  mounted (){
    this.init();
  },
  computed: mapGetters({
      user: 'getUser',
  }),
  methods:{
    init (){
      if(window.localStorage.getItem("user")){
        if (this.user.Beans.length > 7) {
            this.user.Beans = parseInt(this.user.Beans) % 10000 + '万';
        }
        this.$store.dispatch('changeUser',JSON.parse(window.localStorage.getItem("user")));
     }
    },
  }
}
</script>

<style scoped>

.router-link-active{
   background-color:#d1201d;
   text-decoration:none;
}

</style>
