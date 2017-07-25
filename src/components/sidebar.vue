<template>
  <nav class="navbar-side" role="navigation">
      <div class="sidebar-collapse">
          <ul class="nav"  id="main-menu">
            <li class="text-center">
                  <h5 style="color:#fff;">余洋洋</h5>
            </li>
            <li v-for="item in routes">
              <router-link :to="item.path" style="cursor:pointer;" v-if="item.path" exact>
                <i v-bind:class="item.icon"></i>{{item.name}} <span class="fa arrow" v-if="!item.noDropdown"></span>
              </router-link>
              <a @click="changeState(item)" v-else style="cursor:pointer;">
                <i v-bind:class="item.icon"></i>{{item.name}} <span class="fa arrow" v-if="!item.noDropdown"></span>
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
import { mapGetters } from 'vuex';

export default {
  name:'Sidebar',
  data (){
    return {

    }
  },
  computed: {
      ...mapGetters({
        routes:'getRoutes'
      })
  },
  mounted(){
      console.log(this.routes);
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

