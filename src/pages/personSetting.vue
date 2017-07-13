<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div style="width:700px; margin:0 auto; margin-top:50px;">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        昵称:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type='text' value="" style="height:30px;"  v-model="user.nick"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        头像:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type='file' value="" style="height:30px;"  v-model="user.nick"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        简介:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <textarea cols='50' rows='10'  v-model="user.context"></textarea>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="adduser()">提交</button>
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
        Sid:'',
    }
  },
   mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
  },
  methods:{
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
