<template>
     <div id="page-wrapper" >
        <div id="page-inner">
            <div class="row">
                    <div class="col-md-12">
                        <ul class="list-inline">
                            <li><h3>新闻资讯类型管理</h3></li>
                            <li class="pull-right" style="margin-top:15px;">
                                <input type="text" value="" @keyup.enter="addType()" v-model="newData" style="height:35px; vertical-align:top;"/>
                                <button @click="addType()"
                                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                    <i class="fa fa-plus fa-1x"></i>新增资讯类型
                                </button>
                            </li>
                        </ul>
                    <hr/>
                    <table id="productsTable" class="text-center" border="1" width="100%">
                        <thead>
                            <th  class="text-center">编号</th>
                            <th  class="text-center">类型名称</th>
                            <th  class="text-center">操作</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in currentItems">
                                <td>{{index +1}}</td>
                                <td>
                                    <span v-show="!item.flag">{{item.text}} </span>
                                    <span v-show="item.flag"><input type="text" :name="index" v-model="item.name" style="height:35px;"></span>
                                </td>
                                <td>
                                    <button class="btn btn-danger" @click="removeType(item.type,index)">删除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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

import axios from 'axios'

import env from '@/config/env'

export default {
  name: 'economicNewsType',
  data(){
    return{
      Sid:'',
      currentItems:[],
      newData:'',
      Num:1,
    }
  },
  mounted(){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
    this.checkLogin();
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
      api.newsType().then(function(res){
        if(res.data.Code ==3){
          if(res.data.Data.Detail){
            that.currentItems = res.data.Data.Detail;
            that.Num = parseInt(that.currentItems[that.currentItems.length-1].type)+1;
          }
        }else{
             alert(res.data.Msg);
            }
      }).catch(function(err){
        console.log(err);
      });
    },

    removeType(Type,idx){
        let params={
          sid:this.Sid,
          type:Type,
        };

        let that = this;

        api.delnewsType(params).then(function(res){
            if(res.data.Code ==3){
              that.currentItems.splice(idx, 1);
            }
            alert(res.data.Msg);
        }).catch(function(err){
            console.log(err);
        });
    },

    addType(){
      if(this.newData){
        let params={
          sid:this.Sid,
          type:this.Num,
          text:this.newData
        };
        console.log(params);
        let that = this;
        api.addnewsType(params).then(function(res){
          if(res.data.Code ==3){
              that.newData ='';
              that.initData();
            }
          alert(res.data.Msg);
        }).catch(function(err){
          console.log(err);
        });
      }else{
        alert("资讯类型的输入内容不能为空！");
      }
    },
  },
}
</script>
<style scoped>
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
