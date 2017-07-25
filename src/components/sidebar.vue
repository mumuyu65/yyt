<template>
  <nav class="navbar-side" role="navigation">
      <div class="sidebar-collapse">
        <div id="main-menu" >
            <sidebar-item :routes="getItems "></sidebar-item>
        </div>
      </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

import SidebarItem from './SidebarItem';

export default {
  name:'Sidebar',
  data (){
    return {
      studyManagement:false,
      suggestionManagement:false,
      gameManagement:false,
    }
  },
  components: { SidebarItem },
  computed: {
      ...mapGetters([
        'getItems'
      ])
  },
  methods:{
    toggleStudy(){
      this.studyManagement = ! this.studyManagement;
    },

    toggleSuggestion(){
      this.suggestionManagement = ! this.suggestionManagement;
    },

    toggleGame(){
      this.gameManagement = ! this.gameManagement;
    },
  }
}
</script>

