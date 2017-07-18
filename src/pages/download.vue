<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <h3>下载中心</h3>
          <hr/>
          <ul class="nav nav-tabs">
            <li v-bind:class="{'active':item.flag}" v-for="(item,index) in downloadItems">
              <a style="cursor:pointer;" @click="changeFlag(item,index)">{{item.value}}</a>
            </li>
          </ul>

          <div v-show="item.flag" class="tab-content" style="width:100%; overflow:hidden; margin-top:50px;" v-for="(item,index) in downloadItems">
              <div class="row">
                   <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>二维码图片:
                   </div>
                   <div class="col-sm-9 col-md-9 col-xs-6">
                         <ul class="list-inline">
                          <li><img v-bind:src="item.img" class="profile"/></li>
                          <li style="position:relative;">
                            <input type="file" @change="onImgChange"  value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传图片
                            </button>
                          </li>
                      </ul>
                    </div>
              </div>
              <div class="row" v-show="item.status">
                   <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>上传附件:
                   </div>
                   <div class="col-sm-9 col-md-9 col-xs-6">
                      <ul class="list-inline">
                          <li>{{item.file}}</li>
                          <li style="position:relative;">
                            <input type="file" @change="onFileChange" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传附件
                            </button>
                          </li>
                      </ul>
                   </div>
              </div>
              <div class="row">
                   <div class="col-sm-3 col-md-3 col-xs-6"></div>
                   <div class="col-sm-9 col-md-9 col-xs-6">
                        <div style="margin-top:20px;">
                          <button class="btn btn-danger" @click="upload(item)">提交</button>
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
  name: 'download',
  data (){
    return {
        Sid:'',
        downloadItems:[
          {value:'电脑端--行情',platform:0,flag:true,status:1,img:'',file:''},
          {value:'电脑端--实盘',platform:1,flag:false,status:1,img:'',file:''},
          {value:'安卓',platform:2,flag:false,status:0,img:'',file:''},
          {value:'ios',platform:3,flag:false,status:0,img:'',file:''}
        ],
        temPlatform:0,
        img:'',
        file:'',
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{
    onImgChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
           return;
           this.createImage(files[0]);
           this.img = files[0];
    },

    createImage(file) {
      var reader = new FileReader();
      var that = this;

      reader.onload = (e) => {
       that.downloadItems[that.temPlatform].img = e.target.result;
       }
      reader.readAsDataURL(file);
    },

    onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
           return;
           this.downloadItems[this.temPlatform].file = files[0].name;
           this.file = files[0];
    },

    initData(){
      let that = this;
      api.appQuery().then(function(res){
          console.log(res.data);
          if(res.data.Code ==3){
            let templateObj=res.data.Data;
            let len =templateObj.length;
            for(let i=0; i<len;i++){
              switch(templateObj[i].platform){
                case '0':  that.downloadItems[0].img = templateObj[i].imgurl;  that.downloadItems[0].file = templateObj[i].fileurl; break;
                case '1': that.downloadItems[1].img = templateObj[i].imgurl;  that.downloadItems[1].file = templateObj[i].fileurl; break;
                case '2': that.downloadItems[2].img = templateObj[i].imgurl;  that.downloadItems[2].file = templateObj[i].fileurl; break;
                case '3': that.downloadItems[3].img = templateObj[i].imgurl;  that.downloadItems[3].file = templateObj[i].fileurl; break;
              }
            }
          }
      }).catch(function(err){
          console.log(err);
      });
    },

    changeFlag(item){
      for(let i=0; i<4;i++){
        this.downloadItems[i].flag = false;
      }
      item.flag = true;
      this.temPlatform = item.platform;
    },
    //上传

    upload(){
       let data = new FormData();
       data.append('sid',this.Sid);
       data.append('img',this.img);
       data.append('file',this.file);
       data.append('platform',this.temPlatform);

       axios.post(env.baseUrl+'/cycj/app/add', data, {
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
</style>
