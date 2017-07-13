<template>
    <div id="page-wrapper" >
        <div id="page-inner" class="economics">
          <div>
            <div class="row">
                <div class="col-md-12">
                    <button class="pull-right" @click="addNewEconomicsType()"
                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                    <i class="fa fa-plus fa-1x"></i>新增资讯</button>
                </div>
            </div>
            <div id="toolbar">
                <button id="remove" class="btn btn-danger">
                    批量删除
                </button>
            </div>
            <table id="newsTypeTable"></table>
          </div>
        </div>
        <div v-if="newsEconomicsType">
            <div class="row">
                <div class="col-sm-3 col-md-3 col-xs-6">
                    资讯类型：
                </div>
                <div class="col-sm-9 col-md-9 col-xs-6">
                    <input type="text" value='' placeholder="请输入资讯类型" class="form-control" v-model="news.type"/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3 col-md-3 col-xs-6">
                    类型简介：
                </div>
                <div class="col-sm-9 col-md-9 col-xs-6">
                    <input type="text" value='' placeholder="请输入资讯类型简介" v-model="news.text" class="form-control"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import 'bootstrap-table'

export default {
  name: 'economicNewsType',
  data(){
    return{
      Sid:'',
      newsEconomicsType:false,
      news:{
        type:'',
        text:'',
      },
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
        console.log(res);
      }).catch(function(err){
        console.log(err);
      });
    },

    addNewEconomicsType(){
      this.newsEconomicsType = !this.newsEconomicsType;
      console.log(this.newsEconomicsType);
    },


  },
}
</script>

<style scoped>
   .economics>.row{
           margin:0 auto;
        margin-bottom:20px;
   }

   .economics>.row .col-md-5{
        background-color:#f3f3f3;
        margin:20px;
        padding:20px;
   }
</style>
