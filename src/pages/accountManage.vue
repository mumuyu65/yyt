<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div v-show='!User'>
                <div v-show="!modifyUser" >
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
                <div id="account_pagnation" class="text-center"></div>
                <table id="userTable" class="text-center" width="100%" border="1" >
                    <thead>
                        <th class="text-center">序列号</th>
                        <th class="text-center">用户名</th>
                        <th class="text-center">用户昵称</th>
                        <th class="text-center">用户角色</th>
                        <th class="text-center">用户头像</th>
                        <th class="text-center" style="max-width:200px">用户简介</th>
                        <th class="text-center">用户等级</th>
                        <th class="text-center">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in userlists">
                            <td>{{index +1}}</td>
                            <td>{{item.account}}</td>
                            <td>{{item.nick}}</td>
                            <td>{{item.flag | userLevel }}</td>
                            <td><img v-bind:src="item.headurl" alt="" style="height:50px;" v-if="item.headurl"/></td>
                            <td style="max-width:200px">{{item.intro}}</td>
                            <td>{{item.level}}</td>
                            <td>
                                <button class="btn btn-primary" @click="modifyuser(item)">修改</button>
                                <button class="btn btn-danger" @click="delUser(item,index)" v-if="item.flag!=4">删除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            <!-- 新增用户 -->
            <div style="margin:50px 20px;" v-show='User'>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>  角色选择：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <select v-model="selected">
                            <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        <span class="required">*</span> 手机号:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='number' value="" style="height:30px;" v-model="phone"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span> 密码:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type='password' value="" style="height:30px;" v-model="pwd"/>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="UserAdd()">提交</button>
                                <button style="margin-left:50px;" class="btn btn-default" @click="addCancel()">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 修改用户 -->
            <div style="margin:50px 20px;" v-show="modifyUser">
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
                          <li><img v-bind:src="user.img" id="file" class="profile img-circle" /></li>
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

import '../../static/pagnation/bootstrap-paginator.js'

export default {
  name: 'Home',
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
    this.checkLogin();
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
          { text: '老师', value: '1' },
          { text: '审核员', value: '2' },
          { text: '管理员', value: '3' }
        ],
        User:false,
        selected: '1',
        phone:'',
        pwd:'',

        BegIdx:0,
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
                case '5': return '水军'; break;
            }
        },
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
        let params={
            sid:that.Sid,
            begidx:0,
            counts:10,
            flag:-1,
        };
        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
                let TotalNum = res.data.Data.Total;
                let templateObj = res.data.Data.Detail;
                that.userlists= templateObj;
                //    分页
                if(TotalNum>10) {
                     var options = {
                         currentPage: 1,
                         totalPages: parseInt(TotalNum /10) + 1,
                         onPageClicked: function (e, originalEvent, type, page) {
                             switch (type) {
                                 case 'first':
                                     that.accountListQuery(0);
                                     break;
                                 case 'page':
                                     that.BegIdx = (page - 1) * 10;
                                     that.accountListQuery(that.BegIdx);
                                     break;
                                 case 'next':
                                     that.BegIdx  += 10;
                                     that.accountListQuery(that.BegIdx);
                                     break;
                                 case 'last':
                                     that.BegIdx = TotalNum - TotalNum % 10;
                                     that.accountListQuery(that.BegIdx);
                                     break;
                                 case 'prev':
                                     that.BegIdx -= 10;
                                     that.accountListQuery(that.BegIdx);
                                     break;
                             }
                         }
                     };
                     $('#account_pagnation').bootstrapPaginator(options);
                }
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    accountListQuery(idx){
        let params={
            sid:this.Sid,
            begidx:idx,
            counts:10,
            flag:-1,
        };

        let that = this;

        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
                console.log(res.data);
                that.userlists=res.data.Data.Detail;
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //新增用户
    addUser(){
        this.User = !this.User;
    },

    UserAdd(){
        let params={
            sid:this.Sid,
            phone:this.phone,
            pwd:this.pwd,
            flag:this.selected,
        };

        let that = this;

        api.addUser(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
              that.User = !that.User;
              that.initData();
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    addCancel(){
        this.User = !this.User;
    },


    //删除用户
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
        data.append('sid',this.Sid);
        data.append('uid',user.id);
        data.append('nick',this.user.nick);
        data.append('img', input.files[0]);
        data.append('intro',this.user.intro);

        let that = this;

        axios.post(env.baseUrl+'/yyt/admin/modifyuser', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
            alert(res.data.Msg);
          if(res.data.Code ==3){
              that.modifyUser = ! that.modifyUser;
              that.initData();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
         this.initData();
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

    hr{
      margin:10px 0;
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
