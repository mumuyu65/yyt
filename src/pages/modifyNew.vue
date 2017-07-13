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
                        资讯图片:
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
                                <button class="btn btn-danger" @click="modifyNew()">提交</button>
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
  name: 'modifyNew',
  data(){
    return{
        Sid:'',
        Uid:'',
        Title:'',
        Img:'',
        Content:'',
        Type:'',
        options:[],
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
                let urlargs=that.getUrlParams();
                 that.Type= urlargs.type;
                 that.Uid= urlargs.id;
                 that.Img= urlargs.img;
                 that.Content= urlargs.content;
                 that.Title= urlargs.title;
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });


    },
    getUrlParams() {
        var args = new Object();
        var query = location.hash.substring(13); //获取查询串
        var pairs = query.split("&"); //在逗号处断开
        for(var i = 0; i < pairs.length; i++){
            var pos = pairs[i].indexOf('='); //查找name=value
            if(pos == -1) continue; //如果没有找到就跳过
            var argname = pairs[i].substring(0, pos); //提取name
            var value = pairs[i].substring(pos + 1); //提取value
            args[argname] = decodeURI(value); //存为属性
        }
        return args;
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
            console.log(this.Img);
          };
            reader.readAsDataURL(file);
    },

    modifyNew(){
        let params={
            sid:this.Sid,
            id:this.Uid,
            title:this.Title,
            img:this.Img,
            content:this.Content,
            type:this.Type,
        };

        //TODO
        let that = this;
        api.modifyNews(params).then(function(res){
            console.log(res.data);
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
