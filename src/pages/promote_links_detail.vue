<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <ul class="list-inline">
                <li><h3>推广链接详情</h3></li>
                <li class="pull-right" style="margin-top:15px;">
                <router-link to="/promotelinks"
                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                    返回
                </router-link>
            </li>
            </ul>
            <hr/>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
// 实例化api
const api = new API();

import axios from 'axios'

import env from '@/config/env'

export default {
    name: 'promote-links-details',
    data() {
        return {
            Sid: '',

        }
    },
    mounted() {
        this.Sid = JSON.parse(window.localStorage.getItem('user')).SessionId;
        //this.checkLogin();

        this.initData();
    },
    methods: {
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

        //查询推广人员列表
        initData(){
            let that = this;
        },
    }
}
</script>

<style >
  .required{
    color:#f00;
  }

  #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }
</style>
