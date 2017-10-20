<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <ul class="list-inline">
                <li><h3>推广链接详情</h3></li>
                <li class="pull-right" style="margin-top:15px;">
                <router-link to="/promotelinks"
                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                    返回
                </router-link>
            </li>
            </ul>
            <hr/>

            <!-- 展示  -->
            <div>
            <span>选择年份:</span>
                <div class="input-append date form_datetime" id="form_datetime" style="display:inline-block; vertical-align:top;">
                    <input size="16" type="text" value="" class="form-control" readonly>
                    <span class="add-on" style="height:35px;"><i class="icon-th" ></i></span>
                </div>
            </div>
            <div id="main" style="height:400px"></div>
             <!-- table展示  -->
             <table class="text-center" border="1" width="100%" >
                  <thead>
                      <th  class="text-center">时间</th>
                      <th  class="text-center">点击数</th>
                      <th  class="text-center">转化数</th>
                  </thead>
                  <tbody>
                      <tr v-for="item in Datas">
                          <td>{{item.DatePd | unix}}</td>
                          <td>{{item.Clicks}}</td>
                          <td>{{item.Users}}</td>
                      </tr>
                  </tbody>
              </table>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
// 实例化api
const api = new API();

import axios from 'axios'

import env from '@/config/env'

//import Echarts from 'echarts'

import Echarts from '../../static/echarts/echarts.min.js';

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.js';

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js';

export default {
    name: 'promote-links-details',
    data() {
        return {
            Sid: '',
            timeryear:'',
            Account:{},
            Datas:[],  //table展示
        }
    },
    filters:{
         unix:function(value){
            //获取一个事件戳
             var time = new Date(value*1000);
             //获取年份信息
             var y = time.getFullYear();
             //获取月份信息，月份是从0开始的
             var m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
             //获取天数信息
             //获取天数信息
             var d = (time.getDate())<10?('0'+time.getDate()):time.getDate();

             var H=(time.getHours())<10?('0'+time.getHours()):time.getHours();

             var M=(time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
             //返回拼接信息
             return y+'-'+m;
        },
    },
    mounted() {
        this.Sid = JSON.parse(window.localStorage.getItem('user')).SessionId;
        //this.checkLogin();

        this.initData();
    },
    methods: {
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

        //查询推广人员列表
        initData(){
             this.timeryear = new Date().getFullYear();
             let Timeryear=$(".form_datetime").datetimepicker({
                format: "yyyy",
                 autoclose: true,
                todayBtn: true,
                language:'zh-CN',
                startView:4,
                minView:4,
                pickerPosition: "bottom-left",
            });

            $("#form_datetime input").val(this.timeryear);

            Timeryear.on('changeDate', function(ev){
                this.timeryear = new Date(ev.date.valueOf()).getFullYear();
            });

            this.Account = this.getUrlParms();

            //按月统计转化数和点击数

            this.statics();
        },

        statics(){
            let params={
                sid:this.Sid,
                account:this.Account.account,
            };

            let that = this;

            api.promoteLinkStatic(params).then(function(res){
                //console.log(res.data);
                if(res.data.Code ==3){
                    that.showEcharts(res.data.Data);

                    that.Datas = res.data.Data;
                }
            }).catch(function(err){
                console.log(err);
            });
        },

        showEcharts(arr){
            let arr_len = arr.length;

            let timerArr=[],transArr=[],clickArr=[];

            for(let i=0; i<arr_len;i++){
                timerArr.push(this.dateStamp(arr[i].DatePd));

                transArr.push(arr[i].Users);

                clickArr.push(arr[i].Clicks);
            }

            let option = {
                   title: {
                       text: "推广链接详情",
                       x: "center"
                   },
                   tooltip: {
                       trigger: "item",
                       formatter: "{a} <br/>{b} : {c}"
                   },
                   legend: {
                       x: 'left',
                       data: ["转化数", "点击数"]
                   },
                   xAxis: [
                       {
                           type: "category",
                           name: "x",
                           splitLine: {show: false},
                           data: timerArr,
                       }
                   ],
                   yAxis: [
                       {
                           type: "log",
                           name: "y"
                       }
                   ],
                    toolbox: {
                       show: true,
                       feature: {
                           mark: {
                               show: true
                           },
                           dataView: {
                               show: false,
                               readOnly: true
                           },
                           restore: {
                               show: true
                           },
                           saveAsImage: {
                               show: true
                           }
                       }
                   },
                   calculable: true,
                   series: [
                       {
                           name: "点击数",
                           type: "line",
                           data: clickArr,

                       },
                       {
                           name: "转化数",
                           type: "line",
                           data: transArr

                       }
                   ]
                };

            var myChart = Echarts.init(document.getElementById('main'));

            // 为echarts对象加载数据
            myChart.setOption(option);
        },

        getUrlParms() {
            var args = new Object();
            var query = location.href; //获取查询串
            var pairs = query.split("?"); //在逗号处断开
            for(var i = 0; i < pairs.length; i++){
                var pos = pairs[i].indexOf('='); //查找name=value
                if(pos == -1) continue; //如果没有找到就跳过
                var argname = pairs[i].substring(0, pos); //提取name
                var value = pairs[i].substring(pos + 1); //提取value
                args[argname] = decodeURI(value); //存为属性
            }
            return args;
        },

        dateStamp(value){
            //获取一个事件戳
             var time = new Date(value*1000);
             //获取年份信息
             var y = time.getFullYear();
             //获取月份信息，月份是从0开始的
             var m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
             //获取天数信息
             //获取天数信息
             var d = (time.getDate())<10?('0'+time.getDate()):time.getDate();

             var H=(time.getHours())<10?('0'+time.getHours()):time.getHours();

             var M=(time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
             //返回拼接信息
             return y+'-'+m;
        },


    }
}
</script>

<style >
  .required{
    color:#f00;
  }

  #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }

    th,td{
        padding:5px 0;
        border:1px solid #ececec;
        color:#333;
    }
</style>
