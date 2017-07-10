<template>
  <nav class="navbar-default navbar-side" role="navigation">
      <div class="sidebar-collapse">
          <ul class="nav" id="main-menu">
              <li>
                  <router-link class="active-menu"  to="/home" exact><i class="fa fa-dashboard fa-2x"></i> 账号管理</router-link>
              </li>
               <li>
                  <router-link  to="/classes" exact><i class="fa fa-desktop fa-2x" ></i>学习课件</router-link>
              </li>
              <li>
                  <a  href="tab-panel.html" exact><i class="fa fa-table fa-2x" ></i>课程安排</a>
              </li>
              <li>
                  <a  href="chart.html" exact><i class="fa  fa-qrcode fa-2x"></i>微信二维码</a>
              </li>
              <li>
                  <a  href="table.html" exact><i class="fa fa-bar-chart-o fa-2x"></i>产品介绍</a>
              </li>
              <li>
                  <a  href="form.html" exact><i class="fa fa-edit fa-2x"></i> 下载中心 </a>
              </li>
              <li>
                  <a href="#"><i class="fa fa-bolt fa-2x"></i>直播管理<span class="fa arrow"></span></a>
                  <ul class="nav nav-second-level">
                      <li>
                          <a href="#" exact>大厅直播</a>
                      </li>
                      <li>
                          <a href="#" exact>战队直播</a>
                      </li>
                  </ul>
              </li>
              <li>
                  <a href="registeration.html" exact><i class="fa fa-laptop fa-2x"></i> 活动专区</a>
              </li>
              <li>
                  <a href="registeration.html" exact><i class="fa fa-laptop fa-2x"></i> 兑奖记录</a>
              </li>
              <li>
                  <a href="#"><i class="fa fa-sitemap fa-2x"></i>操作建议<span class="fa arrow"></span></a>
                  <ul class="nav nav-second-level">
                      <li>
                          <a href="#" exact>建仓提醒</a>
                      </li>
                      <li>
                          <a href="#" exact>平仓提醒</a>
                      </li>
                  </ul>
                </li>
              <li>
                  <a href="#"><i class="fa fa-sitemap fa-2x"></i>老师点评<span class="fa arrow"></span></a>
                  <ul class="nav nav-second-level">
                      <li>
                          <a href="#" exact>早晚评</a>
                      </li>
                      <li>
                          <a href="#" exact>果蔬预测</a>
                      </li>
                  </ul>
                </li>
                <li>
                  <a  href="blank.html"><i class="fa fa-square-o fa-2x"></i>qq号码管理</a>
              </li>
               <li>
                  <a  href="blank.html"><i class="fa fa-square-o fa-2x"></i>果蔬产品</a>
              </li>
               <li>
                  <a  href="blank.html"><i class="fa fa-square-o fa-2x"></i>聊天室图片管理</a>
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
  methods:{

  }
}
</script>
<style scoped>

</style>