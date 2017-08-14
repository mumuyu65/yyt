<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <ul class="list-inline">
                <li><h3>权限分配</h3></li>
                <li style=" vertical-align:middle">
                    <input type="number" class="form-control" placeholder="请输入用户手机号" v-model="account">
                </li>
                <li><button class="btn btn-primary" @click="qxLists()" style="margin-bottom:10px;">搜索</button></li>
            </ul>
            <hr/>
            <ul class="nav nav-tabs">
                <li role="presentation" @click="haveAuth()" style="cursor:pointer;"><a >已开通权限</a></li>
                <li role="presentation" class="active" @click="qxList()" style="cursor:pointer"><a>未开通权限</a></li>
            </ul>
            <table id="qxTable" class="text-center" width="100%" border="1" >
                <thead>
                    <th class="text-center">权限ID</th>
                    <th class="text-center">名称</th>
                    <th class="text-center">操作</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in authList">
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>
                            <button class="btn btn-danger" @click="changeState(item.id,item.uid,state)">{{state}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
  name: 'authorization',
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  data (){
    return {
        Sid:'',
        authList:[],
        account:'13545267410',
        state:'添加'
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
        this.haveAuth();
        this.authList = [];
    },
    qxList(){
        this.state = '添加';
        $('.nav-tabs li:last-of-type').addClass('active').siblings().removeClass('active');
        let that = this;
        let params={
            sid:that.Sid,
            account:this.account,
            flag:1
        };
        api.authQuery(params).then(function(res){
            if(res.data.Code == 3){
                that.authList = res.data.Data;
            }else{
                alert(res.data.Msg)
            }
        }).catch(function(err){
            console.log(err);
        });
    },
    haveAuth(){
        this.state = '移除';
        $('.nav-tabs li:first-of-type').addClass('active').siblings().removeClass('active');
        let that = this;
        let params={
            sid:that.Sid,
            account:this.account,
            flag:0
        };
        api.authQuery(params).then(function(res){
            if(res.data.Code == 3){
                that.authList = res.data.Data;
            }else{
                alert(res.data.Msg)
            }
        }).catch(function(err){
            console.log(err);
        });
    },
    changeState(aid,uid,state){
        let aod = ''
        if(state == '移除'){
            aod = 1;
        }else{
            aod = 0;
        }
        let that = this;
        let params={
            sid:that.Sid,
            aid:aid,
            account:this.account,
            uid:uid,
            aod:aod
        };
        api.authUser(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code == 3){
                that.qxList();
            }
        }).catch(function(err){
            console.log(err);
        });
    }
  },
}
</script>

<style scoped lang="scss">
    #page-inner{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }
    #qxTable th,#qxTable td{
        padding:10px 0;
        border:1px solid #ececec;
   }

    #qxTable tr:hover{
        background-color:#f7f7f7;
    }

   #qxTable tr:nth-child(odd){
        background-color:#f7f7f7;
   }
</style>
