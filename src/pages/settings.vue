<template>
<div id="page-wrapper" >
        <div id="page-inner">
            <div style="margin:0 auto; padding:20px;">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>用户昵称：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='text' value="" style="height:30px;" v-model="user.nick"/>
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
                            <input type="file" @change="onFileChange"  ref="upload" value="上传图片" style="position:absolute; opacity:0;"/>
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
                    </div>
                </div>
                <div style="margin-top:20px;" class="text-center">
                        <button class="btn btn-danger" @click="changeUser()">提交</button>
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

import { mapGetters } from 'vuex';

const endpoint = 'https://yingdedao.com:10022'

export default {
  name: 'Settings',
  data (){
    return {
        user:{
          nick:'',
          intro:'',
          img:'',
        },
        Sid:'',
    }
  },
  computed: {
    ...mapGetters({
      users:'getUser'
    })
  },
  mounted (){
    let user =JSON.parse(window.localStorage.getItem('user'));
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.user.nick = user.Nick;
    this.user.intro = user.Intro;
    this.initData(user.UserId);
  },
  methods:{
    //上传头像
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
            that.user.img =e.target.result;
            //预览
            $("#file").attr("src",that.user.img);
          };
          reader.readAsDataURL(file);
    },
    //提交
    changeUser(){
        let input = this.$refs.upload;
        let data = new FormData();
        data.append('file', input.files[0]);
        data.append('sid',this.Sid);
        data.append('nick',this.user.nick);
        data.append('intro',this.user.intro);
        let that = this;
        axios.post(env.baseUrl+'/cycj/userinfo/update', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
          alert(res.data.Msg);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 初始化
    initData(uid){
      this.user.img = endpoint+'/cycj/head/head'+uid;
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

    .profile{
      height:64px;
    }
</style>
