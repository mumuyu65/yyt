<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <ul class="list-inline">
              <li><h3>微信二维码管理</h3></li>
          </ul>
          <hr/>
          <div style="width:700px;margin:0 auto; margin-top:50px;">
             <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>二维码:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                         <ul class="list-inline">
                          <li><img v-bind:src="qrcodes.img_url" id="file" class="profile"/></li>
                          <li style="position:relative;">
                            <input type="file" @change="onFileChange" value="上传图片" style="position:absolute; opacity:0;"/>
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
  },
  methods:{
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

            let params={
                sid:that.Sid,
                img:that.qrcodes.img_url
            };

            api.qrcodeUpdate(params).then(function(res){
              alert(res.data.Msg);
            }).catch(function(err){
              console.log(err);
            });
          };
          reader.readAsDataURL(file);
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
