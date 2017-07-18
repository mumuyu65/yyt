<template>
    <div id="page-wrapper" >
        <div id="page-inner">
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
          <div v-show="!AddComments">
              <div v-show="!modifyComments">
                <table class="text-center" border="1" width="100%" id="productsTable">
                    <thead>
                        <th  class="text-center">编号</th>
                        <th  class="text-center">分类</th>
                        <th  class="text-center">标题</th>
                        <th  class="text-center">封面图片</th>
                        <th  class="text-center">简介</th>
                        <th  class="text-center">审核</th>
                        <th  class="text-center">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in dayComments" v-if="item.status">
                          <td>{{index+1}}</td>
                          <td>{{item.flag | filterValue}}</td>
                          <td>{{item.title}}</td>
                          <td>
                            <img v-bind:src='item.cover_img' />
                          </td>
                          <td>{{item.intro}}</td>
                          <td><button class="btn btn-default" @click="Check(item)">{{item.status | filterCheck }}</button></td>
                          <td>
                            <button class="btn btn-primary" @click="modifyComment(item)">修改</button>
                            <button class="btn btn-danger" @click="removeComment(item,index)">删除</button>
                          </td>
                        </tr>
                    </tbody>
                </table>
              </div>
          </div>
          <div style="width:700px;margin:0 auto; margin-top:50px;" v-show="AddComments">
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
                        <textarea cols='40' rows='10' class="form-control" v-model="Intro"></textarea>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="addDayComment()">提交</button>
                                <button style="margin-left:50px;" class="btn btn-default" @click="Cancel()">取消</button>
                        </div>
                    </div>
                </div>
          </div>
          <div style="width:700px;margin:0 auto; margin-top:50px;" v-show="modifyComments">
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
                        <textarea cols='40' rows='10' class="form-control" v-model="modifyIntro"></textarea>
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
        }
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
        counts:30,
      };

      let that = this;

      api.dayCommentQuery(params).then(function(res){
        if(res.data.Code ==3){
            that.dayComments = res.data.Data;
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

    addComment(){
      this.AddComments = !this.AddComments;
    },

    //提交
    addDayComment(){
      let input = this.$refs.upload;
      let data = new FormData();
      data.append('sid',this.Sid);
      data.append('title', this.Title);
      data.append('img', input.files[0]);
      data.append('flag',this.selected);
      data.append('intro',this.Intro);

      let that = this;

      axios.post(env.baseUrl+'/cycj/comment/add', data, {
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

    Cancel(){
      this.AddComments = !this.AddComments;
    },


    modifyComment(item){
      this.modifyComments = !this.modifyComments;
      this.ModifySelected = item.flag;
      this.modifyTitle = item.title;
      this.modifyImg = item.cover_img;
      this.modifyIntro = item.intro;
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
      data.append('flag',this.ModifySelected);
      data.append('intro',this.modifyIntro);

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
            window.location.reload();
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
