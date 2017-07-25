<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();
export default {
  name: 'Smallgame',
}
</script>
