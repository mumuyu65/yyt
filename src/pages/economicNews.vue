<template>
    <div id="page-wrapper" >
        <div id="page-inner" class="economics">
          <div v-show="!addNew">
              <div v-show="!modifyNew">
                  <ul class="list-inline">
                      <li><h3>资讯管理</h3></li>
                      <li class="pull-right" style="margin-top:15px;">
                          <button @click="addNewEconomics()"
                              style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                              <i class="fa fa-plus fa-1x"></i>新增资讯
                          </button>
                      </li>
                  </ul>
                  <hr/>
                  <table class="text-center" border="1" width="100%" id="productsTable">
                    <thead>
                        <th  class="text-center">序列号</th>
                        <th  class="text-center">资讯类型</th>
                        <th  class="text-center">资讯标题</th>
                        <th  class="text-center">资讯图片</th>
                        <th  class="text-center">资讯内容</th>
                        <th  class="text-center">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in newsLists">
                          <td>{{index+1}}</td>
                          <td>{{item.type}}</td>
                          <td>{{item.title}}</td>
                          <td><img v-bind:src="item.imgurl" style="height:50px;"/></td>
                          <td>{{item.content}}</td>
                          <td>
                            <button class="btn btn-primary" @click="modifyNews(item)">修改</button>
                            <button class="btn btn-danger" @click="delNew(item,index)">删除</button>
                          </td>
                        </tr>
                    </tbody>
                </table>
              </div>
          </div>
          <!-- 添加 -->
          <div style="width:700px; margin:0 auto; margin-top:50px;" v-show="addNew">
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯类型：
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <select v-model="Type" class="form-control">
                          <option v-for="option in newsType" v-bind:value="option.type">
                                  {{ option.text }}
                          </option>
                      </select>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯标题：
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <input type="text" class="form-control" v-model="title"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      上传图片:
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <ul class="list-inline">
                          <li><img v-bind:src="Img" class="profile"/></li>
                          <li style="position:relative;">
                            <input type="file" @change="onFileChange" ref="uploadimg" value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传图片
                            </button>
                          </li>
                      </ul>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯内容:
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <textarea cols='40' rows='10' class="form-control" v-model='content'></textarea>
                      <div style="margin-top:20px;">
                              <button class="btn btn-danger" @click="addNews()">提交</button>
                              <button class="btn btn-default pull-right" @click="Cancel()">取消</button>
                      </div>
                  </div>
              </div>
          </div>
          <!-- 修改 -->
          <div style="width:700px; margin:0 auto; margin-top:50px;" v-show="modifyNew">
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯类型：
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <select v-model="modifyType" class="form-control">
                          <option v-for="option in newsType" v-bind:value="newsType.type">
                                  {{ option.text }}
                          </option>
                      </select>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯标题：
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <input type="text" class="form-control" v-model="Title"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯图片:
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <img v-bind:src="modifyImg"/>
                      <input type="file" @change="modifyFileChange" ref="uploadmodify" value="上传图片"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯内容:
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <textarea cols='40' rows='10' class="form-control" v-model='Content'></textarea>
                      <div style="margin-top:20px;">
                              <button class="btn btn-danger" @click="modifyItem()">提交</button>
                              <button class="btn btn-default pull-right" @click="modifyCancel()">取消</button>
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
  name: 'economicNews',
  data(){
    return{
      Sid:'',
      newsLists:[],
      newsType:[],
      addNew:false,
      modifyNew:false,
      Type:'',
      Img:'',
      title:'',
      content:'',

      modifyImg:'',
      modifyType:'',
      Title:'',
      Content:'',
      modifyId:'',
    }
  },
  mounted(){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{
    initData(){
      let that = this;
      api.newsType().then(function(res){
            if(res.data.Code ==3){
                that.newsType = res.data.Data;
                that.queryNews();
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //新增资讯
    addNewEconomics(){
        this.addNew = ! this.addNew;
    },

    addNews(){
      let input = this.$refs.uploadimg;

      let data = new FormData();

      data.append('sid',this.Sid);
      data.append('type',this.Type);
      data.append('title',this.title);
      data.append('img',input.files[0]);
      data.append('content',this.content);

      let that = this;

      axios.post(env.baseUrl+'/cycj/news/add', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
      .then(function (res) {
        alert(res.data.Msg);
        if(res.data.Code ==3){
          that.addNew = !that.addNew;
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
           return;
           this.createImage(files[0]);
     },

    createImage(file) {
      var reader = new FileReader();
      var that = this;

      reader.onload = (e) => {
        that.Img = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    modifyNews(item){
      console.log(item);
      this.modifyNew = ! this.modifyNew;
      this.modifyType = item.type;
      this.Title = item.title;
      this.modifyImg = item.imgurl;
      this.Content = item.content;
      this.modifyId = item.id;
    },

    modifyItem(){
      let input = this.$refs.uploadmodify;

      let data = new FormData();

      data.append('sid',this.Sid);
      data.append('id',this.modifyId);
      data.append('type',2);
      data.append('title',this.Title);
      data.append('img',input.files[0]);
      data.append('content',this.Content);

      let that = this;

      console.log(this.Sid,this.modifyId,this.modifyType,this.Title);

      axios.post(env.baseUrl+'/cycj/news/modify', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
      .then(function (res) {
        alert(res.data.Msg);
        if(res.data.Code ==3){
          that.modifyNew = !that.modifyNew;
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    modifyFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
           return;
           this.modifyImage(files[0]);
     },

    modifyImage(file) {
      var reader = new FileReader();
      var that = this;

      reader.onload = (e) => {
        that.modifyImg = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    //查询
    queryNews(){
      let params={
          begidx:0,
          counts:100,
          type:2,
        };

      let that = this;
      api.queryNews(params).then(function(res){
          if(res.data.Code ==3){
            if(res.data.Code ==3){
              that.newsLists = res.data.Data.Detail;
            }
          }
      });
    },

    //时间转换
    add(m) {
         return m<10?'0'+m:m
    },
    time(tm) {
         //获取一个事件戳
         var time = new Date(tm);
         //获取年份信息
         var y = time.getFullYear();
         //获取月份信息，月份是从0开始的
         var m = time.getMonth()+1;
         //获取天数信息
         //获取天数信息
         var d = time.getDate();

         var H=time.getHours();

         var M=time.getMinutes();
         //返回拼接信息
         return y+'-'+this.add(m) + '-' + this.add(d)+'&nbsp;&nbsp;'+this.add(H)+":"+this.add(M);
    },

    delNew(item,idx){
      let params={
        sid:this.Sid,
        id:item.id
      };

      let that = this;
      api.delNews(params).then(function(res){
          alert(res.data.Msg);
          if(res.data.Code ==3){
              that.modifyNew = ! that.modifyNew;
              that.newsLists.splice(idx,1);
          }
      }).catch(function(err){
          console.log(err);
      });
    },

    modifyCancel(){
      this.modifyNew = ! this.modifyNew;
    },

    Cancel(){
        this.addNew = ! this.addNew;
    }

  }
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

   #productsTable th,#productsTable td{
        padding:5px 0;
        border:1px solid #ececec;
   }

    #productsTable tr:hover{
        background-color:#f7f7f7;
    }

   #productsTable tr:nth-child(odd){
        background-color:#f7f7f7;
   }
</style>
