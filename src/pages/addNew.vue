<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div style="width:500px; margin:0 auto; margin-top:50px;">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        资讯类型：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <select v-model="Type" class="form-control">
                            <option v-for="option in options" v-bind:value="option.type">
                                    {{ option.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        资讯标题：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type="text" class="form-control" v-model="Title"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        上传图片:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <img v-bind:src="Img"/>
                        <input type="file" @change="onFileChange" value="上传图片"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        资讯内容:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <textarea cols='40' rows='10' class="form-control" v-model='Content'></textarea>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="addNews()">提交</button>
                                <button class="btn btn-default pull-right" @click="Cancel()">取消</button>
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
  name: 'AddNew',
  data(){
    return{
        Type:'',
        Title:'',
        Img:'',
        Content:'',
        options:[],
        Sid:'',
    }
  },
  mounted(){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{
    initData(){
        let that = this;
        api.newsType().then(function(res){
            if(res.data.Code ==3){
                that.options = res.data.Data;
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
          };
            reader.readAsDataURL(file);
    },

    addNews(){
        let params={
            sid:this.Sid,
            title:this.Title,
            img:this.Img,
            type:this.Type,
            content:this.Content,
        };
        let that = this;
        api.addNews(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                that.$router.push('/economicNews');
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    Cancel(){
        this.$router.push('/economicNews');
    }
  }
}
</script>

<style scoped>
    #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }
</style>
