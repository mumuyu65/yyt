<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <div v-show="!AddComments">
              <div v-show="!modifyComments">
                <ul class="list-inline">
                    <li><h3>早晚评</h3></li>
                    <li class="pull-right" style="margin-top:15px;">
                        <button @click="addComment()"
                            style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                            <i class="fa fa-plus fa-1x"></i>添加评论
                        </button>
                    </li>
                </ul>
                <hr/>
                <!-- 展示  -->
                <div id="daycomment_pagnation"></div>
                <div style="background-color:transparent; padding:0;" class="row">
                      <div class="col-md-6" v-for="(item,index) in dayComments" v-if="item.status">
                          <div class="prize-item" style="padding:10px;border: 1px solid #c0c0c0;border-radius: .7rem;margin-bottom: 3rem;
                                height: 350px;overflow: hidden;">
                            <div class="col-md-12" style="border-bottom: 1px solid #c0c0c0;">
                                <div class="p-img col-md-6">
                                    <img class="thumbnail-image" v-bind:src='item.cover_img'  alt="早晚评图片" style="height:100px;" />
                                </div>
                                <div class="p-info col-md-6" style="height:100px;">
                                    <h5>标题：{{item.title}}</h5>
                                    <span class="pull-left">资讯类型:{{item.flag | filterValue}}</span>
                                    <p class="beans">{{item.unix | dateStamp }}</p>
                                </div>
                            </div>
                              <div style="height:180px; padding:20px; overflow:auto; border:1px solid transparent;" v-html="item.intro"></div>
                              <div class="btn-group" style="padding:20px;">
                                  <button class="btn btn-default" @click="Check(item)">{{item.status | filterCheck }}</button>
                                  <div class="btn btn-primary" @click="modifyComment(item)">修改</div>
                                  <div class="btn btn-danger" @click="removeComment(item,index)">删除</div>
                              </div>
                          </div>
                      </div>
                </div>
              </div>
          </div>
          <!-- 添加  -->
          <div style="margin:50px 20px;" v-show="AddComments">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>早晚评：
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
                        <span class="required">*</span> 标题:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='text' value="" style="height:30px;" v-model="Title"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>封面图片:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                      <ul class="list-inline">
                          <li><img id="file" v-bind:src="Img" class="profile"/></li>
                          <li style="position:relative;">
                            <input type="file" @change="onFileChange" ref="upload"  value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传图片
                            </button>
                          </li>
                      </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>简介 :
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <div id="editor" v-model="Intro">

                        </div>
                        <span class="required">注意事项:上传图片大小在80-100像素之间</span>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="addDayComment()">提交</button>
                                <button style="margin-left:50px;" class="btn btn-default" @click="Cancel()">取消</button>
                        </div>
                    </div>
                </div>
          </div>
          <!-- 修改  -->
          <div style="margin:50px 20px;" v-show="modifyComments">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>早晚评：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <select v-model="ModifySelected">
                            <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        <span class="required">*</span> 标题:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='text' value="" style="height:30px;" v-model="modifyTitle"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>封面图片:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                      <ul class="list-inline">
                          <li><img id="modifyFile" v-bind:src="modifyImg" class="profile"/></li>
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
                       <span class="required">*</span>简介 :
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <div id="modifyeditor" v-model="modifyIntro">
                        </div>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="modifyDayComment()">提交</button>
                                <button style="margin-left:50px;" class="btn btn-default" @click="modifyCancel()">取消</button>
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
  name: 'dayComments',
  data (){
    return {
        Sid:'',
        selected:1,
        Intro:'',
        Img:'',
        Title:'',
        AddComments:false,
        options:[{ text: '早评', value: '1' },
          { text: '晚评', value: '2' }],
        dayComments:[],
        //修改
        modifyComments:false,
        ModifySelected:'',
        modifyTitle:'',
        modifyImg:'',
        modifyIntro:'',
        modifyId:'',

        modifyeditor:'',
        editor:'',

        BegIdx:'',  //分页
    }
  },
  filters: {
        filterValue : function(value){
             switch(value){
                case '1': return '早评'; break;
                case '2': return '晚评'; break;
             }
        },

        filterCheck:function(value){
            switch(value){
                case '0': return '关闭'; break;
                case '1': return '开启'; break;
             }
        },

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
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{
    initData(){
      let params={
        flag:'',
        begidx:0,
        counts:4,
      };

      let that = this;

      api.dayCommentQuery(params).then(function(res){
        if(res.data.Code ==3){
            let TotalNum;  //总数据条数
            TotalNum=res.data.Data.Total;
             //    分页
            if(TotalNum>4){
              var options = {
                       currentPage: 1,
                       totalPages: parseInt(TotalNum /4) + 1,
                       onPageClicked: function (e, originalEvent, type, page) {
                           switch (type) {
                               case 'first':
                                   that.daycommentListContent(0);
                                   break;
                               case 'page':
                                   that.BegIdx = (page - 1) * 4;
                                   that.daycommentListContent(that.BegIdx);
                                   break;
                               case 'next':
                                   that.BegIdx  += 4;
                                   that.daycommentListContent(that.BegIdx);
                                   break;
                               case 'last':
                                   that.BegIdx = TotalNum - TotalNum % 4;
                                   that.daycommentListContent(that.BegIdx);
                                   break;
                               case 'prev':
                                   that.BegIdx -= 4;
                                   that.daycommentListContent(that.BegIdx);
                                   break;
                           }
                       }
                   };
                   $('#daycomment_pagnation').bootstrapPaginator(options);
            }
            that.dayComments = res.data.Data.Detail;
        }else{
          alert(res.data.Msg);
        }
      }).catch(function(err){
          console.log(err);
      });
    },

    //分页显示
    daycommentListContent(begIdx){
      let params={
        flag:'',
        begidx:begIdx,
        counts:4,
      };

      let that = this;

      api.dayCommentQuery(params).then(function(res){
          if(res.data.Code ==3){
            that.dayComments = res.data.Data.Detail;
          }
      }).catch(function(err){
          console.log(err);
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
            that.Img = e.target.result;
            //预览
            $("#file").attr("src",that.Img);
          };
          reader.readAsDataURL(file);
    },

    modifyFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
           return;
           this.modifyImage(files[0]);
     },

    modifyImage(file) {
          var image = new Image();
          var reader = new FileReader();
          var that = this;

          reader.onload = (e) => {
            that.modifyImg = e.target.result;
            //预览
            $("#modifyFile").attr("src",that.modifyImg);
          };
          reader.readAsDataURL(file);
    },

    addComment(){
      this.AddComments = !this.AddComments;
      // 创建编辑器
      let editor = new E('#editor');
      // 自定义菜单配置
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
          'image',  // 插入图片
          'table',  // 表格
          'undo',  // 撤销
          'redo'  // 重复
      ];

      // 隐藏“网络图片”tab
      editor.customConfig.showLinkImg = false;

      editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片

      editor.create();

      this.editor = editor;
    },

    //提交
    addDayComment(){
      let input = this.$refs.upload;
      let data = new FormData();
      data.append('sid',this.Sid);
      data.append('title', this.Title);
      data.append('img', input.files[0]);
      data.append('flag',this.selected);
      data.append('intro',this.editor.txt.html());

      let that = this;

      axios.post(env.baseUrl+'/cycj/comment/add', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
          if(res.data.Code ==3){
            that.AddComments = !that.AddComments;
            that.initData();
            alert(res.data.Msg);
          }else{
            alert("上传的图片或文字过大，请重新输入！");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    Cancel(){
      this.AddComments = !this.AddComments;
    },

    //修改
    modifyComment(item){
      this.modifyComments = !this.modifyComments;
      this.ModifySelected = item.flag;
      this.modifyTitle = item.title;
      this.modifyImg = item.cover_img;
      this.modifyId = item.id;

      // 创建编辑器
      let modifyeditor = new E('#modifyeditor');

      // 自定义菜单配置
      modifyeditor.customConfig.menus = [
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
          'image',  // 插入图片
          'table',  // 表格
          'undo',  // 撤销
          'redo'  // 重复
      ];

       // 隐藏“网络图片”tab
      modifyeditor.customConfig.showLinkImg = false;

      modifyeditor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片

      modifyeditor.create();

      this.modifyeditor = modifyeditor;

      modifyeditor.txt.html(item.intro);

    },

    modifyCancel(){
      this.modifyComments = !this.modifyComments;
    },

    modifyDayComment(){
      let input = this.$refs.uploadmodify;
      let data = new FormData();
      data.append('sid',this.Sid);
      data.append('id',this.modifyId);
      data.append('title',this.modifyTitle);
      data.append('img', input.files[0]);
      data.append('flag',this.ModifySelected);
      data.append('intro',this.modifyeditor.txt.html());

      let that = this;

      axios.post(env.baseUrl+'/cycj/comment/modify', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
          alert(res.data.Msg);
          if(res.data.Code ==3){
            that.modifyComments = !that.modifyComments;
            that.initData();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //删除
    removeComment(item,index){
      let params={
        sid:this.Sid,
        id:item.id
      };

      let that = this;
      api.dayCommentDel(params).then(function(res){
        alert(res.data.Msg);
        if(res.data.Code ==3){
            that.dayComments.splice(index,1);
        }
      }).catch(function(err){
          console.log(err);
      });
    },

    //审核
    Check(item){
      let temp_status;
      if(item.status == 0){
          temp_status = 1;
      }else{
          temp_status = 0;
      }

      let params={
        sid:this.Sid,
        id:item.id,
        status:temp_status
      };


      api.dayCommentCheck(params).then(function(res){
          alert(res.data.Msg);
          if(res.data.Code ==3){
              item.status = temp_status;
              that.initData();
          }
      }).catch(function(err){
          console.log(err);
      });
    }
  },
}
</script>

<style scoped lang="scss">
  #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }

  .prizemall-box{
    padding: 1rem 3rem;
    .prize-item{
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
            color: #ccc;
        }
    }
  }

  .required{
    color:#f00;
  }
</style>
