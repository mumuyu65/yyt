<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <ul class="list-inline">
                <li><h3>用户管理</h3></li>
                <li class="pull-right">{{DateShow}}</li>
            </ul>
            <hr/>
            <!-- 图表展示用户的最近行为   -->
            <div id="main" style="height:300px"></div>

            <ul class="list-unstyled" style="position:absolute; left:300px; top:230px; z-index:9999;">
                <li v-for="item in dateSelects" style="margin-bottom:10px;" >
                  <button  class="btn " @click="changeStatics(item)" v-bind:class="{'btn-danger':item.active}">{{item.value}}</button>
                </li>
            </ul>

            <!--  用户其他行为
            <ul class="list-unstyled" style="position:absolute; right:90px; top:200px; z-index:9999;">
              <li><h4>其他分析</h4></li>
              <li style="margin-bottom:10px;"><router-link class="btn btn-primary" to="/userManage/watchStatic">观看时间</router-link></li>
              <li><router-link class="btn btn-danger" to="/userManage/behaviorStatic">用户行为</router-link></li>
            </ul>
             -->

            <hr/>
            <ol class="list-inline" style="padding:15px 0;">
                <li style="vertical-align:bottom;">注册时间：</li>
                <li>
                  <div id="reportrange" style="margin-bottom:-5px;" class="input-prepend"  data-date-format="yyyy-mm-dd hh:ii:ss">
                      <span class="add-on input-group-addon" style="height:35px; line-height:26px; ">
                          <i class="fa fa-calendar">
                          </i>
                      </span>
                  <input type="text" style="width: 300px" name="timeSection" id="searchDateRange"
                         class="form-control" value=""/>
                </div>
                </li>
                <li style="vertical-align:bottom; margin-bottom:-4px;"><button class="btn btn-primary" @click="searchRegister()">搜索</button></li>
                <li style="vertical-align:bottom;">最后登录时间:</li>
                <li><div id="loginrange" style="margin-bottom:-5px;" class="input-prepend"  data-date-format="yyyy-mm-dd hh:ii:ss">
                      <span class="add-on input-group-addon" style="height:35px; line-height:26px; ">
                          <i class="fa fa-calendar">
                          </i>
                      </span>
                  <input type="text" style="width: 300px" name="timeSection" id="loginDateRange"
                         class="form-control" value=""/>
                         </div></li>
                <li style="vertical-align:bottom; margin-bottom:-4px;"><button class="btn btn-primary" @click="searchLogin()">搜索</button></li>
            </ol>
            <table id="userTable" class="text-center" width="100%" border="1" >
                <thead>
                    <th class="text-center">序列号</th>
                    <th class="text-center">用户名</th>
                    <th class="text-center">用户昵称</th>
                    <th class="text-center">用户头像</th>
                    <th class="text-center">用户最后登录IP</th>
                    <th class="text-center" style="max-width:200px">用户简介</th>
                    <th class="text-center">用户等级</th>
                    <th class="text-center">注册时间</th>
                    <th class="text-center">最后登录时间</th>
                    <th class="text-center">访问端</th>
                    <th class="text-center">修改用户等级</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in userlists">
                        <td>{{index +1}}</td>
                        <td>{{item.account}}</td>
                        <td>{{item.nick}}</td>
                        <td><img v-bind:src="item.headurl" alt="用户头像" style="height:50px;"/></td>
                        <td>{{item.ip}}</td>
                        <td style="max-width:200px">{{item.intro}}</td>
                        <td>{{item.level | userLevel}}</td>
                        <td>{{item.unix | unixTodate}}</td>
                        <td>{{item.login_unix | unixTodate}}</td>
                        <td>{{item.platform | Platform}}</td>
                        <td>
                            <button class="btn btn-primary" @click="isShow(item.id)">修改等级</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="user_pagnation" style="margin-top:10px;"></div>
            <div v-if="is_show">
                <div class="order-box">
                    <select v-model="selected" style="width:200px">
                        <option v-for="option in options" v-bind:value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                    <button class="btn btn-primary" @click="modifyLevel()">确认</button>
                    <button class="btn btn-danger" @click="isShow()">取消</button>
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

import '../../static/pagnation/bootstrap-paginator.js'

import moment from 'moment'

import '../../static/bootstrap-daterangepicker/daterangepicker.js'

