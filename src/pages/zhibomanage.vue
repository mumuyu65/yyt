<template>
   <div id="page-wrapper">
       <div id="page-inner" class="zhibo">
            zhibomanage.......
        </div>
   </div>
</template>

<script>
  import API from '@/api/API'
  const api = new API()

  export default {
    name: 'ZhiboManage',
    mounted(){
      this.initData()
    },
    methods: {
      initData() {
        console.log('zhibomanage.....')
      }
    }
  }
</script>

<style scoped lang="scss">
    .zhibo input,.zhibo select{
        width:auto;
        height:30px;
        padding-left:5px;
        outline:none;
        border:1px solid #ececec;
    }
</style>
