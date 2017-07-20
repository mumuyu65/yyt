<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <h3>添加用户等级</h3>
          <hr/>
          <div style="width:700px; margin:0 auto; margin-top:50px;">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        等级名称：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type='text' value="" class="form-control" v-model="level"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        等级图标:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <img v-bind:src="Img"/>
                        <input type="file" @change="onFileChange" ref="uploadimg" value="上传图片"/>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        积分上限:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type="number" class="form-control" v-model="score_lower"/>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        积分下限:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type="number" class="form-control" v-model="score_higher"/>
                    </div>
                </div>
                <div style="margin-top:20px;">
                        <button class="btn btn-danger" @click="addLevel()">提交</button>
                        <router-link to="/userlevel"><button class="btn btn-default pull-right">取消</button></router-link>
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
  name: 'userLeveladd',
  data (){
    return {
        Sid:'',
        level:'',
        Img:'',
        score_lower:'',
        score_higher:'',
        lid:'',
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{
    initData(){
      let that = this;
      api.queryUserLevel().then(function(res){
          if(res.data.Code ==3){
              let templateObj = res.data.Data;
              that.lid = templateObj[templateObj.length-1].lid++;
          }
      }).catch(function(err){
          console.log(err);
      });
    },

    addLevel(){
      let input = this.$refs.uploadimg;

      let data = new FormData();

      data.append('sid',this.Sid);
      data.append('fid',0);
      data.append('lid',this.lid);
      data.append('role_name',this.level);
      data.append('roleimg',input.files[0]);
      data.append('score_lower',this.score_lower);
      data.append('score_upper',this.score_higher);

      let that = this;
      axios.post(env.baseUrl+'/cycj/level/add', data, {
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (res) {
            alert(res.data.Msg);
          if(res.data.Code ==3){
             that.$router.push('/userlevel');
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    },

    onFileChange(e){
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    createImage(file) {
      let reader = new FileReader();
      let that = this;

      reader.onload = (e) => {
        that.Img = e.target.result;
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
</style>
