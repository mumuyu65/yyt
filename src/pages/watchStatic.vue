<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <ul class="list-inline">
                <li><h3>用户管理/观看时间</h3></li>
            </ul>
            <hr/>
            <div id="main" style="height:500px;"></div>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import axios from 'axios'

import env from '@/config/env'

import Echarts from '../../static/echarts/echarts.min.js';

export default {
  name: 'watchStatic',
  data (){
    return {
        Sid:'',
        dateSelects:[
          {id:1,type:0,value:'年',active:false},{id:2,type:1,value:'月',active:false},{id:3,type:2,value:'日',active:false}],
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;

    //this.checkLogin();

    this.queryLive();   //查询直播间
  },
  methods:{
    checkLogin(){
      let obj={
        sid:this.Sid
      };

      axios.get(env.baseUrl+'/yyt/check', {params:obj})
        .then(function (res) {
          if(res.data.Code ==6){
            alert(res.data.Msg);
            window.location.replace("/");
          }
        })
      .catch(function (err) {
        console.log(err);
      });
    },

    //查询直播间
    queryLive(){
      let that = this;

      let param = {
          begidx:0,
          counts:100
      }

      api.getLive(param).then(function(res){
            if(res.data.Code ==3){
                if(res.data.Data.length == 0){
                    console.log('没有直播房间!');
                }else{
                    that.liveList = res.data.Data;

                    that.showEcharts(that.dateSelects[2],that.liveList[0]);
                }
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });

    },


    showEcharts(eDate,eLive){

    },


  },
}
</script>

<style scoped>

</style>
