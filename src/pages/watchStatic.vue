<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <ul class="list-inline">
                <li><h3>用户管理/观看时间(功能未完成)</h3></li>
                <li class="pull-right">{{DateShow}}</li>
            </ul>
            <hr/>

            <ul class="list-inline" style="margin-bottom:50px;">
              <li>输入日期:</li>
              <li><input type="number" class="form-control" v-model="Year"/></li>
              <li>年</li>
              <li><input type="number" class="form-control" v-model="Month"/></li>
              <li>月</li>
              <li><input type="number" class="form-control" v-model="uDate"/></li>
              <li>日</li>
            </ul>

            <div id="main" style="height:500px;"></div>



            <!--  用户其他行为  -->
            <div style="position:absolute; left:300px; top:250px; z-index:9999;">
                <div style="display:inline-block; vertical-align:top;">
                  <span>直播间选择:</span>
                  <select v-model="selected">
                      <option v-for="option in liveList" v-bind:value="option.title">
                              {{ option.title }}
                      </option>
                  </select>
                </div>
            </div>
            <div style="position:absolute; right:90px; top:350px; z-index:9999;">
              <ul class="list-unstyled" style="display:inline-block;">
                    <li v-for="item in dateSelects" style="margin-bottom:10px;" >
                      <button  class="btn " @click="changeStatics(item)" v-bind:class="{'btn-danger':item.active}">{{item.value}}</button>
                    </li>
                </ul>
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

import Echarts from '../../static/echarts/echarts.min.js';

export default {
  name: 'watchStatic',
  data (){
    return {
        Sid:'',
        dateSelects:[
          {id:1,type:0,value:'年',active:false},{id:2,type:1,value:'月',active:false},{id:3,type:2,value:'日',active:false}],
        liveList:[],
        selected:'',
        DateShow:'',
        Year:new Date().getFullYear(),
        Month:(new Date().getMonth()+1)<10?('0'+(new Date().getMonth()+1)):(new Date().getMonth()+1),
        uDate:(new Date().getDate())<10?('0'+new Date().getDate()):new Date().getDate(),
    }
  },
  watch:{
    Year:'searchYear',
    Month:'searchMonth',
    uDate:'searchDate',
    selected:'searchLive',
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;

    //this.checkLogin();

    this.queryLive();   //查询直播间
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

    //查询直播间
    queryLive(){
      let that = this;

      let param = {
          begidx:0,
          counts:100
      }

      api.getLive(param).then(function(res){
            if(res.data.Code ==3){
                if(res.data.Data.length == 0){
                    console.log('没有直播房间!');
                }else{
                    that.liveList = res.data.Data;

                    that.selected = that.liveList[0].title;

                    that.showEcharts(that.dateSelects[2],that.liveList[0]);
                }
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });

    },


    changeStatics(item){
      for(let i=0; i<3;i++){
        this.dateSelects[i].active = false;
      }
      item.active = true;

      if(item.type ==0){
         this.Period = item.type;

         this.Statics();
      }
      else if(item.type ==1){
         this.Period = item.type;

         this.Statics();
      }else{
        this.Period = item.type;

        this.Statics();
      }
    },

    //用户观看时长统计
    Statics(){
       let params={
          sid:this.Sid,
          live:this.selected,
          period:this.Period,
          year:this.Year,
          month:this.Month,
          day:this.uDate
       };

       let that = this;
       /*
       api.webModuleStatic(params).then(function(res){
          if(res.data.Code ==3){
            //console.log(res.data.Data);
            that.showEcharts(res.data.Data);
          }else if(res.data.Code ==6){
            alert(res.data.Msg);
          }
       }).catch(function(err){
          console.log(err);
       });

       */

       this.showEcharts([]);
    },


    showEcharts(arr){
        let len = arr.length;

        let Datas=[],showDate=[];


        for(let i=0; i<len; i++){
            Datas.push([]);

        if(this.Period == 2){
          showDate.push(this.DayTrans(arr[i].DatePd));
        }else if(this.Period == 1){
          showDate.push(this.monthTrans(arr[i].DatePd));
        }else{
          showDate.push(this.yearTrans(arr[i].DatePd));
        }
      }

      let option = {
            legend: {
                data:['观看直播间的时长']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            tooltip : {
                trigger: 'axis',
                formatter: "Temperature : <br/>{b}km : {c}°C"
            },
            xAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisLine : {onZero: false},
                    axisLabel : {
                        formatter: '{value} km'
                    },
                    boundaryGap : false,
                    data : ['0', '10', '20', '30', '40', '50', '60', '70', '80']
                }
            ],
            series : [
                {
                    name:'观看直播间的时长',
                    type:'line',
                    smooth:true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor : 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    data:[15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
                }
            ]
        };

      let myChart = Echarts.init(document.getElementById('main'));

      // 为echarts对象加载数据
      myChart.setOption(option);
    },


    searchYear(curVal,oldVal){
        this.Period = 0;

        this.changeStatics(this.dateSelects[0]);
    },

    searchMonth(curVal,oldVal){
        this.Period = 1;
        this.changeStatics(this.dateSelects[1]);
    },

    searchDate(curVal,oldVal){
        this.Period = 2;
        this.changeStatics(this.dateSelects[2]);
    },

    searchLive(curVal,oldVal){
       this.changeStatics(this.dateSelects[2]);
    },


  },
}
</script>

<style scoped>

</style>
