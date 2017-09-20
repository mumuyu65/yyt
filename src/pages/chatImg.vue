<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <div v-show="!AddComments">
              <div v-show="!modifyComments">
                <ul class="list-inline">
                    <li><h3>聊天图片管理</h3></li>
                    <li class="pull-right" style="margin-top:15px;">
                        <button @click="addImg()"
                            style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                            <i class="fa fa-plus fa-1x"></i>添加图片
                        </button>
                    </li>
                </ul>
                <hr/>
                <!-- 展示图片 -->
                <table class="text-center" border="1" width="100%" id="productsTable">
                </table>
              </div>
          </div>
          <!-- 添加图片 -->
          <div style="margin:0 auto; margin:50px 20px;" v-show="AddComments">
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
                       <span class="required">*</span>图片:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                      <ul class="list-inline">
                          <li><img id="file" v-bind:src="Img" class="profile"/></li>
                          <li style="position:relative;" >
                            <input type="file" @change="onFileChange" ref="upload"  value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传图片
                            </button>
                          </li>
                      </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <div style="margin-top:20px;" class="text-center">
                                <button class="btn btn-danger" @click="addDayComment()">提交</button>
                                <button style="margin-left:50px;" class="btn btn-default" @click="Cancel()">取消</button>
                        </div>
                    </div>
                </div>
          </div>
          <!-- 修改图片 -->
          <div style="margin:50px 20px;" v-show="modifyComments">
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
                       <span class="required">*</span>图片:
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
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <div style="margin-top:20px;" class="text-center">
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

import 'bootstrap-table'

export default {
  name: 'chatImg',
  data (){
    return {
        Sid:'',
        Img:'',
        Title:'',
        AddComments:false,
        options:[{ text: '早评', value: '1' },
          { text: '晚评', value: '2' }],
        imgList:[],
        //修改
        modifyComments:false,
        modifyTitle:'',
        modifyImg:'',
        modifyId:'',
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
    this.checkLogin();
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
      let params={
        sid:this.Sid
      };

      let that = this;

      api.getImg(params).then(function(res){
        if(res.data.Code ==3){
              that.dayComments =  res.data.Data;
              $('#productsTable').bootstrapTable({
                pageSize:8,
                data:that.dayComments,
                pagination:true,
                striped:true,
                paginationVAlign:'bottom',
                paginationHAlign:'right',
                columns: [{
                    field: 'id',
                    title: '序列号',
                    formatter:function(val,row,idx){
                      return idx;
                    }
                }, {
                    field: 'title',
                    title: '标题'
                }, {
                    field: 'imgurl',
                    title: '图片',
                    formatter:function(index,item,id){
                      return '<img src="'+item.imgurl+'" style="width:65px; height:65px;" />'
                    }
                },{
                  field:'group',
                  title:'操作',
                  formatter:function(val,row,idx){
                    return '<button class="btn btn-primary mod">修改</button>'+'<button class="btn btn-danger delete">删除</button>'
                  },
                  events:{
                    'click .mod': function(e, value, row, index) {
                          //修改操作
                          that.modifyComment(row);
                        },
                    'click .delete' : function(e, value, row, index) {
                          //删除操作
                          that.removeComment(row,index);
                        }
                    }
                }]
          });
        }else{
          alert(res.data.Msg);
        }
      }).catch(function(err){
          console.log(err);
      });
    },

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

    addImg(){
      this.AddComments = !this.AddComments;
    },

    //提交
    addDayComment(){
      let input = this.$refs.upload;
      let data = new FormData();
      data.append('sid',this.Sid);
      data.append('title', this.Title);
      data.append('image', input.files[0]);

      let that = this;

      axios.post(env.baseUrl+'/cycj/live/image/save', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
          alert(res.data.Msg);
          if(res.data.Code ==3){
            that.AddComments = !that.AddComments;
            that.initData();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    Cancel(){
      this.AddComments = !this.AddComments;
    },


    modifyComment(item){
      this.modifyComments = !this.modifyComments;
      this.modifyTitle = item.title;
      this.modifyImg = item.imgurl;
      this.modifyId = item.id;
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

      let that = this;

      axios.post(env.baseUrl+'/cycj/live/image/change', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
          alert(res.data.Msg);
          if(res.data.Code ==3){
            that.modifyComments = !that.modifyComments;
            that.InitTable();
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
      api.delImg(params).then(function(res){
        alert(res.data.Msg);
        if(res.data.Code ==3){
            //that.dayComments.splice(index,1);
            that.initData();
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
