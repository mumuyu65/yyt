<template>
  <div class="header">
        <ul class="list-inline" style="display:inline-block;">
            <li><router-link to="/"><img src="../../static/images/chuangyinglogo.png" class="logo" style="width:117px; margin:2px -20px;" /></router-link></li>
            <li><router-link to="/"><h4>商城</h4></router-link></li>
            <li><h4>昵称：小羽</h4></li>
            <li><h4>等级:LV4</h4></li>
        </ul>
        <ul class="list-inline pull-right" style="display:inline-block;">
            <li style="margin-right:30px;">
                <a href="javascript:void(0)" @click="AddFavorite()">
                    <img src="../../static/images/desktop.png" alt="" />
                    <h4>保存到桌面</h4>
                </a>
            </li>
            <li><a href=""><img src="../../static/images/mobile.png" alt="" /><h4>手机直播</h4></a></li>
            <li><a href=""><img src="../../static/images/kaihu.png" alt="" /><h4>开户</h4></a></li>
            <li><a style="cursor:pointer;" data-toggle="modal" data-target="#loginModal"><h4>登录 | 注册</h4></a></li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    AddFavorite (){
        let url = window.location || 'http://www.miqilive.com';
        let title = document.title;
        let ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("360se") > -1) {
            alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
        } else if (ua.indexOf("msie 8") > -1) {
            window.external.AddToFavoritesBar(url, title); //IE8
        } else if (document.all) {
            try {
                window.external.addFavorite(url, title);
            } catch (e) {
                alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
            }
        } else if (window.sidebar) {
            window.sidebar.addPanel(title, url, "");
        } else {
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    }
  }
}
</script>

<style scoped>
</style>
