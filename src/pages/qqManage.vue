<template>
    <div id="page-wrapper" >
        <div id="page-inner">
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
                          <span v-show="!item.flag">{{item.name}} </span>
                          <span v-show="item.flag"><input type="text" :name="index" v-model="item.name" style="height:35px;"></span>
                      </td>
                      <td>
                          <button class="btn btn-primary" @click="changeEditable(item)" v-show="!item.flag">修改</button>
                          <span class="btn btn-primary" @click="submitqq(item)" v-show="item.flag" >提交</span>
                          <button class="btn btn-danger" @click="removeProduct(item.id,index)">删除</button>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'qqManage',
  data (){
    return {
        Sid:'',
        currentItems:'',
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{
    initData(){
      let that = this;
      api.qqQuery().then(function(res){
        console.log(res.data);
      }).catch(function(err){
          console.log(err);
      });
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
