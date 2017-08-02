<template>
    <div id="page-wrapper" >
        <div id="page-inner" class="economics">
          <div v-show="!addNew" class="prizemall-box">
              <div v-show="!modifyNew">
                  <ul class="list-inline">
                      <li><h3>资讯管理</h3></li>
                      <li class="pull-right" style="margin-top:15px;">
                        <ol class="list-inline">
                          <li>搜索：</li>
                          <li><select v-model="searchId" class="form-control">
                              <option v-for="option in newsType" v-bind:value="option.type">
                                      {{ option.text }}
                              </option>
                          </select></li>
                          <li><button @click="addNewEconomics()"
                              style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                              <i class="fa fa-plus fa-1x"></i>新增资讯
                          </button></li>
                        </ol>
                      </li>
                  </ul>
                  <hr/>
                  <!-- 展示 -->
                  <div style="margin-top: 2rem; background-color:transparent" class="row">
                        <div class="col-md-6" v-for="(item,index) in newsLists">
                            <div class="prize-item" style="">
                              <div class="col-md-12" style="border-bottom: 1px solid #c0c0c0;">
                                  <div class="p-img col-md-6">
                                      <img class="thumbnail-image" v-bind:src="item.imgurl"  alt="奖品图片" style="height:100px;" />
                                  </div>
                                  <div class="p-info col-md-6" style="height:100px;">
                                      <h5>标题：{{item.title}}</h5>
                                      <span class="pull-left">资讯类型:{{item.typename }}</span>
                                      <p class="beans">{{item.unix | dateStamp }}</p>
                                  </div>
                              </div>
                                <div class="p-intro" style="height:320px; overflow:auto;" v-html="item.content"></div>
                                <div class="btn-group">
                                    <div class="btn btn-primary" @click="modifyEconomics(item)">修改</div>
                                    <div class="btn btn-danger" @click="delNew(item,index)">删除</div>
                                </div>
                            </div>
                        </div>
                  </div>
                  <div id="economic_pagnation"></div>
              </div>
          </div>
          <!-- 添加 -->
          <div style="width:95%; margin:0 auto; margin-top:50px;" v-show="addNew">
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
                      <div id="editor" v-model='content'>
                          
                      </div>
                      <!-- <textarea cols='40' rows='10' class="form-control" v-model='content'></textarea>  -->
                      <div style="margin-top:20px;">
                              <button class="btn btn-danger" @click="addNews()">提交</button>
                              <button class="btn btn-default pull-right" @click="Cancel()">取消</button>
                      </div>
                  </div>
              </div>
          </div>
          <!-- 修改 -->
          <div style="width:95%;margin:0 auto; margin-top:50px;" v-show="modifyNew">
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯类型：
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <select v-model="modifyType" class="form-control">
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
                      <input type="text" class="form-control" v-model="Title"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯图片:
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <ul class="list-inline">
                          <li><img v-bind:src="modifyImg"/></li>
                          <li style="position:relative;">
                            <input type="file" @change="modifyFileChange" ref="uploadmodify" value="上传图片" style="position:absolute; opacity:0;"/>
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
                      <!-- <div id="modifyeditor" v-model='Content'>
                          <div v-html="Content"></div>
                      </div> -->
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

import '../../static/pagnation/bootstrap-paginator.js';

