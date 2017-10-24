<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <div v-show="!addImg">
            <div v-show="!modifyImg">
                <ul class="list-inline">
                    <li><h3>活动专区管理</h3></li>
                    <li class="pull-right"><button class="btn btn-danger" @click="addNewImg()">添加轮播图</button></li>
                </ul>
                <hr/>
                <!-- 展示轮播图  -->
                <table class="text-center" width="100%" border="1" id="userTable">
                    <thead>
                      <th class="text-center">序列号</th>
                      <th class="text-center">图片</th>
                      <th class="text-center">操作</th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in activities">
                        <td>{{index +1}}</td>
                        <td><img v-bind:src="item.imgurl"  /></td>
                        <td><button class="btn btn-primary" @click="ImgModify(item)">修改</button>
                      <button class="btn btn-danger"  @click="ImgDel(item,index)">删除</button></td>
                    </tr>
                </tbody>
                </table>
            </div>
          </div>
          <!-- 添加图片 -->
          <div style="margin:0 auto; padding:20px;" v-show="addImg">
             <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>图片:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                          <ul class="list-inline">
                              <li><img v-bind:src="ImgArr" id="file" class="profile"/></li>
                              <li style="position:relative;">
                                <input type="file" @change="onFileChange" ref="upload" value="上传图片" style="position:absolute; opacity:0;"/>
                                <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                    上传图片
                                </button>
                              </li>
                          </ul>
                          <div style="margin-top:30px;">
                            <button class="btn btn-primary" @click="uploadImgs()">确认</button>
                            <button class="btn btn-danger" @click="CancelAdd()">取消</button>
                          </div>
                    </div>
                </div>
          </div>

           <!-- 修改上传的图片 -->
          <div style="margin:0 auto; padding:20px;" v-show="modifyImg">
             <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>图片:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                          <img v-bind:src="ImgModifyArr" />
                          <ul class="list-inline">
                              <li style="position:relative;">
                                <input type="file" @change="onModifyFileChange" ref="upModifyload" value="修改图片" style="position:absolute; opacity:0;"/>
                                <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                    修改图片
                                </button>
                              </li>
                          </ul>
                          <div style="margin-top:30px;">
                               <button class="btn btn-primary" @click="modifyUpload()" >
                                修改
                              </button>
                              <button class="btn btn-danger" @click="CancelModify()">取消</button>
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
  name: 'activities',
  data (){
    return {
        Sid:'',
        activities:[],
        ImgArr:'',  //上传图片

        addImg:false,

        modifyImg:false,

        Idx:0,

        ImgModifyArr:'',

        modifyId:0,
    }
  },
  mounted (){
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
      let that = this;
      api.activityQuery().then(function(res){
        if(res.data.Code ==3){
            if(res.data.Data){
              let templateObj= res.data.Data;

              that.activities = templateObj;

              console.log(templateObj);

              that.Idx = that.activities.length;
            }
        }
      }).catch(function(err){
          console.log(err);
      });
    },

    addNewImg(){
        this.addImg = !this.addImg;
    },

    CancelAdd(){
       this.addImg = !this.addImg;
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
           that.ImgArr= e.target.result;
          //预览
          $("#file").attr("src",that.ImgArr);

          that.Idx +=1;
        };
      reader.readAsDataURL(file);
    },

    //添加图片
    uploadImgs(){
        var data = new FormData();

        let Img = this.$refs.upload;

        data.append('img', Img.files[0]);

        data.append('sid',this.Sid);

        data.append('idx',this.Idx);

        axios.post(env.baseUrl+'/yyt/activity/add', data, {
              headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          .then(function (res) {
            if(res.data.Code ==3){
              window.location.reload();
            }
            alert(res.data.Msg);
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    //修改轮播图
    ImgModify(item){
       this.modifyImg = !this.modifyImg;
       this.ImgModifyArr = item.imgurl;

       this.modifyId = item.id;
    },

    CancelModify(){
      this.modifyImg = !this.modifyImg;
    },

    onModifyFileChange(e){
        let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
           return;
          this.createModifyImage(files[0]);
    },

    createModifyImage(file){
        var image = new Image();
        var reader = new FileReader();
        var that = this;

        reader.onload = (e) => {
           that.ImgModifyArr= e.target.result;
        };
      reader.readAsDataURL(file);
    },

    modifyUpload(){
        var data = new FormData();

        let Img = this.$refs.upModifyload;

        data.append('img', Img.files[0]);

        data.append('sid',this.Sid);

        data.append('id',this.modifyId);

        axios.post(env.baseUrl+'/yyt/activity/modify', data, {
              headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          .then(function (res) {
            if(res.data.Code ==3){
              window.location.reload();
            }
            alert(res.data.Msg);
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    changeactivity(){
        let input = this.$refs.upload;
        let data = new FormData();
        data.append('img', input.files[0]);
        data.append('sid',this.Sid);

        axios.post(env.baseUrl+'/yyt/activity/update', data, {
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


    profileReview(e) {
        var objUrl;
        var img_html;

        var img_div = $("#img_inner");

        var filepath = $("input[name='myFile']").val();

        var files = e.target.files || e.dataTransfer.files;

        for(var i = 0; i < files.length; i++) {
            objUrl = this.getObjectURL(files[i]);
            var extStart = filepath.lastIndexOf(".");
            var ext = filepath.substring(extStart, filepath.length).toUpperCase();
            /*
             描述：鉴定每个图片上传尾椎限制
             * */
            if(ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
                $(".shade").fadeIn(500);
                $(".text_span").text("图片限于bmp,png,gif,jpeg,jpg格式");
                this.ImgArr=[];
                return false;
            } else {
                /*
                 若规则全部通过则在此提交url到后台数据库
                 * */
                 img_html = "<div class='isImg' style='display:inline-block;'>" +
                        "<img src='" + objUrl + "' style='height:300px; width: auto;' />" +
                        "</div>";
                    img_div.append(img_html);
                this.ImgArr.push(files[i]);
            }
        }
        return true;
    },

      /*
     描述：鉴定每个浏览器上传图片url 目前没有合并到Ie
     * */
    getObjectURL(file) {
      var url = null;
      if(window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
      } else if(window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
      } else if(window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },

    ImgDel(item,idx){
       let params={
        sid:this.Sid,
        id:item.id
       };

      let that = this;

       api.activityDel(params).then(function(res){
          alert(res.data.Msg);
          if(res.data.Code ==3){
             that.activities.splice(idx,1);
          }
       }).catch(function(err){
          console.log(err);
       });
    },
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

    .img-inner{
      width:100%;
      height:auto;
    }

    .img-inner .isImg img{
        height:300px;

    }

    .isImg{
      display:inline-block;
    }

    .a-upload{
      width:165px;
      height:147px;
      overflow:hidden;
      position:relative;
      display:block;
    }

    .a-upload input{
      position:absolute;
      left:0;
      width:100%;
      height:100%;
      top:50%;
      opacity:0;
    }

    #userTable th,#userTable td{
        padding:5px 0;
        border:1px solid #ececec;
    }

    #userTable tr:hover{
        background-color:#f7f7f7;
    }

   #userTable tr:nth-child(odd){
        background-color:#f7f7f7;
   }
</style>
