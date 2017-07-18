<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <ul class="list-inline">
              <li><h3>奖品商城</h3></li>
          </ul>
          <hr/>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import axios from 'axios'

import env from '@/config/env'

export default {
  name: 'prizemall',
  data (){
    return {
        Sid:'',
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
  },
  methods:{

  },
}
</script>

<style scoped>
   #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }

    .required{
        color:#e60000;
        margin-right:5px;
    }

</style>
