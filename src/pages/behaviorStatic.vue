<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <ul class="list-inline">
                <li><h3>用户管理/用户行为</h3></li>
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

            <h2 class="text-center">{{DateShow}}</h2>
            <!--  用户其他行为  -->
            <div class="list-unstyled" style="position:absolute; left:300px; top:330px; z-index:9999;">
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
  name: 'behaviorStatic',
  data (){
    return {
        Sid:'',
        dateSelects:[
          {id:1,type:0,value:'年',active:false},{id:2,type:1,value:'月',active:false},{id:3,type:2,value:'日',active:false}],
        Year:new Date().getFullYear(),
        Month:(new Date().getMonth()+1)<10?('0'+(new Date().getMonth()+1)):(new Date().getMonth()+1),
        uDate:(new Date().getDate())<10?('0'+new Date().getDate()):new Date().getDate(),
        DateShow:'',
        Period:2,
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;

    //this.checkLogin();

    this.changeStatics(this.dateSelects[2]);
  },
  watch:{
    Year:'searchYear',
    Month:'searchMonth',
    uDate:'searchDate'
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


    //网站模块访问统计
    Statics(){
       let params={
          sid:this.Sid,
          period:this.Period,
          year:this.Year,
          month:this.Month,
          day:this.uDate
       };

       let that = this;

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
    },

    showEcharts(arr){
      let Calendars=[],CourseWare=[],newsCore=[],newStock=[],schedules=[],Tideas=[],showDate=[];

      let len = arr.length;

      //console.log(this.Period);

      for(let i=0; i<len; i++){
        Calendars.push(arr[i].Calendar);

        CourseWare.push(arr[i].Courware);

        newsCore.push(arr[i].News_Core);

        newStock.push(arr[i].News_Stock);

        schedules.push(arr[i].Schedule);

        Tideas.push(arr[i].Tidea);

        if(this.Period == 2){
          showDate.push(this.DayTrans(arr[i].DatePd));
        }else if(this.Period == 1){
          showDate.push(this.monthTrans(arr[i].DatePd));
        }else{
          showDate.push(this.yearTrans(arr[i].DatePd));
        }
      }


      let option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['课程安排','讲师观点','核心内参','财经日历','学习课件','股市收评']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : showDate
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'课程安排',
                    type:'line',
                    stack: '总量',
                    data:CourseWare
                },
                {
                    name:'讲师观点',
                    type:'line',
                    stack: '总量',
                    data:Tideas
                },
                {
                    name:'核心内参',
                    type:'line',
                    stack: '总量',
                    data:newsCore
                },
                {
                    name:'财经日历',
                    type:'line',
                    stack: '总量',
                    data:Calendars
                },
                {
                    name:'学习课件',
                    type:'line',
                    stack: '总量',
                    data:CourseWare
                },
                {
                    name:'股市收评',
                    type:'line',
                    stack: '总量',
                    data:newStock
                }
            ]
        };

      let myChart = Echarts.init(document.getElementById('main'));

      // 为echarts对象加载数据
      myChart.setOption(option);
    },


    DayTrans(tm){
        let time = new Date(tm*1000);
        let h = (time.getHours())<10?('0'+time.getHours()):time.getHours();
        let min = (time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
        return h+':'+min+':00时';
    },

    monthTrans(tm){
        let time = new Date(tm*1000);
        let m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
        let d = (time.getDate())<10?('0'+time.getDate()):time.getDate();
        return d+'日';
    },

    yearTrans(tm){
      let time = new Date(tm*1000);
      let m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
      return m+'月';
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
  },
}
</script>

<style scoped>

</style>
