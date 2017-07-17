<template>
  <nav class="navbar-side" role="navigation">
      <div class="sidebar-collapse">
          <ul class="nav" id="main-menu">
              <li class="text-center">
                    <h5 style="color:#fff;">余洋洋</h5>
              </li>
              <li>
                  <router-link to="/home" exact><i class="fa fa-dashboard fa-2x"></i> 账号管理</router-link>
              </li>
              <li>
                  <router-link to="/settings" exact><i class="fa fa-user fa-2x"></i>个人中心</router-link>
              </li>
              <li>
                  <router-link to="/zhibomanage" exact><i class="fa fa-file-video-o fa-2x"></i>直播管理</router-link>
              </li>
              <li>
                  <a @click="toggleStudy()" style="cursor:pointer;"><i class="fa fa-book fa-2x"></i>学习课件<span class="fa arrow"></span></a>
                  <ul class="nav nav-second-level collapse" v-bind:class="{'in':studyManagement}">
                      <li>
                          <router-link  to="/classes" exact>基础课件</router-link>
                      </li>
                      <li>
                          <router-link  to="/classes" exact>高级课件</router-link>
                      </li>
                      <li>
                          <router-link  to="/classes" exact>讲师风采</router-link>
                      </li>
                  </ul>
              </li>
              <li>
                  <router-link to="/handlesuggestion"><i class="fa fa-sitemap fa-2x"></i>操作建议</router-link>
                </li>
                <li>
                  <a @click="toggleSuggestion()" style="cursor:pointer;"><i class="fa fa-comments fa-2x"></i>老师点评<span class="fa arrow"></span></a>
                  <ul class="nav nav-second-level collapse" v-bind:class="{'in':suggestionManagement}">
                      <li>
                          <a href="#" exact>早晚评</a>
                      </li>
                      <li>
                          <a href="#" exact>果蔬预测</a>
                      </li>
                  </ul>
                </li>
              <li>
                <router-link to="/economicNews" exact><i class="fa fa-hacker-news fa-2x"></i>新闻资讯</router-link>
              </li>
              <li>
                  <a  href="tab-panel.html" exact><i class="fa fa-table fa-2x" ></i>课程安排</a>
              </li>
              <li>
                  <a  href="chart.html" exact><i class="fa  fa-qrcode fa-2x"></i>微信二维码</a>
              </li>
              <li>
                  <a  href="table.html" exact><i class="fa fa-codepen fa-2x"></i>产品介绍</a>
              </li>
              <li>
                  <a  href="form.html" exact><i class="fa fa-download fa-2x"></i> 下载中心 </a>
              </li>
              <li>
                  <a href="registeration.html" exact><i class="fa fa-bullhorn fa-2x"></i> 活动专区</a>
              </li>
              <li>
                  <a href="registeration.html" exact><i class="fa fa-coffee fa-2x"></i> 兑奖记录</a>
              </li>
                <li>
                  <a  href="blank.html"><i class="fa fa-qq fa-2x"></i>qq号码管理</a>
              </li>
               <li>
                  <a  href="blank.html"><i class="fa fa-joomla fa-2x"></i>果蔬产品</a>
              </li>
               <li>
                  <a  href="blank.html"><i class="fa fa-file-image-o fa-2x"></i>聊天室图片管理</a>
              </li>
              <li>
                  <a  href="blank.html"><i class="fa fa-square-o fa-2x"></i>用户等级图标管理</a>
              </li>
          </ul>
      </div>
  </nav>
</template>

<script>
export default {
  name:'Sidebar',
  data (){
    return {
      studyManagement:false,
      suggestionManagement:false,
    }
  },
  methods:{
    toggleStudy(){
      this.studyManagement = ! this.studyManagement;
    },

    toggleSuggestion(){
      this.suggestionManagement = ! this.suggestionManagement;
    },
  }
}
</script>
<style scoped>
  .router-link-active{
    background-color:#C90000 !important;
  }
</style>
