<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <ul class="list-inline">
              <li><h3>微信二维码管理</h3></li>
          </ul>
          <hr/>
          <div style="margin:0 auto; padding:20px;">
             <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>二维码:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                         <ul class="list-inline">
                          <li><img v-bind:src="qrcodes.img_url" id="file" class="profile"/></li>
                          <li style="position:relative;">
                            <input type="file" @change="onFileChange" ref="upload" value="上传图片" style="position:absolute; opacity:0;"/>
                            <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                上传图片
                            </button>
                          </li>
                      </ul>
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
  name: 'qrcode',
  data (){
    return {
        Sid:'',
        qrcodes:{},
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
      api.qrcodeQuery().then(function(res){
        if(res.data.Code ==3){
             let templateObj= res.data.Data;
             that.qrcodes= templateObj[0];
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
          that.qrcodes.img_url = e.target.result;
          //预览
          $("#file").attr("src",that.qrcodes.img_url);

          that.changeqrcode();

        };
      reader.readAsDataURL(file);
    },

    changeqrcode(){
        let input = this.$refs.upload;
        let data = new FormData();
        data.append('img', input.files[0]);
        data.append('sid',this.Sid);

        axios.post(env.baseUrl+'/cycj/wxcode/update', data, {
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
