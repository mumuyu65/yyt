<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div class="row">
                    <div class="col-md-12">
                        <ul class="list-inline">
                            <li><h3>用户等级管理</h3></li>
                            <li class="pull-right" style="margin-top:15px;">
                                <button
                                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                    <i class="fa fa-plus fa-1x"></i>新增等级
                                </button>
                            </li>
                        </ul>
                    <hr/>
                    <table id="productsTable" class="text-center" border="1" width="100%">
                        <thead>
                            <th  class="text-center">编号</th>
                            <th  class="text-center">用户账户</th>
                            <th  class="text-center">等级名称</th>
                            <th  class="text-center">等级图标</th>
                            <th  class="text-center">操作</th>
                        </thead>
                        <tbody>

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

export default {
  name: 'userLevel',
  data (){
    return {
        Sid:'',
        newData: '',
        userLevels:[],
        Num:0,
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{

  },
}
</script>

<style scoped>
   #productsTable th,#productsTable td{
        padding:5px 0;
        border:1px solid #ececec;
   }

</style>
