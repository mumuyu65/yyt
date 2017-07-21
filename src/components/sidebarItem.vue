<template>
  <ul class="nav" >
      <li class="text-center">
            <h5 style="color:#fff;">余洋洋</h5>
      </li>
      <li v-for="item in routes">
        <router-link v-if="item.name!=='退出'" v-bind:to="item.path" style="cursor:pointer;" exact><i v-bind:class="item.icon"></i>{{item.name}}</router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
  }
</script>
<style scoped>
  .router-link-active{
    background-color:#C90000 !important;
  }
</style>