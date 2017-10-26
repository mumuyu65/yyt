<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <ul class="list-inline">
              <li><h3>功能开通</h3></li>
              <li style=" vertical-align:middle">
                    <input type="number" class="form-control" placeholder="请输入用户手机号" @keyup.enter="searchData()" v-model="account">
              </li>
              <li><button class="btn btn-primary" @click="searchData()" style="margin-bottom:10px;">搜索</button></li>
          </ul>
          <hr/>
          <h2>搜索结果：</h2>
          <div style="margin:0 auto; padding:20px;">
            <div><h4>直播间:<select v-model="temp_liveSelected" style="margin-left:30px; font-size:16px;">
                            <option v-bind:value="item.id" v-for="item in liveLists" >{{item.title}}</option>
                        </select></h4></div>
            <table id="userTable" class="text-center" width="100%" border="1" style="margin-top:20px;" >
                <thead>
                    <th class="text-center">名称</th>
                    <th class="text-center">开通截止时间设置</th>
                    <th class="text-center">操作</th>
                </thead>
                <tbody>
                    <tr>
                      <td>核心内参</td>
                      <td>
                          <input type="text" id="core_date" style="height:30px;border-radius:0;width:220px;" />
                      </td>
                      <td>
                        <button class="btn btn-primary" @click="modifyAuth(1)">修改</button>
                      </td>
                    </tr>
                    <tr>
                      <td>讲师观点</td>
                      <td><input type="text" id="tidea_date" style="height:30px;border-radius:0;width:220px;" /></td>
                       <td>
                        <button class="btn btn-primary"  @click="modifyAuth(2)">修改</button>
                      </td>
                    </tr>
                    <tr>
                      <td>学习课件</td>
                      <td>
                          <input type="text" id="classes_date" style="height:30px;border-radius:0;width:220px;" />
                          <div style="color:#f00;">备注: 学习课件在各直播间中的开通截止时间必须一致。</div>
                      </td>
                      <td>
                        <button class="btn btn-primary" @click="modifyAuth(3)">修改</button>
                      </td>
                    </tr>
                    <tr>
                      <td>股市收评</td>
                      <td><input type="text" id="socket_date" style="height:30px;border-radius:0;width:220px;" /></td>
                       <td>
                        <button class="btn btn-primary"  @click="modifyAuth(4)">修改</button>
                      </td>
                    </tr>
                </tbody>
            </table>
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
  name: 'web-authorization',
  data (){
    return {
        Sid:'',
        account:'',

        liveLists:[],   //直播间列表

        core_liveSelected:'',

        tidea_liveSelected:'',

        socket_liveSelected:'',

        templateLists:[],    //暂存直播间选择的列表

        temp_liveSelected:'',

        totalObj:[],

        class_liveSelected:'',
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;

    //this.checkLogin();

    this.initData();
  },
  watch:{
    temp_liveSelected:'changeLiveRoom',
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

        let param = {
            begidx:0,
            counts:100
        }
        api.getLive(param).then(function(res){
            //console.log(res.data.Data);
            if(res.data.Code ==3){
                if(res.data.Data.length == 0){
                    console.log('没有直播房间!');
                }else{
                    that.liveLists = res.data.Data;

                    //that.temp_liveSelected = that.liveLists[0].id;
                }
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });

        $("#core_date").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            language:'zh-CN',
            pickerPosition: "bottom",
            minView: 2,
            startView:3,
            minuteStep:10
        });


        $("#tidea_date").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            language:'zh-CN',
            pickerPosition: "bottom",
            minView: 2,
            startView:3,
            minuteStep:10
        });

        $("#socket_date").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            language:'zh-CN',
            pickerPosition: "bottom",
            minView: 2,
            startView:3,
            minuteStep:10
        });


        //classes_date

        $("#classes_date").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            language:'zh-CN',
            pickerPosition: "bottom",
            minView: 2,
            startView:3,
            minuteStep:10
        });
    },

    //查询用户的直播间属性
    searchData(){
      if(this.account){
        let params={
          sid:this.Sid,
          account:this.account,
        };
        let that = this;
        api.featuresQuery(params).then(function(res){
          if(res.data.Code ==3){
                alert("搜索成功，请选择直播间进行详情查看!");
               if(res.data.Data){

                   let templateObj=res.data.Data;

                   that.totalObj = templateObj;

                   /*

                   let len = templateObj.length;

                   console.log(res.data);

                   for(let i=0; i<len;i++){
                      for(let k=0; k<that.liveLists.length;k++){
                          if(templateObj[i].lmid == that.liveLists[k].id){
                              that.templateLists.push(that.liveLists[k])
                          }
                      }
                   }

                   that.templateLists = that.unique(that.templateLists);
                   */

                   //console.log(that.templateLists);
                   /*
                   for(let i=0; i<len;i++){
                      if(templateObj[i].features ==1){
                         that.core_liveSelected = templateObj[i].lmid; $("#core_date").val(that.dateStamp(templateObj[i].deadline));
                      }else if(templateObj[i].features ==2){
                         that.tidea_liveSelected = templateObj[i].lmid; $("#tidea_date").val(that.dateStamp(templateObj[i].deadline));
                      }else if(templateObj[i].features ==4){
                         that.socket_liveSelected = templateObj[i].lmid; $("#socket_date").val(that.dateStamp(templateObj[i].deadline));
                      }
                   }
                   */
               }else{
                  that.templateLists = that.liveLists;
               }
          }
        }).catch(function(err){
            console.log(err);
        });
      }else{
        alert("未输入用户手机号");
      }
    },

    unique(arr){
       var res = [arr[0]];
       for(var i = 1; i < arr.length; i++){
          var repeat = false;
          for(var j = 0; j < res.length; j++){
           if(arr[i].id == res[j].id){
            repeat = true;
            break;
           }
          }
        if(!repeat){
         res.push(arr[i]);
        }
       }
       return res;
      },


    queryData(){
      let params={
          sid:this.Sid,
          account:this.account,
        };
        let that = this;
        api.featuresQuery(params).then(function(res){
          if(res.data.Code ==3){
               if(res.data.Data){

                   let templateObj=res.data.Data;

                   that.totalObj = templateObj;

               }else{
                  that.templateLists = that.liveLists;
               }
          }
        }).catch(function(err){
            console.log(err);
        });
    },


    //修改用户权限  sid,account,features(1-核心内参,2-讲师观点,3-学习课件,4-股市收评),lmid,deadline
    modifyAuth(type){
       let params={
          sid:this.Sid,
          account:this.account,
          features:'',
          lmid:this.temp_liveSelected,
          deadline:'',
       };

      if(type == 1){
          params.features = 1;

          if($("#core_date").val()){
             params.deadline = this.dateToUnix($("#core_date").val());
          }
      }else if(type ==2){
          params.features = 2;

          if($("#tidea_date").val()){
             params.deadline = this.dateToUnix($("#tidea_date").val());
          }
      }else if(type ==3){
          params.features = 3;

          if($("#classes_date").val()){
             params.deadline = this.dateToUnix($("#classes_date").val());
          }
      }else{
          params.features = 4;

          if($("#socket_date").val()){
             params.deadline = this.dateToUnix($("#socket_date").val());
          }
      }

      let that = this;

      api.featuresModify(params).then(function(res){
          //console.log(res.data);
          alert(res.data.Msg);
          if(res.data.Code ==3){
            that.queryData();
          }
      }).catch(function(err){
          console.log(err);
      });
    },

     //时间转换
    dateToUnix(time) {
        var stringTime = time + ' 00:00:00';
        var timestamp2 = Date.parse(new Date(stringTime));
        timestamp2 = timestamp2 / 1000;
        return timestamp2;
    },

    dateStamp(value){
        let tm = parseInt(value)*1000;
        var time = new Date(tm);
         //获取年份信息
         var y = time.getFullYear();
         //获取月份信息，月份是从0开始的
         var m = time.getMonth()+1;
         //获取天数信息
         //获取天数信息
         var d = time.getDate();

         var H=time.getHours();

         var M=time.getMinutes();
         //返回拼接信息
         return y+'-'+this.add(m) + '-' + this.add(d);
    },

    add(m){
        return m<10?'0'+m:m
     },


     changeLiveRoom(item){
        //清空之前的记录
        $("#core_date").val('');

        $("#tidea_date").val('');

        $("#classes_date").val('');

        $("#socket_date").val('');

        let len = this.totalObj.length;

        for(let i=0; i<len; i++){
          if(item == this.totalObj[i].lmid){
              if(this.totalObj[i].features == 1){
                  $("#core_date").val(this.dateStamp(this.totalObj[i].deadline));

              }else if(this.totalObj[i].features == 2){

                  $("#tidea_date").val(this.dateStamp(this.totalObj[i].deadline));

              }else if(this.totalObj[i].features == 3){

                  $("#classes_date").val(this.dateStamp(this.totalObj[i].deadline));
              }else{

                  $("#socket_date").val(this.dateStamp(this.totalObj[i].deadline));
              }
          }
        }
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
</style>
