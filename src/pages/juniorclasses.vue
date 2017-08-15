<template>
<div id="page-wrapper" >
        <div id="page-inner">
          <div v-show="!AddComments">
              <div v-show="!modifyComments">
                <ul class="list-inline">
                    <li><h3>初级课件</h3></li>
                    <li class="pull-right" style="margin-top:15px;">
                        <button @click="addComment()"
                            style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                            <i class="fa fa-plus fa-1x"></i>添加课件
                        </button>
                    </li>
                </ul>
                <hr style="margin:0;"/>
                <div id="classes_pagnation" class="text-center"></div>
                <table class="text-center" border="1" width="100%" id="productsTable">
                    <thead>
                        <th class="text-center">编号</th>
                        <th class="text-center">负责人</th>
                        <th class="text-center" style="max-width:120px">标题</th>
                        <th class="text-center">封面图片</th>
                        <th class="text-center">附件信息</th>
                        <th class="text-center" style="max-width:150px">简介</th>
                        <th class="text-center">审核</th>
                        <th class="text-center">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in courses" v-if="item.status">
                          <td>{{index+1}}</td>
                          <td>{{item.owner}}</td>
                          <td style="max-width:120px">{{item.title}}</td>
                          <td><img v-bind:src="item.cover_url" style="height:50px;"/></td>
                          <td>
                            <a v-bind:href="item.annex_url" target="_blank">{{item.annex_url}}</a>
                          </td>
                          <td style="max-width:150px">{{item.intro}}</td>
                          <td><button class="btn btn-default" @click="Check(item)">{{item.status | filterCheck }}</button></td>
                          <td>
                            <button class="btn btn-primary btn-sm" @click="modifyComment(item)">修改</button>
                            <button class="btn btn-danger btn-sm" @click="removeClasses(item,index)">删除</button>
                          </td>
                        </tr>
                    </tbody>
                </table>
              </div>
          </div>
          <!--添加 -->
          <div style="margin:50px 20px;" v-show="AddComments">
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
                            <input type="file" @change="onImgChange" ref="uploadImg"  value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传图片
                            </button>
                          </li>
                      </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>上传附件:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <div style="position:relative;">
                            <input type="file" @change="onFileChange" ref="uploadFile"  value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传附件
                            </button>
                            <span>{{file}}</span>
                        </div>
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
          <!--修改 -->
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
                       <span class="required">*</span>封面图片:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                      <ul class="list-inline">
                          <li><img v-bind:src="modifyImg" class="profile"/></li>
                          <li style="position:relative;">
                            <input type="file" @change="modifyImgChange" ref="uploadmodifyImg" value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传图片
                            </button>
                          </li>
                      </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>上传附件：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <div style="position:relative;">
                            <span>{{JuniormodifyFile}}</span>
                            <input type="file" @change="modifyFileChange" ref="uploadmodifyFile" value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传附件
                            </button>
                          </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>简介 :
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <textarea cols='40' rows='10' class="form-control" v-model="modifyIntro"></textarea>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="modifyJuniorClasses()">提交</button>
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
  name: 'juniorclasses',
  data (){
    return {
        Sid:'',
        file:'',
        Intro:'',
        Img:'',
        Title:'',
        AddComments:false,
        courses:[],
        //修改
        modifyComments:false,
        JuniormodifyFile:'',
        modifyTitle:'',
        modifyImg:'',
        modifyIntro:'',
        modifyId:'',
    }
  },
  filters: {
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
        flag:1,
        begidx:0,
        counts:10,
      };

      let that = this;

      api.coursesQuery(params).then(function(res){
        if(res.data.Code ==3){
            let TotalNum = res.data.Data.Totals;
            let templateObj = res.data.Data.Detail;
            that.courses= templateObj;
            //    分页
             if(TotalNum>10) {
                 var options = {
                     currentPage: 1,
                     totalPages: parseInt(TotalNum /10) + 1,
                     onPageClicked: function (e, originalEvent, type, page) {
                         switch (type) {
                             case 'first':
                                 that.classListQuery(0);
                                 break;
                             case 'page':
                                 that.BegIdx = (page - 1) * 10;
                                 that.classListQuery(that.BegIdx);
                                 break;
                             case 'next':
                                 that.BegIdx  += 10;
                                 that.classListQuery(that.BegIdx);
                                 break;
                             case 'last':
                                 that.BegIdx = TotalNum - TotalNum % 10;
                                 that.classListQuery(that.BegIdx);
                                 break;
                             case 'prev':
                                 that.BegIdx -= 10;
                                 that.classListQuery(that.BegIdx);
                                 break;
                         }
                     }
                 };
                 $('#classes_pagnation').bootstrapPaginator(options);
             }
        }else{
          alert(res.data.Msg);
        }
      }).catch(function(err){
          console.log(err);
      });
    },
    classListQuery(BegIdx){
      let params={
          flag:'1',
          begidx:BegIdx,
          counts:10,
      };

      let that = this;
      api.coursesQuery(params).then(function(res){
          if(res.data.Code ==3){
              that.courses= res.data.Data.Detail;
              }
          })
    },
    //上传图片
    onImgChange(e) {
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

    //上传文件
    onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
           return;
           this.file=files[0].name;
    },

     //修改图片
    modifyImgChange(e) {
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

    //修改已上传的文件
    modifyFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
           return;
           this.JuniormodifyFile=files[0].name;
     },

    //添加
    addComment(){
      this.AddComments = !this.AddComments;
    },

    //提交
    addDayComment(){
      let input_img = this.$refs.uploadImg;

      let input_file = this.$refs.uploadFile;

      let data = new FormData();
      data.append('sid',this.Sid);
      data.append('title', this.Title);
      data.append('img', input_img.files[0]);
      data.append('file',input_file.files[0]);
      data.append('flag','1');
      data.append('intro',this.Intro);

      let that = this;

      axios.post(env.baseUrl+'/cycj/courware/add', data, {
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
      console.log(item);
      this.modifyComments = !this.modifyComments;
      this.modifyTitle = item.title;
      this.modifyImg = item.cover_url;
      this.JuniormodifyFile = item.annex_url;
      this.modifyIntro = item.intro;
      this.modifyId = item.id;
    },

    modifyCancel(){
      this.modifyComments = !this.modifyComments;
    },

    modifyJuniorClasses(){
      let input_img = this.$refs.uploadmodifyImg;

      let input_file = this.$refs.uploadmodifyFile;

      let data = new FormData();
      data.append('sid',this.Sid);
      data.append('id',this.modifyId);
      data.append('title',this.modifyTitle);
      data.append('img', input_img.files[0]);
      data.append('file', input_file.files[0]);
      data.append('flag',1);
      data.append('intro',this.modifyIntro);

      let that = this;

      axios.post(env.baseUrl+'/cycj/courware/modify', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
          alert(res.data.Msg);
          if(res.data.Code ==3){
            that.modifyComments = !that.modifyComments;
            //window.location.reload();
            that.$router.push("/juniorclasses");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //删除
    removeClasses(item,index){
      let params={
        sid:this.Sid,
        id:item.id
      };

      let that = this;
      api.coursesDel(params).then(function(res){
        alert(res.data.Msg);
        if(res.data.Code ==3){
            that.courses.splice(index,1);
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


      api.coursesCheck(params).then(function(res){
          alert(res.data.Msg);
          if(res.data.Code ==3){
              item.status = temp_status;
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
