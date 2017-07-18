<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div v-show="!modifyUser">
                <ul class="list-inline">
                    <li><h3>账号管理</h3></li>
                    <li class="pull-right" style="margin-top:15px;">
                        <button @click="addUser()"
                            style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                            <i class="fa fa-plus fa-1x"></i>新增用户
                        </button>
                    </li>
                </ul>
                <hr/>
                <table id="userTable" class="text-center" width="100%" border="1" >
                    <thead>
                        <th  class="text-center">序列号</th>
                        <th  class="text-center">用户名</th>
                        <th  class="text-center">用户昵称</th>
                        <th  class="text-center">用户角色</th>
                        <th  class="text-center">用户头像</th>
                        <th  class="text-center">用户简介</th>
                        <th  class="text-center">用户等级</th>
                        <th  class="text-center">开启或关闭</th>
                        <th  class="text-center">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in userlists">
                            <td>{{index +1}}</td>
                            <td>{{item.account}}</td>
                            <td>{{item.nick}}</td>
                            <td>{{item.flag | userLevel }}</td>
                            <td><img v-bind:src="item.headurl" alt="用户头像" style="height:50px;"/></td>
                            <td>{{item.intro}}</td>
                            <td>{{item.level}}</td>
                            <td>
                                <button class="btn" v-bind:class="{'btn-primary':item.active,'btn-danger':!item.active}">{{item.active | checkStatus }}</button></span>
                            </td>
                            <td>
                                <button class="btn btn-primary" @click="modifyuser(item)">修改</button>
                                <button class="btn btn-danger" @click="delUser(item,index)">删除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 修改用户 -->
            <div style="width:700px;margin:0 auto; margin-top:50px;" v-show="modifyUser">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>用户账户：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type='text' value="" style="height:30px;" v-model="user.account" disabled/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        <span class="required">*</span> 用户昵称:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='text' value="" style="height:30px;" v-model="user.nick"/>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        <span class="required">*</span> 用户角色:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <select v-model="user.flag" disabled>
                            <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>头像:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                         <ul class="list-inline">
                          <li><img v-bind:src="user.img" id="file" class="profile img-circle"/></li>
                          <li style="position:relative;">
                            <input type="file" @change="onFileChange" ref="upload" value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传图片
                            </button>
                          </li>
                      </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        简介:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <textarea cols='40' rows='10' class="form-control" v-model="user.intro"></textarea>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="submitModify(user)">提交</button>
                                <button class="btn btn-default pull-right" @click="Cancel()">取消</button>
                        </div>
                    </div>
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
  name: 'Home',
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  data (){
    return {
        Sid:'',
        userlists:[],
        modifyUser:false,
        user:{
            account:'',
            nick:'',
            img:'',
            intro:'',
            flag:'',
        },
        Uid:'',
        options: [
          { text: '普通用户', value: '0' },
          { text: '老师', value: '1' },
          { text: '审核员', value: '2' },
          { text: '管理员', value: '3' }
        ],

    }
  },
  filters:{
        userLevel:function(value){
            switch(value){
                case '0': return '普通用户'; break;
                case '1': return '老师'; break;
                case '2': return '审核员'; break;
                case '3': return '管理员'; break;
                case '4': return '超级管理员'; break;
            }
        },

        checkStatus:function(value){
               switch(value) {
                   case '0': return '关闭'; break;
                   case '1': return '开启'; break;
               }
           },
  },
  methods:{
    initData(){
        let that = this;
        let params={
            sid:that.Sid,
            begidx:0,
            counts:100,
            flag:-1,
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

    addUser(){
        this.$router.push('addUser');
    },

    delUser(item,idx){
        let params={
            sid:this.Sid,
            account:item.account
        };

        let that = this;

        api.delUser(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                that.userlists.splice(idx,1);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //修改用户信息
    modifyuser(item){
        this.modifyUser = ! this.modifyUser;
        this.user = item;
        this.user.img = item.headurl;
    },

    submitModify(user){
        let input = this.$refs.upload;
        let data = new FormData();
        console.log(input.files[0]);
        data.append('sid',this.Sid);
        data.append('uid',user.id);
        data.append('nick',this.user.nick);
        data.append('img', input.files[0]);
        data.append('intro',this.user.intro);

        let that = this;

        axios.post(env.baseUrl+'/cycj/admin/modifyuser', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
            alert(res.data.Msg);
          if(res.data.Code ==3){
              that.modifyUser = ! that.modifyUser;
              window.location.reload();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        /*
        api.modifyUser(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){

            }
        }).catch(function(err){
            console.log(err);
        });
        */
    },

    //上传图片
    onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
           return;
           this.createImage(files[0]);
    },

    createImage(file) {
          var image = new Image();
          var reader = new FileReader();
          var that = this;

          reader.onload = (e) => {
            that.user.img = e.target.result;
            //预览
            $("#file").attr("src",that.user.img);
          };
            reader.readAsDataURL(file);
    },

    Cancel(){
         this.modifyUser = ! this.modifyUser;
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

   .profile{
        height:100px;
   }
</style>
