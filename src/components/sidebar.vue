<template>
  <nav class="navbar-side" role="navigation">
      <div class="sidebar-collapse">
          <ul class="nav"  id="main-menu">
            <li class="text-center">
                  <h5 style="color:#fff;">{{nick}}</h5>
            </li>
            <li v-for="item in routes">
              <router-link :to="item.path" style="cursor:pointer;" v-if="item.path!== '/comment' && item.path!== '/classes' && item.path!== '/smallgame' " exact>
                <i v-bind:class="item.icon"></i>{{item.name}} <span class="fa arrow" v-if="!item.noDropdown"></span>
              </router-link>
              <a @click="changeState(item)" v-else style="cursor:pointer;">
                <i v-bind:class="item.icon"></i>{{item.name}}
              </a>
              <ul class="nav nav-second-level collapse" v-if="item.children" v-bind:class="{'in':!item.noDropdown}">
                  <li v-for="subItem in item.children">
                      <router-link  :to="subItem.path" exact>{{subItem.name}}</router-link>
                  </li>
              </ul>
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
        nick:'',
        routes:'',
    }
  },
  mounted(){
    let user = JSON.parse(window.localStorage.getItem('user'));
    this.nick = user.Nick;
    this.routes = JSON.parse(window.localStorage.getItem("routes"));
  },
  methods:{
    changeState(item){
       item.noDropdown = !item.noDropdown ;
    }
  }
}
</script>
<style scoped>
  .router-link-active{
    background-color:#C90000 !important;
  }
</style>

