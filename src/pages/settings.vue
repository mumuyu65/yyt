<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div style="width:700px;margin:0 auto; margin-top:50px;">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>用户昵称：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='text' value="" style="height:30px;" v-model="user.nick"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>头像:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <img v-bind:src="user.img"/>
                        <input type="file" @change="onFileChange" value="上传图片"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        简介:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <textarea cols='40' rows='10' class="form-control" v-model="user.intro"></textarea>
                        <div style="margin-top:20px;" class="text-center">
                                <button class="btn btn-danger" @click="changeUser()">提交</button>
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

export default {
  name: 'Settings',
  data (){
    return {
        user:{},
        Sid:'',
    }
  },
   mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
  },
  methods:{
    //上传头像
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
            that.user.img = e.target.result;
          };
            reader.readAsDataURL(file);
    },
    //提交
    changeUser(){
        let params={
            sid:this.Sid,
            nick:user.nick,
            intro:user.intro,
            file:user.img
        };

        let that = this;

        api.personSettings(params).then(function(res){
            console.log(res.data);
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
</style>
