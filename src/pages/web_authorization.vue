<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <ul class="list-inline">
              <li><h3>功能开通</h3></li>
              <li style=" vertical-align:middle">
                    <input type="number" class="form-control" placeholder="请输入用户手机号" @keyup.enter="initData()" v-model="account">
              </li>
              <li><button class="btn btn-primary" @click="initData()" style="margin-bottom:10px;">搜索</button></li>
          </ul>
          <hr/>
          <div style="margin:0 auto; padding:20px;">
            <table id="userTable" class="text-center" width="100%" border="1" >
                <thead>
                    <th class="text-center">名称</th>
                    <th class="text-center">直播间</th>
                    <th class="text-center">开通时间设置</th>
                </thead>
                <tbody>
                    <tr>
                      <td>核心内参</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>讲师观点</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>学习课件</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>股市收评</td>
                      <td></td>
                      <td></td>
                    </tr>
                </tbody>
            </table>
          </div>
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
  name: 'web-authorization',
  data (){
    return {
        Sid:'',
        clan:{},
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
    //this.checkLogin();
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
    initData(){
      let that = this;
      api.ClanQuery().then(function(res){
        if(res.data.Code ==3){
             let templateObj= res.data.Data;
             that.clan= templateObj[0];
        }
      }).catch(function(err){
          console.log(err);
      });
    },


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

    #userTable th,#userTable td{
        padding:5px 0;
        border:1px solid #ececec;
    }

    #userTable tr:hover{
        background-color:#f7f7f7;
    }

   #userTable tr:nth-child(odd){
        background-color:#f7f7f7;
   }

</style>