import * as E from 'wangeditor'

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

      searchId:'',
      BegIdx:0,
    }
  },
  watch:{
    searchId:'Search',//值可以为methods的方法名
  },
  filters:{
    dateStamp:function(value){
        //获取一个事件戳
         var time = new Date(value*1000);
         //获取年份信息
         var y = time.getFullYear();
         //获取月份信息，月份是从0开始的
         var m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
         //获取天数信息
         //获取天数信息
         var d = (time.getDate())<10?('0'+time.getDate()):time.getDate();

         var H=(time.getHours())<10?('0'+time.getHours()):time.getHours();

         var M=(time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
         //返回拼接信息
         return y+'-'+m + '-' + d+'    '+H+":"+M;
    },
  },
  mounted(){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{
    initData(){
        this.queryAllNews();
        // 创建编辑器
        var editor = new E('#editor')
        editor.customConfig.onchange = (html) => {
          this.content = html
        }
        editor.create();
        // 创建编辑器
        var modifyeditor = new E('#modifyeditor')
        modifyeditor.customConfig.onchange = (html) => {
          this.content = html
        }
        modifyeditor.create();

    },

    // 查询资讯
    queryAllNews(){
      let that = this;
      api.newsType().then(function(res){
            if(res.data.Code ==3){
                that.newsType = res.data.Data.Detail;
                console.log(that.newsType)
                that.queryNews(res.data.Data.Detail);
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
          that.queryAllNews();
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

    modifyEconomics(item){
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
      console.log(this.Content)
      data.append('sid',this.Sid);
      data.append('nid',this.modifyId);
      data.append('type',this.modifyType);
      data.append('title',this.Title);
      data.append('img',input.files[0]);
      data.append('content',this.Content);

      let that = this;

      axios.post(env.baseUrl+'/cycj/news/modify', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
      .then(function (res) {
        alert(res.data.Msg);
        if(res.data.Code ==3){
          that.modifyNew = !that.modifyNew;
          that.queryAllNews();
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
          counts:6,
          type:0,
        };

      let that = this;
      api.queryNews(params).then(function(res){
          if(res.data.Code ==3){
              let TotalNum;  //总数据条数
              TotalNum=res.data.Data.Total;
              let templateObj = res.data.Data.Detail;
              //    分页
               if(TotalNum>6) {
                  for(let i=0;i<6;i++){
                    for(let j =0;j<that.newsType.length;j++){
                        if(templateObj[i].type == that.newsType[j].type){
                            templateObj[i].typename = that.newsType[j].text;
                        }
                    }
                  }
                   that.newsLists= templateObj;
                   var options = {
                       currentPage: 1,
                       totalPages: parseInt(TotalNum /6) + 1,
                       onPageClicked: function (e, originalEvent, type, page) {
                           switch (type) {
                               case 'first':
                                   that.economicsListContent(0);
                                   break;
                               case 'page':
                                   that.BegIdx = (page - 1) * 6;
                                   that.economicsListContent(that.BegIdx,0);
                                   break;
                               case 'next':
                                   that.BegIdx  += 6;
                                   that.economicsListContent(that.BegIdx,0);
                                   break;
                               case 'last':
                                   that.BegIdx = TotalNum - TotalNum % 6;
                                   that.economicsListContent(that.BegIdx,0);
                                   break;
                               case 'prev':
                                   that.BegIdx -= 6;
                                   that.economicsListContent(that.BegIdx,0);
                                   break;
                           }
                       }
                   };
                   $('#economic_pagnation').bootstrapPaginator(options);
               }
          }else{
            let templateObj = res.data.Data.Detail;
            for(let i=0;i<6;i++){
                for(let j =0;j<that.newsType.length;j++){
                    if(templateObj[i].type == that.newsType[j].type){
                        templateObj[i].typename = that.newsType[j].text;
                    }
                }
              }
            that.newsLists= templateObj;
          }
      });
    },

    economicsListContent(BegIdx,type){
      let params={
          begidx:BegIdx,
          counts:6,
          type:type,
      };

      let that = this;
      api.queryNews(params).then(function(res){
          if(res.data.Code ==3){
              let templateObj = res.data.Data.Detail;
              for(let i=0;i<templateObj.length;i++){
                  for(let j =0;j<that.newsType.length;j++){
                      if(templateObj[i].type == that.newsType[j].type){
                          templateObj[i].typename = that.newsType[j].text;
                      }
                  }
                }
              that.newsLists= templateObj;
              }
          })
    },

    delNew(item,idx){
      let params={
        sid:this.Sid,
        nid:item.id
      };
      console.log(params)
      let that = this;
      api.delNews(params).then(function(res){
          alert(res.data.Msg);
          if(res.data.Code ==3){
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
    },

    newsTypeDetail(){
        let that = this;
    },

    //搜索
    Search(){
      let params={
        begidx:0,
        counts:6,
        type:this.searchId,
      };

      let that = this;
      api.queryNews(params).then(function(res){
          if(res.data.Code ==3){
              let templateObj = res.data.Data.Detail;
              let TotalNum;  //总数据条数
              TotalNum=res.data.Data.Total;
              //    分页
               if(TotalNum>6) {
                  for(let i=0;i<6;i++){
                      for(let j =0;j<that.newsType.length;j++){
                          if(templateObj[i].type == that.newsType[j].type){
                              templateObj[i].typename = that.newsType[j].text;
                          }
                      }
                    }
                  that.newsLists= templateObj;
                   var options = {
                       currentPage: 1,
                       totalPages: parseInt(TotalNum /6) + 1,
                       onPageClicked: function (e, originalEvent, type, page) {
                           switch (type) {
                               case 'first':
                                   that.economicsListContent(0);
                                   break;
                               case 'page':
                                   that.BegIdx = (page - 1) * 6;
                                   that.economicsListContent(that.BegIdx,that.searchId);
                                   break;
                               case 'next':
                                   that.BegIdx  += 6;
                                   that.economicsListContent(that.BegIdx,that.searchId);
                                   break;
                               case 'last':
                                   that.BegIdx = TotalNum - TotalNum % 6;
                                   that.economicsListContent(that.BegIdx,that.searchId);
                                   break;
                               case 'prev':
                                   that.BegIdx -= 6;
                                   that.economicsListContent(that.BegIdx,that.searchId);
                                   break;
                           }
                       }
                   };
                   $('#economic_pagnation').bootstrapPaginator(options);
               }else{
                  $('#economic_pagnation').empty();
                  for(let i=0;i<templateObj.length;i++){
                      for(let j =0;j<that.newsType.length;j++){
                          if(templateObj[i].type == that.newsType[j].type){
                              templateObj[i].typename = that.newsType[j].text;
                          }
                      }
                    }
                  that.newsLists= templateObj;
                }
          }
      });
    },

    upDown(){
      $('.content').toggle()
    }
  }
}
</script>

<style scoped lang="scss">
     #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }

    .prizemall-box {
        padding: 1rem 3rem;
        .prize-item {
            border: 1px solid #c0c0c0;
            border-radius: .7rem;
            margin-bottom: 3rem;
            height:500px;
            overflow:hidden;
            .p-img {
                padding: 1rem;
                text-align: center;
                .thumbnail-image {
                    max-width: 100%;
                    height: auto;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
            }
            .p-info {
                padding: 1rem;
                &:after {
                    display: table;
                    content: ' ';
                    clear: both;
                }
                .beans {
                    color: #e80000;
                }
            }
            .p-intro, .btn-group {
                padding: 1rem;
                padding-top: 0;
                color: #ccc;
            }
        }
    }
</style>
