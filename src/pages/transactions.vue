<template>
  <div class="main">
     <iframe id="fancybox-frame" style="width:1100px; height:907px; padding:20px;" name="fancybox-frame1498977255677"
                    frameborder="0" hspace="0" scrolling="auto"
                     src="http://www.jin10.com/example/jin10.com.html"></iframe>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'Transactions',
  data () {
    return {
        msg:'this is the transactions页面 !'
    }
  },
}
</script>

<style scoped>

</style>
