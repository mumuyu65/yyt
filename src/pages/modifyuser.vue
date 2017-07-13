<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div style="width:700px;margin:0 auto; margin-top:50px;">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>用户账户：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type='text' value="" style="height:30px;" v-model="user.account" disabled/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        <span class="required">*</span> 用户昵称:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='text' value="" style="height:30px;" v-model="user.nick"/>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        <span class="required">*</span> 用户角色:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <select v-model="user.flag">
                            <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                            </option>
                        </select>
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
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="modifyuser()">提交</button>
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
  name: 'AddUser',
  data (){
    return {
        user:{
            account:'',
            nick:'',
            img:'',
            intro:'',
            flag:'',
        },
        Sid:'',
        Uid:'',
        options: [
          { text: '普通用户', value: '0' },
          { text: '老师', value: '1' },
          { text: '审核员', value: '2' },
          { text: '管理员', value: '3' }
        ],
    }
  },
   mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    let urlargs=this.getUrlParams();
    this.user.account = urlargs.account;
    this.Uid = urlargs.id;
    this.user.img =urlargs.img;
    this.initData();
  },
  methods:{
    modifyuser(){
        let params={
            sid:this.Sid,
            uid:this.Uid,
            nick:this.user.nick,
            img:this.user.img,
            intro:this.user.intro,
            flag:this.user.flag,
        };

        let that = this;

        api.modifyUser(params).then(function(res){
            if(res.data.Code ==3){
                alert(res.data.Msg);
                that.$router.push('index');
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

    initData(){
        let params={
            sid:this.Sid,
            account: this.user.account
        };

        let that = this;

        api.querySpecifyuser(params).then(function(res){
            if(res.data.Code ==3){
                that.user.flag = res.data.Data[0].flag;
                that.user.nick =res.data.Data[0].nick;
                that.user.intro = res.data.Data[0].intro;
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
            that.user.img = e.target.result;
          };
            reader.readAsDataURL(file);
    },

    Cancel(){
         this.$router.push('index');
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
