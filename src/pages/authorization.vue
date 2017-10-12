<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <ul class="list-inline">
                <li><h3>权限分配</h3></li>
                <li style=" vertical-align:middle">
                    <input type="number" class="form-control" placeholder="请输入用户手机号" @keyup.enter="initData()" v-model="account">
                </li>
                <li><button class="btn btn-primary" @click="initData()" style="margin-bottom:10px;">搜索</button></li>
            </ul>
            <hr/>
            <ul class="nav nav-tabs">
                <li role="presentation" v-bind:class="{active:item.active}" @click="haveAuth(item)" style="cursor:pointer;" v-for="item in TableList">
                    <a>{{item.title}}</a>
                </li>
            </ul>
            <table id="qxTable" class="text-center" width="100%" border="1">

            </table>

            <table id="unqxTable" class="text-center" width="100%" border="1">

            </table>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import axios from 'axios'

import env from '@/config/env'

import 'bootstrap-table'

export default {
  name: 'authorization',
  data (){
    return {
        Sid:'',
        authList:[],
        account:'13545267410',
        TableList:[
        {id:0,title:'已开通权限',active:false},{id:1,title:'未开通权限',active:false}],
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
        this.haveAuth(this.TableList[0]);
        this.authList = [];
        $('#qxTable').bootstrapTable('destroy');
        $('#unqxTable').bootstrapTable('destroy');
    },
    haveAuth(item){
        let that = this;

        for(let i=0;i<2;i++){
            this.TableList[i].active = false;
        }

        item.active = true;

        let params={
            sid:that.Sid,
            account:this.account,
            flag:item.id
        };
        api.authQuery(params).then(function(res){
            if(res.data.Code == 3){
                that.authList = res.data.Data;
                //console.log(that.authList);
                let options ={
                    data:that.authList,
                    pagination:true,
                    striped:true,
                    paginationVAlign:'bottom',
                    paginationHAlign:'right',
                    columns: [{
                        field: 'id',
                        title: '权限ID',
                        formatter:function(val,row,idx){
                          return idx;
                        }
                    },{
                        field: 'name',
                        title: '名称'
                    },{
                      field:'uid',
                      title:'操作',
                      formatter:function(val,row,idx){
                        if(item.id == 0){
                            return '<button class="btn btn-danger mod">移除</button>'
                        }else{
                            return '<button class="btn btn-primary del">添加</button>'
                        }

                      },
                      events:{
                        'click .mod': function(e, value, row, index) {
                              //移除操作
                              that.changeState(row.id,1,row.uid);
                            },

                        'click .del': function(e, value, row, index) {
                              //添加操作
                              that.changeState(row.id,0,row.uid);
                            }
                        },

                    }]
                };
                if(item.id == 0){
                    $('#qxTable').bootstrapTable(options);
                    $('#unqxTable').bootstrapTable('destroy');
                }else{
                    $('#unqxTable').bootstrapTable(options);
                    $('#qxTable').bootstrapTable('destroy');
                }
            }else{
                alert(res.data.Msg)
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    changeState(aid,aod,uid){
        let that = this;
        let params={
            sid:that.Sid,
            aid:aid,
            account:this.account,
            uid:uid,
            aod:aod
        };
        api.authUser(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code == 3){
               that.initData();
            }
        }).catch(function(err){
            console.log(err);
        });
    }
  },
}
</script>

<style scoped lang="scss">
    #page-inner{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }
    #qxTable th,#qxTable td{
        padding:10px 0;
        border:1px solid #ececec;
   }

    #qxTable tr:hover{
        background-color:#f7f7f7;
    }

   #qxTable tr:nth-child(odd){
        background-color:#f7f7f7;
   }
</style>
