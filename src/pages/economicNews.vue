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
                  <div id="economic_pagnation"></div>
                    <table class="text-center" border="1" width="100%" id="productsTable">
                      <thead>
                          <th class="text-center">编号</th>
                          <th class="text-center" style="max-width:120px">标题</th>
                          <th class="text-center">资讯类型</th>
                          <th class="text-center">创建时间</th>
                          <th class="text-center">附件文件</th>
                          <th class="text-center">操作</th>
                      </thead>
                      <tbody>
                          <tr v-for="(item,index) in newsLists">
                            <td>{{index+1}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.typename }}</td>
                            <td>{{item.unix | dateStamp }}</td>
                            <td>
                              <a v-bind:href="item.imgurl" target="_blank">{{item.imgurl}}</a>
                            </td>
                            <td>
                              <button class="btn btn-primary" @click="modifyEconomics(item)">修改</button>
                              <button class="btn btn-danger" @click="delNew(item,index)">删除</button>
                            </td>
                          </tr>
                      </tbody>
                    </table>
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
                      上传文件:
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <ul class="list-inline" style="min-height:400px;">
                           <li><span>{{File}}</span></li>
                          <li style="position:relative;">
                            <input type="file" @change="onFileChange" ref="uploadimg" value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传文件
                            </button>
                          </li>
                      </ul>
                       <div style="margin-top:20px;">
                              <button class="btn btn-danger" @click="addNews()">提交</button>
                              <button class="btn btn-default pull-right" @click="Cancel()">取消</button>
                      </div>
                  </div>
              </div>
              <!--
              <div class="row">
                  <div class="col-sm-3 col-md-3 col-xs-6">
                      资讯内容:
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <div id="editor" v-model='content'>

                      </div>

                  </div>
              </div>
              -->
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
                      附件文件:
                  </div>
                  <div class="col-sm-9 col-md-9 col-xs-6">
                      <ul class="list-inline">
                          <li><span>{{modifyFile}}</span></li>
                          <li style="position:relative;">
                            <input type="file" @change="modifyFileChange" ref="uploadmodify" value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传文件
                            </button>
                          </li>
                      </ul>
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

//import * as E from 'wangeditor'

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
      File:'',
      title:'',
      content:'',

      modifyFile:'',
      modifyType:'',
      Title:'',
      Content:'',
      modifyId:'',

      searchId:'',
      BegIdx:0,

      modifyeditor:'',
      editor:'',
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
    //this.checkLogin();
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
        this.queryAllNews();
        // 创建编辑器
        //let editor = new E('#editor');

        // 自定义菜单配置
        /*
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'table',  // 表格
            'undo',  // 撤销
            'redo'  // 重复
        ];
        editor.create();

        this.editor = editor;
        */
    },

    // 查询资讯
    queryAllNews(){
      let that = this;
      api.newsType().then(function(res){
            if(res.data.Code ==3){
                that.newsType = res.data.Data.Detail;
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
      data.append('file',input.files[0]);
      //data.append('content',this.editor.txt.html());

      let that = this;

      axios.post(env.baseUrl+'/yyt/news/add', data, {
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
           this.File=files[0].name;
    },

    modifyEconomics(item){
      this.modifyNew = ! this.modifyNew;
      this.modifyType = item.type;
      this.Title = item.title;
      this.modifyFile = item.imgurl;
      this.modifyId = item.id;
    },

    modifyItem(){
      let input = this.$refs.uploadmodify;

      let data = new FormData();

      data.append('sid',this.Sid);
      data.append('nid',this.modifyId);
      data.append('type',this.modifyType);
      data.append('title',this.Title);
      data.append('file',input.files[0]);
      //data.append('content',this.modifyeditor.txt.html());

      let that = this;

      axios.post(env.baseUrl+'/yyt/news/modify', data, {
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
        that.modifyFile = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    //查询
    queryNews(){
      let params={
          begidx:0,
          counts:10,
          type:0,
        };

      let that = this;
      api.queryNews(params).then(function(res){
          if(res.data.Code ==3){
              let TotalNum;  //总数据条数
              TotalNum=res.data.Data.Total;
              let templateObj = res.data.Data.Detail;
              //console.log(templateObj);
              //    分页
               if(TotalNum>10) {
                  for(let i=0;i<10;i++){
                    for(let j =0;j<that.newsType.length;j++){
                        if(templateObj[i].type == that.newsType[j].type){
                            templateObj[i].typename = that.newsType[j].text;
                        }
                    }
                  }
                   that.newsLists= templateObj;
                   var options = {
                       currentPage: 1,
                       totalPages: parseInt(TotalNum /10) + 1,
                       onPageClicked: function (e, originalEvent, type, page) {
                           switch (type) {
                               case 'first':
                                   that.economicsListContent(0);
                                   break;
                               case 'page':
                                   that.BegIdx = (page - 1) * 10;
                                   that.economicsListContent(that.BegIdx,0);
                                   break;
                               case 'next':
                                   that.BegIdx  += 10;
                                   that.economicsListContent(that.BegIdx,0);
                                   break;
                               case 'last':
                                   that.BegIdx = TotalNum - TotalNum % 10;
                                   that.economicsListContent(that.BegIdx,0);
                                   break;
                               case 'prev':
                                   that.BegIdx -= 10;
                                   that.economicsListContent(that.BegIdx,0);
                                   break;
                           }
                       }
                   };
                   $('#economic_pagnation').bootstrapPaginator(options);
               }else{
                for(let i=0;i<TotalNum;i++){
                    for(let j =0;j<that.newsType.length;j++){
                        if(templateObj[i].type == that.newsType[j].type){
                            templateObj[i].typename = that.newsType[j].text;
                        }
                    }
                  }
                that.newsLists= templateObj;
               }
          }else{
            alert(res.data.Msg);
          }
      });
    },

    economicsListContent(BegIdx,type){
      let params={
          begidx:BegIdx,
          counts:10,
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
        counts:10,
        type:this.searchId,
      };

      let that = this;
      api.queryNews(params).then(function(res){
          if(res.data.Code ==3){
              let templateObj = res.data.Data.Detail;
              let TotalNum;  //总数据条数
              TotalNum=res.data.Data.Total;
              //    分页
               if(TotalNum>10) {
                  for(let i=0;i<10;i++){
                      for(let j =0;j<that.newsType.length;j++){
                          if(templateObj[i].type == that.newsType[j].type){
                              templateObj[i].typename = that.newsType[j].text;
                          }
                      }
                    }
                  that.newsLists= templateObj;
                   var options = {
                       currentPage: 1,
                       totalPages: parseInt(TotalNum /10) + 1,
                       onPageClicked: function (e, originalEvent, type, page) {
                           switch (type) {
                               case 'first':
                                   that.economicsListContent(0);
                                   break;
                               case 'page':
                                   that.BegIdx = (page - 1) * 10;
                                   that.economicsListContent(that.BegIdx,that.searchId);
                                   break;
                               case 'next':
                                   that.BegIdx  += 10;
                                   that.economicsListContent(that.BegIdx,that.searchId);
                                   break;
                               case 'last':
                                   that.BegIdx = TotalNum - TotalNum % 10;
                                   that.economicsListContent(that.BegIdx,that.searchId);
                                   break;
                               case 'prev':
                                   that.BegIdx -= 10;
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
      $('.content').toggle();
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
            height:350px;
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
            }
        }
    }

    hr{
      margin:10px 0;
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
