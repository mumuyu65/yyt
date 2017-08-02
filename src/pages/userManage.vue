<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div>
                <div>
                <ul class="list-inline">
                    <li><h3>用户管理</h3></li>
                </ul>
                <hr/>
                <table id="userTable" class="text-center" width="100%" border="1" >
                    <thead>
                        <th class="text-center">序列号</th>
                        <th class="text-center">用户名</th>
                        <th class="text-center">用户昵称</th>
                        <th class="text-center">用户头像</th>
                        <th class="text-center" style="max-width:200px">用户简介</th>
                        <th class="text-center">用户等级</th>
                        <th class="text-center">注册时间</th>
                        <th class="text-center">最后登录时间</th>
                        <th class="text-center">修改用户等级</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in userlists">
                            <td>{{index +1}}</td>
                            <td>{{item.account}}</td>
                            <td>{{item.nick}}</td>
                            <td><img v-bind:src="item.headurl" alt="用户头像" style="height:50px;"/></td>
                            <td style="max-width:200px">{{item.intro}}</td>
                            <td>{{item.level | userLevel}}</td>
                            <td>{{item.unix | unixTodate}}</td>
                            <td>{{item.login_unix | unixTodate}}</td>
                            <td>
                                <select v-model="selected" style="width:80px" @change="modifyLevel(item.id)">
                                    <option v-for="option in options">
                                        {{ option.text }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
  name: 'userManage',
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  data (){
    return {
        Sid:'',
        userlists:[],
        options: [
          { text: '会员', value: '0' },
          { text: '白银', value: '1' },
          { text: '黄金', value: '2' },
          { text: '铂金', value: '3' },
          { text: '钻石', value: '4' },
          { text: '大亨', value: '5' }
        ],
        User:false,
        selected:'',
    }
  },
  filters:{
        userLevel:function(value){
            switch(value){
                case '0': return '会员'; break;
                case '1': return '白银'; break;
                case '2': return '黄金'; break;
                case '3': return '铂金'; break;
                case '4': return '钻石'; break;
                case '5': return '大亨'; break;
            }
        },
        unixTodate(tm) {
            let time = new Date(tm*1000);
            let y = time.getFullYear();
            let m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
            let d = (time.getDate())<10?('0'+time.getDate()):time.getDate();
            let h = (time.getHours())<10?('0'+time.getHours()):time.getHours();
            let min = (time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
            return y+'-'+m+'-'+d+' '+h+':'+m;
        },
  },
  methods:{
    initData(){
        let that = this;
        let params={
            sid:that.Sid,
            begidx:0,
            counts:100,
            flag:0,
        };
        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
                that.userlists = res.data.Data.Detail;
                console.log(that.userlists);
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },
    modifyLevel(id){
        let that = this;
        let params={
            sid:that.Sid,
            uid:id,
            level:this.selected
        };
        console.log(params)
        api.modifyLevel(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code == 3){
                that.initData()
            }
        }).catch(function(err){
            console.log(err);
        });
    }
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

   .profile{
        height:100px;
   }
</style>
