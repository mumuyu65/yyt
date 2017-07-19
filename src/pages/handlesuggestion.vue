<template>
<div id="page-wrapper">
    <div id="page-inner">
        <ul class="list-inline">
            <li><h3>操作建议管理</h3></li>
            <li class="pull-right" style="margin-top:15px;">
                <router-link :to="{ path: '/handlesuggestion/add' }">
                    <button
                        style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                        <i class="fa fa-plus fa-1x"></i>新增操盘建议
                    </button>
                </router-link>
            </li>
        </ul>
        <!-- 搜索区域  -->
        <ol class="list-inline">
            <li>开始时间：</li>
            <li><input type="text" class="form-control form_datetime" id="start_time" /></li>
            <li>结束时间:</li>
            <li><input type="text" class="form-control form_datetime" id="end_time" /></li>
            <li>商品:</li>
            <li>
                <select class="form-control" v-model="prize">
                    <option v-for="p in all_prizes" :value="p.id">{{p.name}}</option>
                </select>
            </li>
            <li>分析师:</li>
            <li>
                <select class="form-control" v-model="teacher">
                    <option v-for="t in all_teachers" :value="t.id">{{t.nick}}</option>
                </select>
            </li>
            <li><button class="btn btn-danger" @click="getHandleSuggestion">搜索</button></li>
        </ol>
        <hr/>
        <ul class="nav nav-tabs">
            <li v-bind:class="{'active':item.flag}" v-for="(item,index) in clanItems">
              <a style="cursor:pointer;" @click="changeFlag(item,index)">{{item.value}}</a>
            </li>
        </ul>
        <!-- table展示区域  -->
        <table class="text-center" border="1" width="100%" id="productsTable">
            <thead>
                <th  class="text-center">开仓时间</th>
                <th  class="text-center">类型</th>
                <th  class="text-center">仓位</th>
                <th  class="text-center">产品</th>
                <th  class="text-center">开仓价</th>
                <th  class="text-center">止损价</th>
                <th  class="text-center">止盈价</th>
                <th  class="text-center">结果</th>
                <th  class="text-center">麦单类型</th>
                <th  class="text-center">操作</th>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.js';

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js';

export default {
name: 'handlesuggestion',
mounted(){
    this.Sid = JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
},
data (){
    return {
        Sid: '',
        start_time:'',
        end_time: '',
        prize: '',
        teacher: '',
        all_prizes: [],
        all_teachers: [],
        clanItems:[
          {value:'大厅直播',platform:'大厅直播',flag:true},
          {value:'战队直播',platform:'战队直播',flag:false},
        ],
    }
},
methods:{
    initData() {
        //时间
        $(".form_datetime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            todayBtn: true,
            language:'zh-CN',
            pickerPosition: "bottom",
            initialDate:new Date()
        });

        //商品
        let that = this;
        api.queryCategory().then(function(res){
            if(res.data.Code ==3){
                //console.log(res.data);
                that.all_prizes = res.data.Data;
            }
            else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });

        //老师列表
        let params={
            sid:this.Sid,
            flag:1,
            begidx:0,
            counts:100,
        };

        api.categoryUser(params).then(function(res){
            //console.log(res.data);
            if(res.data.Code ==3){
                that.all_teachers = res.data.Data.Detail;
            }
            else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });

    },

    //搜索
    getHandleSuggestion() {
        let param = {
            bdt: this.dateToUnix($("#start_time").val()),
            edt: this.dateToUnix($("#end_time").val()),
            category_id: this.prize,
            analysts: this.teacher,
            begidx: 0,
            countes: 100
        }
        if (param.bdt < param.edt) {
            api.queryHandleSuggestion(param).then(function(res) {
                console.log(res.data);
                if (res.data.Code == 3) {
                    if (res.data.Data == null) {
                        alert('暂无数据')
                    }
                }
            }).catch(function(err) {
                console.log(err)
            })
        } else {
            alert('结束时间不得小于开始时间')
        }
    },

    //时间转换
    dateToUnix(time) {
        let arr = time.replace(/ |:/g, '-').split('-');
        let oDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]).getTime()/1000;
        return oDate;
    },

    //tab标签切换
    changeFlag(item){
        for(let i=0; i<2;i++){
            this.clanItems[i].flag = false;
        }
        item.flag= true;
    },
}
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
