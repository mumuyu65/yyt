<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <div v-show="!modify">
            <ul class="list-inline">
                <li><h3>用户等级管理</h3></li>
                <li class="pull-right" style="margin-top:15px;">
                    <router-link to="/userlevel/add" ><button
                        style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                        <i class="fa fa-plus fa-1x"></i>新增等级
                    </button>
                    </router-link>
                </li>
            </ul>
            <hr/>
            <table id="productsTable" class="text-center" border="1" width="100%">
                <thead>
                    <th  class="text-center">编号</th>
                    <th  class="text-center">等级名称</th>
                    <th  class="text-center">等级图标</th>
                    <th  class="text-center">积分上限</th>
                    <th  class="text-center">积分下限</th>
                    <th  class="text-center">操作</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in userLevels">
                        <td>{{index +1}}</td>
                        <td>{{item.role_name}}</td>
                        <td><img v-bind:src="item.role_css" alt="用户图标"/></td>
                        <td>{{item.score_lower}}</td>
                        <td>{{item.score_upper}}</td>
                        <td>
                            <button class="btn btn-primary" @click="modifylevel(item)">修改</button>
                            <button class="btn btn-danger" @click="dellevel(item,index)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>

          <!-- 修改 -->
           <div style="width:700px; margin:0 auto; margin-top:50px;" v-show="modify">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        等级名称：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type='text' value="" class="form-control" v-model="level" disabled/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        等级图标:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <img v-bind:src="Img"/>
                        <input type="file" @change="onFileChange" ref="uploadimg" value="上传图片"/>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        积分上限:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type="number" class="form-control" v-model="score_lower"/>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        积分下限:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type="number" class="form-control" v-model="score_higher"/>
                    </div>
                </div>
                <div style="margin-top:20px;">
                    <button class="btn btn-danger" @click="modifyLevel()">提交</button>
                    <router-link to="/userlevel"><button class="btn btn-default pull-right">取消</button></router-link>
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
  name: 'userLevel',
  data (){
    return {
        Sid:'',
        userLevels:[],
        modify:false,
        level:'',
        Img:'',
        score_lower:'',
        score_higher:'',
        lid:'',
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{
    initData(){
      let that = this;
      api.queryUserLevel().then(function(res){
          //console.log(res.data);
          if(res.data.Code ==3){
            that.userLevels = res.data.Data;
          }
      }).catch(function(err){
          console.log(err);
      });
    },

    dellevel(item,idx){
      let params={
        sid:this.Sid,
        id:item.id
      };

      let that = this;
      api.delUserLevel(params).then(function(res){
          if(res.data.Code ==3){
            that.userLevels.splice(idx,1);
          }
          alert(res.data.Msg);
      }).catch(function(err){
          console.log(err);
      });
    },

    //修改
    modifylevel(item){
      console.log(item);
      this.modify = !this.modify;
      this.level = item.role_name;
      this.Img = item.role_css;
      this.score_lower = item.score_lower;
      this.score_higher = item.score_upper;
      this.lid = item.id;
    },

    onFileChange(e){
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    createImage(file) {
      let reader = new FileReader();
      let that = this;

      reader.onload = (e) => {
        that.Img = e.target.result;
      };
        reader.readAsDataURL(file);
    },

    modifyLevel(){
      let input = this.$refs.uploadimg;

      let data = new FormData();

      data.append('sid',this.Sid);
      data.append('id',this.lid);
      data.append('role_name',this.level);
      data.append('roleimg',input.files[0]);
      data.append('score_lower',this.score_lower);
      data.append('score_upper',this.score_higher);

      let that = this;
      axios.post(env.baseUrl+'/cycj/level/modify', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
            alert(res.data.Msg);
          if(res.data.Code ==3){
             that.modify = !that.modify;
             window.location.reload();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

  },
}
</script>

<style scoped>
   #productsTable th,#productsTable td{
        padding:5px 0;
        border:1px solid #ececec;
   }

   #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
   }
</style>
