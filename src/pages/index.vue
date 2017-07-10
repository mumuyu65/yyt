<template>
  <div class="main">
    <cy-header></cy-header>
    <side-bar></side-bar>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import CyHeader from '@/components/header'

import SideBar from '@/components/sidebar'

export default {
  name: 'Index',
  components:{ CyHeader,SideBar }
}
</script>
