<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div class="row">
                <div class="col-md-12">
                    <ul class="list-inline">
                        <li><h3>账号管理</h3></li>
                        <li class="pull-right" style="margin-top:15px;">
                            <button @click="addUser()"
                                style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                <i class="fa fa-plus fa-1x"></i>新增用户
                            </button>
                        </li>
                    </ul>
                <hr/>
                <div id="toolbar">
                    <button id="remove" class="btn btn-danger" @click='delUser()'>
                        批量删除
                    </button>
                </div>
                <table id="userTable" class="text-center"></table>
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
  name: 'Home',
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  data (){
    return {
        Sid:'',
        userlists:[],
    }
  },
  methods:{
    initData(){
        let that = this;
        let params={
            sid:that.Sid,
            begidx:0,
            counts:100,
            flag:-1,
        };
        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
                that.userlists = res.data.Data.Detail;
                 $('#userTable').bootstrapTable({
                        data:that.userlists,
                        striped:true,
                        toolbar:'#toolbar',
                        pagination:'true',
                        sidePagination:'server',
                        pageNumber:1,
                        pageSize:10,
                        pageList:[10,15,20,25,30],
                        search:true,
                        searchOnEnterKey:true,
                        showColumns:false,
                        showRefresh:false,
                        showToggle:false,
                        showPaginationSwitch:false,
                        searchAlign:'right',
                        toolbarAlign:'left',
                        sortable:true,
                        searchFormatter:true,
                        columns: [{
                            checkbox:true,
                        },{
                            field: 'id',
                            title: '序列号',
                            formatter:function(value,row,index){
                                return index+1;
                            }
                        },{
                            field: 'account',
                            title: '用户名'
                        }, {
                            field: 'nice',
                            title: '用户昵称'
                        }, {
                            field: 'flag',
                            title: '用户角色',
                            formatter:that.userLevel
                        },{
                            field: 'headurl',
                            title: '用户头像',
                            formatter:function(value,row,index){
                                return '<img src="'+value+'" alt="用户头像"/>';
                            }
                        },  {
                            field: 'intro',
                            title: '简介'
                        }, {
                            field: 'level',
                            title: '用户等级'
                        },  {
                            field: 'active',
                            title: '开启或关闭',
                            formatter:function(value,row,index){
                               switch(value) {
                               case '0': return '<button class="btn btn-primary">关闭</button>'; break;
                               case '1': return '<button class="btn btn-danger">开启</button>'; break;
                               }
                            }
                        }, {
                            title: '用户操作',
                            formatter:function(value,row,index){
                            return '<a href="#/modifyUser"><button class="btn btn-danger">修改</button></a>'
                            }
                        }],
                });
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    addUser(){
        this.$router.push('addUser');
    },

    userLevel(value,row,index){
        switch(value){
            case '0': return '普通用户'; break;
            case '1': return '老师'; break;
            case '2': return '审核员'; break;
            case '3': return '管理员'; break;
            case '4': return '超级管理员'; break;
        }
    },

    getIdSelections() {
        return $.map($("#userTable").bootstrapTable('getSelections'), function (row) {
            return row.account
        });
    },

    delUser(){
        let Account = this.getIdSelections();
         $("#userTable").bootstrapTable('remove', {
                field: 'account',
                values: Account
            });
        let params={
            sid:this.Sid,
            account:Account[0]
        };

         console.log(params);

        api.delUser(params).then(function(res){
            alert(res.data.Msg);
        }).catch(function(err){
            console.log(err);
        });
    }
  },
}
</script>

<style scoped>

</style>
