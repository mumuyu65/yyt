<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div v-show="!AddComments">
              <div v-show="!modifyComments">
                <ul class="list-inline">
                    <li><h3>果蔬预测管理</h3></li>
                    <li class="pull-right" style="margin-top:15px;">
                        <button @click="addProductComment()"
                            style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                            <i class="fa fa-plus fa-1x"></i>新增产品预测
                        </button>
                    </li>
                </ul>
                <hr/>
              <!--  展示 -->
              <div style="background-color:transparent; padding:0;" class="row">
                      <div class="col-md-6" v-for="(item,index) in  productComments" v-if="item.status">
                          <div class="prize-item" style="padding:10px;border: 1px solid #c0c0c0;border-radius: .7rem;margin-bottom: 3rem;
                                height: 350px;overflow: hidden;">
                            <div class="col-md-12" style="border-bottom: 1px solid #c0c0c0;">
                                <div class="p-img col-md-6">
                                    <img class="thumbnail-image" v-bind:src='item.cover_img'  alt="奖品图片" style="height:100px;" />
                                </div>
                                <div class="p-info col-md-6" style="height:100px;">
                                    <h5>产品名称:{{item.title}}</h5>
                                    <span class="pull-left">产品类别:{{item.cgid | filterManage}}</span>
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
            <!-- 添加 -->
            <div style="margin:0 auto; margin:50px 20px;" v-show="AddComments">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>产品类别：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <select v-model="selected">
                            <option v-for="option in options" v-bind:value="option.id">
                                    {{ option.name }}
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
                            <input type="file" @change="onFileChange" ref="uploadadd" value="上传图片" style="position:absolute; opacity:0;"/>
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
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="addComment()">提交</button>
                                <button style="margin-left:50px;" class="btn btn-default" @click="Cancel()">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 修改 -->
            <div style="margin:0 auto; margin:50px 20px;" v-show="modifyComments">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>产品类别：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <select v-model="modifySelected">
                            <option v-for="option in options" v-bind:value="option.id">
                                    {{ option.name }}
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
                                <button class="btn btn-danger" @click="modifyProductsComment()">提交</button>
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

import * as E from 'wangeditor'

export default {
  name: 'productsManage',
  data (){
    return {
        Sid:'',
        selected:1,
        Intro:'',
        Img:'',
        Title:'',
        AddComments:false,
        options:[],
        productComments:[],
        //修改
        modifyComments:false,
        modifySelected:'',
        modifyTitle:'',
        modifyImg:'',
        modifyIntro:'',
        modifyId:'',

        editor:'',   //富文本编辑器
        modifyeditor:'',  //修改时的富文本编辑器
    }
  },
  filters: {
        filterCheck:function(value){
            switch(value){
                case '0': return '关闭'; break;
                case '1': return '开启'; break;
             }
        },
        filterManage:function(cgid){
            var url = 'http://yingdedao.com:10021/cycj/category/query';
            var str;
            $.ajaxSetup({
                async : false
            });
            $.post(url,function(res){
               for(let i = 0;i<res.Data.length;i++){
                    if(cgid == res.Data[i].id){
                      str = res.Data[i].name;
                    }
                  }
            })
            return str
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
      }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initProduct();
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
    //查询
    initProduct(){
        let that = this;
        //产品管理类别
        api.queryCategory().then(function(res){
            if(res.data.Code ==3){
                that.options = res.data.Data;
                console.log(res.data.Data)
                that.CommentsList();
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
             console.log(err);
        });
    },
    CommentsList(){
        let params={
            begidx:0,
            counts:30
        };

        let that = this;
        api.productsForecastQuery(params).then(function(res){
            if(res.data.Code ==3){
                let templateComments = res.data.Data;
                console.log(templateComments);
                let len= templateComments.length;
                for(var i = 0; i<len; i++){
                  for(var j=0; j<that.options.length;j++){
                     if(templateComments[i].id == that.options[j].id){
                        templateComments[i].productName=that.options[j].name;
                      }
                  }
                }
                that.productComments = templateComments;
            }
            else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },
    //添加
    addProductComment(){
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
    addComment(){
        let input = this.$refs.uploadadd;
        let data = new FormData();
        data.append('sid',this.Sid);
        data.append('title',this.Title);
        data.append('img', input.files[0]);
        data.append('cgid',this.selected);
        data.append('intro',this.Intro);

        let that = this;
        axios.post(env.baseUrl+'/cycj/forecast/add', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
          alert(res.data.Msg);
          if(res.data.Code ==3){
            that.AddComments = !that.AddComments;
            window.location.reload();
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
        that.Img = e.target.result;
        //预览
        $("#file").attr("src",that.Img);
      };
      reader.readAsDataURL(file);
    },

    //修改
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
          };
          reader.readAsDataURL(file);
    },

    Cancel(){
        this.AddComments = !this.AddComments;
    },

    modifyCancel(){
      this.modifyComments =!this.modifyComments;
    },

    modifyComment(item){
      this.modifyComments =!this.modifyComments;
      this.modifySelected = item.cgid;
      this.modifyTitle = item.title;
      this.modifyImg = item.cover_img;
      //this.modifyIntro = item.intro;
      this.modifyId = item.cgid;

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

    modifyProductsComment(){
      let input = this.$refs.uploadmodify;
      let data = new FormData();
      data.append('sid',this.Sid);
      data.append('id',this.modifySelected);
      data.append('cgid',this.modifyId);
      data.append('title',this.modifyTitle);
      data.append('img', input.files[0]);
      data.append('intro',this.modifyIntro);
      let that = this;
      axios.post(env.baseUrl+'/cycj/forecast/modify', data, {
          headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .then(function (res) {
        alert(res.data.Msg);
        if(res.data.Code ==3){
          that.modifyComments =!that.modifyComments;
          that.initProduct();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    removeComment(item,idx){
      let params={
        sid:this.Sid,
        id:item.cgid
      };

      let that = this;

      api.productsForecastDel(params).then(function(res){
          alert(res.data.Msg);
          if(res.data.Code ==3){
            that.productComments.splice(idx,1);
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


      api.productsForecastCheck(params).then(function(res){
          alert(res.data.Msg);
          if(res.data.Code ==3){
              item.status = temp_status;
              window.location.reload();
          }
      }).catch(function(err){
          console.log(err);
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