import Echarts from '../../static/echarts/echarts.min.js';

export default {
  name: 'userManage',
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
    //this.checkLogin();

    this.initTimer();

    this.changeStatics(this.dateSelects[2]);
  },
  data (){
    return {
        Sid:'',
        userlists:[],
        options: [
          { text: '会员', value: '0' },
          { text: '白银', value: '1' },
          { text: '黄金', value: '2' },
          { text: '铂金', value: '3' },
          { text: '钻石', value: '4' },
          { text: '大亨', value: '5' }
        ],
        User:false,
        selected:0,
        is_show:false,
        id:'',

        BegIdx:0,

        regisStart:'',
        regisEnd:'',

        loginStart:'',
        loginEnd:'',

        dateSelects:[
          {id:1,type:0,value:'年',active:false},{id:2,type:1,value:'月',active:false},{id:3,type:2,value:'日',active:false}],

        DateShow:'',
    }
  },
  filters:{
        userLevel:function(value){
            switch(value){
                case '0': return '会员'; break;
                case '1': return '白银'; break;
                case '2': return '黄金'; break;
                case '3': return '铂金'; break;
                case '4': return '钻石'; break;
                case '5': return '大亨'; break;
            }
        },
        unixTodate(tm) {
            let time = new Date(tm*1000);
            let y = time.getFullYear();
            let m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
            let d = (time.getDate())<10?('0'+time.getDate()):time.getDate();
            let h = (time.getHours())<10?('0'+time.getHours()):time.getHours();
            let min = (time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
            return y+'-'+m+'-'+d+' '+h+':'+m;
        },

        Platform:function(value){
          switch(value){
            case '1': return '手机端'; break;
            case '2': return '电脑端'; break;
          }
        }
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
        let params={
            sid:that.Sid,
            begidx:0,
            counts:5,
            flag:0,
        };
        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
                let TotalNum = res.data.Data.Total;
                 //    分页
                if(TotalNum>5) {
                     var options = {
                         currentPage: 1,
                         totalPages: parseInt(TotalNum /5) + 1,
                         onPageClicked: function (e, originalEvent, type, page) {
                             switch (type) {
                                 case 'first':
                                     that.userListQuery(0);
                                     break;
                                 case 'page':
                                     that.BegIdx = (page - 1) * 5;
                                     that.userListQuery(that.BegIdx);
                                     break;
                                 case 'next':
                                     that.BegIdx  += 5;
                                     that.userListQuery(that.BegIdx);
                                     break;
                                 case 'last':
                                     that.BegIdx = TotalNum - TotalNum % 5;
                                     that.userListQuery(that.BegIdx);
                                     break;
                                 case 'prev':
                                     that.BegIdx -= 5;
                                     that.userListQuery(that.BegIdx);
                                     break;
                             }
                         }
                     };
                     $('#user_pagnation').bootstrapPaginator(options);
                }
                let templateObj = res.data.Data.Detail;
                that.userlists= templateObj;
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    initTimer(){
      let options={
          //maxDate : moment(), //最大时间
          dateLimit : {
            days : 60
          }, //起止时间的最大间隔
          showDropdowns : false,
          showWeekNumbers : false, //是否显示第几周
          timePicker : false, //是否显示小时和分钟
          timePickerSeconds:false,
          timePickerIncrement : 1, //时间的增量，单位为分钟
          timePicker12Hour : false, //是否使用12小时制来显示时间
          opens : 'left', //日期选择框的弹出位置
          buttonClasses : [ 'btn btn-default' ],
          applyClass : 'btn-small btn-primary blue',
          cancelClass : 'btn-small',
          format : 'YYYY-MM-DD HH:mm:ss', //控件中from和to 显示的日期格式
          separator : ' to ',
          locale : {
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
              '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
          }
        };

        let that =  this;
       $('#reportrange').daterangepicker(options, function(start, end, label) {//格式化日期显示框
            $('#searchDateRange').val(start.format('YYYY-MM-DD HH:mm:ss') + ' - ' + end.format('YYYY-MM-DD HH:mm:ss'));
            let starttime = start.format('YYYY-MM-DD HH:mm:ss').replace(new RegExp("-","gm"),"/");

            that.regisStart= (new Date(starttime)).getTime()/1000;

            let endtime = end.format('YYYY-MM-DD HH:mm:ss').replace(new RegExp("-","gm"),"/");

            that.regisEnd = (new Date(endtime)).getTime()/1000;
       });

       $('#loginrange').daterangepicker(options, function(start, end, label) {//格式化日期显示框
            $('#loginDateRange').val(start.format('YYYY-MM-DD HH:mm:ss') + ' - ' + end.format('YYYY-MM-DD HH:mm:ss'));
            let starttime = start.format('YYYY-MM-DD HH:mm:ss').replace(new RegExp("-","gm"),"/");

            that.loginStart= (new Date(starttime)).getTime()/1000;

            let endtime = end.format('YYYY-MM-DD HH:mm:ss').replace(new RegExp("-","gm"),"/");

            that.loginEnd = (new Date(endtime)).getTime()/1000;
       });
    },

    userListQuery(idx){
      let that = this;
        let params={
            sid:that.Sid,
            begidx:idx,
            counts:5,
            flag:0,
        };
        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
                 that.userlists=res.data.Data.Detail;
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    modifyLevel(){
        let that = this;
        let params={
            sid:that.Sid,
            uid:this.id,
            level:this.selected
        };
        api.modifyLevel(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code == 3){
                that.initData();
                that.is_show = false;
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    isShow(id){
        this.is_show = !this.is_show
        this.id = id
    },

    searchRegister(){
      if(this.regisStart && this.regisEnd){
        let params={
          sid:this.Sid,
          flag:0,
          sort_reg:1,
          sort_log:1,
          reg_bt:this.regisStart,
          reg_et:this.regisEnd,
          begidx:0,
          counts:10
        };

        let that = this;

        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
                let TotalNum = res.data.Data.Total;

                if(TotalNum >10){
                    //分页
                    var options = {
                         currentPage: 1,
                         totalPages: parseInt(TotalNum /10) + 1,
                         onPageClicked: function (e, originalEvent, type, page) {
                             switch (type) {
                                 case 'first':
                                     that.userListRegQuery(0);
                                     break;
                                 case 'page':
                                     that.BegIdx = (page - 1) * 10;
                                     that.userListRegQuery(that.BegIdx);
                                     break;
                                 case 'next':
                                     that.BegIdx  += 10;
                                     that.userListRegQuery(that.BegIdx);
                                     break;
                                 case 'last':
                                     that.BegIdx = TotalNum - TotalNum % 10;
                                     that.userListRegQuery(that.BegIdx);
                                     break;
                                 case 'prev':
                                     that.BegIdx -= 10;
                                     that.userListRegQuery(that.BegIdx);
                                     break;
                             }
                         }
                };
                $('#user_pagnation').bootstrapPaginator(options);
                }else{
                    that.userlists = res.data.Data.Detail;
                }
            }
        }).catch(function(err){
            console.log(err);
        });
      }else{
        alert("注册时间范围未选择！");
      }
    },

    userListRegQuery(idx){
      let params={
          sid:this.Sid,
          flag:0,
          sort_reg:1,
          sort_log:1,
          reg_bt:this.regisStart,
          reg_et:this.regisEnd,
          begidx:idx,
          counts:10
        };

      let that = this;

      api.queryUser(params).then(function(res){
        if(res.data.Code ==3){
             that.userlists=res.data.Data.Detail;
        }else{
            alert(res.data.Msg);
        }
        }).catch(function(err){
            console.log(err);
        });
    },

    searchLogin(){
      if(this.loginStart && this.loginEnd){
        let params={
          sid:this.Sid,
          flag:0,
          sort_reg:1,
          sort_log:1,
          log_bt:this.loginStart,
          log_et:this.loginEnd,
          begidx:0,
          counts:10
        };

        let that = this;

        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
              let TotalNum = res.data.Data.Total;
              //分页
              if(TotalNum > 10){
                var options = {
                         currentPage: 1,
                         totalPages: parseInt(TotalNum /10) + 1,
                         onPageClicked: function (e, originalEvent, type, page) {
                             switch (type) {
                                 case 'first':
                                     that.userListLoginQuery(0);
                                     break;
                                 case 'page':
                                     that.BegIdx = (page - 1) * 10;
                                     that.userListLoginQuery(that.BegIdx);
                                     break;
                                 case 'next':
                                     that.BegIdx  += 10;
                                     that.userListLoginQuery(that.BegIdx);
                                     break;
                                 case 'last':
                                     that.BegIdx = TotalNum - TotalNum % 10;
                                     that.userListLoginQuery(that.BegIdx);
                                     break;
                                 case 'prev':
                                     that.BegIdx -= 10;
                                     that.userListLoginQuery(that.BegIdx);
                                     break;
                             }
                         }
                };
                $('#user_pagnation').bootstrapPaginator(options);
              }else{
                  that.userlists = res.data.Data.Detail;
              }
            }
            console.log(res.data);
        }).catch(function(err){
            console.log(err);
        });
      }
    },

    userListLoginQuery(idx){
      let params={
          sid:this.Sid,
          flag:0,
          sort_reg:1,
          sort_log:1,
          log_bt:this.loginStart,
          log_et:this.loginEnd,
          begidx:idx,
          counts:10
        };

        let that = this;

        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
                 that.userlists=res.data.Data.Detail;
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //游客和注册数统计
    Statics(Period,Year,Month,Day){
       let params={
          sid:this.Sid,
          period:Period,
          year:Year,
          month:Month,
          day:Day
       };

       let that = this;

       api.registerStatic(params).then(function(res){
          if(res.data.Code ==3){
            that.showEcharts(Period,res.data.Data);
          }
       }).catch(function(err){
          console.log(err);
       });
    },


    showEcharts(Period,arr){
            let arr_len = arr.length;

            let visitors=[],users=[],showDate=[],Subtext='';

            let len = arr.length;

            for(let i=0; i<len; i++){
                visitors.push(arr[i].Visitors);

                users.push(arr[i].RegUsers);

                if(Period == 2){
                  showDate.push(this.DayTrans(arr[i].DatePd));
                }else if(Period == 1){
                  showDate.push(this.monthTrans(arr[i].DatePd));
                }else{
                  showDate.push(this.yearTrans(arr[i].DatePd));
                }
              }

            let  option = {
                  title : {
                      text: '游客和注册用户数量统计',
                  },
                  tooltip : {
                      trigger: 'axis'
                  },
                  legend: {
                      data:['游客','注册用户']
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
                  xAxis : [
                      {
                          type : 'category',
                          data : showDate,
                      }
                  ],
                  yAxis : [
                      {
                          type : 'value'
                      }
                  ],
                  series : [
                      {
                          name:'游客',
                          type:'bar',
                          data:visitors,
                          markPoint : {
                              data : [
                                  {type : 'max', name: '最大值'},
                                  {type : 'min', name: '最小值'}
                              ]
                          },
                          markLine : {
                              data : [
                                  {type : 'average', name: '平均值'}
                              ]
                          }
                      },
                      {
                          name:'注册用户',
                          type:'bar',
                          data:users,
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
        let year = new Date().getFullYear();
        this.Statics(item.type,year,'','');
        this.DateShow = year+'年';
      }
      else if(item.type ==1){
        let year = new Date().getFullYear();
        let time = new Date();
        let m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
        this.Statics(item.type,year,m,'');
        this.DateShow = year+'年'+m+'月';
      }else{
        let year = new Date().getFullYear();
        let time = new Date();
        let m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
        let d = (time.getDate())<10?('0'+time.getDate()):time.getDate();
        this.Statics(item.type,year,m,d);
        this.DateShow = year+'年'+m+'月'+d+'日';
      }
    },
  },
}
</script>

<style scoped lang="scss">
    #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }

    hr{
      margin:10px 0;
    }

    .required{
        color:#e60000;
        margin-right:5px;
    }

    #userTable th,#userTable td{
        padding:5px 0;
        border:1px solid #ececec;
   }

    #userTable tr:hover{
        background-color:#f7f7f7;
    }

   #userTable tr:nth-child(odd){
        background-color:#f7f7f7;
   }

   .profile{
        height:100px;
   }

   .order-box{
        background:#fff;
        width:300px;
        height:240px;
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%);
        transform: translateY(-50%);
        border:1px solid #ccc;
        box-shadow: 0px 0px 1rem #999;
        padding:50px;
        border-radius: .7rem;
        button{
            margin-left: 25px;
            margin-top:20px;
        }
    }
</style>
