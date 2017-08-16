<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
    mounted(){
        let total_height = parseInt(window.innerHeight);

        $("#page-wrapper").height(total_height-60);

        $("#main-menu").height(total_height-60);

    }
}
</script>
