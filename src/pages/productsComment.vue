<template>
    <div id="page-wrapper" >
        <div id="page-inner">
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
            <div v-show="!AddComments">
              <div v-show="!modifyComments">
                <table class="text-center" border="1" width="100%" id="productsTable">
                    <thead>
                        <th  class="text-center">编号</th>
                        <th  class="text-center">产品类别</th>
                        <th  class="text-center">产品名称</th>
                        <th  class="text-center">封面图片</th>
                        <th  class="text-center">简介</th>
                        <th  class="text-center">审核</th>
                        <th  class="text-center">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in productComments" v-if="item.status">
                          <td>{{index+1}}</td>
                          <td>{{item.productName}}</td>
                          <td>{{item.title}}</td>
                          <td>
                            <img v-bind:src='item.cover_img' style="height:50px;" />
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
            <!-- 添加 -->
            <div style="width:700px;margin:0 auto; margin-top:50px;" v-show="AddComments">
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
                        <textarea cols='40' rows='10' class="form-control" v-model="Intro"></textarea>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="addComment()">提交</button>
                                <button style="margin-left:50px;" class="btn btn-default" @click="Cancel()">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 修改 -->
            <div style="width:700px;margin:0 auto; margin-top:50px;" v-show="modifyComments">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>产品类别：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <select v-model="modifySelected">
                            <option v-for="modifyOption in ModifyOptions" v-bind:value="modifyOption.cgid">
                                    {{ modifyOption.name }}
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
        ModifyOptions:[],
        //修改
        modifyComments:false,
        modifySelected:'',
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
    this.initProduct();
  },
  methods:{
    //查询
    initProduct(){
        let that = this;
        //产品管理类别
        api.queryCategory().then(function(res){
            if(res.data.Code ==3){
                that.options = res.data.Data;
                that.ModifyOptions = res.data.Data;
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
                let len= templateComments.length;
                for(var i = 0; i<len; i++){
                  for(var j=0; j<that.options.length;j++){
                     if(templateComments[i].cgid == that.options[j].id){
                        templateComments[i].productName=that.options[j].name;
                      }
                  }
                }
                that.productComments = templateComments;

                console.log(that.productComments);
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
            //预览
            $("#modifyFile").attr("src",that.modifyImg);
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
      console.log(item);
      this.modifyComments =!this.modifyComments;
      this.modifySelected = item.cgid;
      this.modifyTitle = item.title;
      this.modifyImg = item.cover_img;
      this.modifyIntro = item.intro;
      this.modifyId = item.id;
    },

    modifyProductsComment(){
      let input = this.$refs.uploadmodify;
      let data = new FormData();
      data.append('sid',this.Sid);
      data.append('cgid',this.modifySelected);
      data.append('title',this.modifyTitle);
      data.append('img', input.files[0]);
      data.append('id',this.modifyId);
      data.append('intro',this.modifyIntro);
      let that = this;
      console.log(that.modifySelected);
      axios.post(env.baseUrl+'/cycj/forecast/modify', data, {
          headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .then(function (res) {
        alert(res.data.Msg);
        if(res.data.Code ==3){
          that.modifyComments =!that.modifyComments;
          window.location.reload();
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
