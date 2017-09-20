<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <div v-show="!addQQ">
            <div v-show="!modifyqq">
              <ul class="list-inline">
                  <li><h3>qq客服管理</h3></li>
                  <li class="pull-right" style="margin-top:15px;">
                      <button @click="addqq()"
                          style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                          <i class="fa fa-plus fa-1x"></i>新增客服
                      </button>
                  </li>
              </ul>
              <hr/>
              <table id="productsTable" class="text-center" border="1" width="100%">
                  <thead>
                      <th  class="text-center">编号</th>
                      <th  class="text-center">qq号码</th>
                      <th  class="text-center">简介</th>
                      <th  class="text-center">操作</th>
                  </thead>
                  <tbody>
                      <tr v-for="(item, index) in currentItems">
                          <td>{{index +1}}</td>
                          <td>
                              {{item.qq}}
                          </td>
                          <td>
                              {{item.item}}
                          </td>
                          <td>
                              <button class="btn btn-primary" @click="changeEditable(item)">修改</button>
                              <button class="btn btn-danger" @click="removeqq(item,index)">删除</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>
          </div>
          <!-- 新增qq账号 -->
          <div v-show="addQQ" style="margin:50px 20px;">
             <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>qq：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='number' value="" style="height:30px;" v-model="qqNum"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>客服昵称:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                      <input type='text' value="" style="height:30px;" v-model="qqNick"/>
                      <div style="margin-top:20px;">
                          <button class="btn btn-danger" @click="changeQQ()">提交</button>
                          <button class="btn btn-default" @click="Cancel()">取消</button>
                      </div>
                    </div>
                </div>
          </div>

          <!-- 修改qq账号 -->
          <div v-show="modifyqq" style="margin:50px 20px;">
             <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>qq：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='number' value="" style="height:30px;" v-model="modifyqqNum"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span>客服昵称:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                      <input type='text' value="" style="height:30px;" v-model="modifyqqNick"/>
                      <div style="margin-top:20px;">
                          <button class="btn btn-danger" @click="modifyQQ()">提交</button>
                          <button class="btn btn-default" @click="modifyCancel()">取消</button>
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

import axios from 'axios'

import env from '@/config/env'

export default {
  name: 'qqManage',
  data (){
    return {
        Sid:'',
        currentItems:'',
        addQQ:false,
        qqNum:'',
        qqNick:'',
        modifyqqNum:'',
        modifyqqNick:'',
        modifyqq:false,
    }
  },
  mounted (){
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
      api.qqQuery().then(function(res){
        if(res.data.Code ==3){
          that.currentItems = res.data.Data;
        }
      }).catch(function(err){
          console.log(err);
      });
    },

    addqq(){
      this.addQQ = !this.addQQ;
    },

    changeQQ(){
      let params={
        sid:this.Sid,
        item:this.qqNick,
        qq:this.qqNum
      };

      let that = this;
      api.qqAdd(params).then(function(res){
          alert(res.data.Msg);
          if(res.data.Code ==3){
             that.addQQ = !that.addQQ;
             that.initData();
          }
      }).catch(function(err){
          console.log(err);
      });
    },

    Cancel(){
      this.addQQ = !this.addQQ;
    },

    changeEditable(item){
        this.modifyqq = !this.modifyqq;
        this.modifyqqNum = item.qq;
        this.modifyqqNick = item.item;
        this.modifyId = item.id
    },

    modifyQQ(){
      let params={
        sid:this.Sid,
        id:this.modifyId,
        item:this.modifyqqNick,
        qq:this.modifyqqNum
      };

        let that = this;
        api.qqModify(params).then(function(res){
          alert(res.data.Msg);
          if(res.data.Code ==3){
            that.modifyqq = !that.modifyqq;
            window.location.reload();
          }
        }).catch(function(err){
            console.log(err);
        });
    },

    modifyCancel(){
      this.modifyqq = !this.modifyqq;
    },

    removeqq(item,idx){
      let params={
        sid:this.Sid,
        id:item.id
      };

      let that = this;

      api.qqDel(params).then(function(res){
        alert(res.data.Msg);
        if(res.data.Code ==3){
          that.currentItems.splice(idx,1);
        }
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
