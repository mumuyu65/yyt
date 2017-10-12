<template>
    <div id="page-wrapper" >
        <div id="page-inner">
          <ul class="list-inline">
              <li><h3>游客信息管理</h3></li>
          </ul>
          <hr/>
          <div id="visitor_pagnation" class="text-center"></div>
          <table id="visitorTable" class="text-center" width="100%" border="1" >
                <thead>
                    <th class="text-center">游客序列号</th>
                    <th class="text-center">访问时间</th>
                    <th class="text-center">访问端</th>
                    <th class="text-center">IP地址</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in visitorlists">
                        <td>{{index +1}}</td>
                        <td>{{item.unix | unixTodate }}</td>
                        <td>{{item.platform | visitEnd }}</td>
                        <td>{{item.ip}}</td>
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

import axios from 'axios'

import env from '@/config/env'

import '../../static/pagnation/bootstrap-paginator.js'

export default {
  name: 'Visitor',
  data (){
    return {
        Sid:'',
        visitorlists:[],
        BegIdx:0,
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
    //this.checkLogin();
  },
  filters:{
    unixTodate(tm) {
        let time = new Date(tm*1000);
        let y = time.getFullYear();
        let m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
        let d = (time.getDate())<10?('0'+time.getDate()):time.getDate();
        let h = (time.getHours())<10?('0'+time.getHours()):time.getHours();
        let min = (time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
        return y+'-'+m+'-'+d+' '+h+':'+m;
    },

    visitEnd(value){
      switch(value){
        case '5': return '手机端'; break;
        case '4': return '电脑端'; break;
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
      let params={
        begidx:0,
        counts:10
      };

      let that = this;

      api.queryVisitor(params).then(function(res){
          if(res.data.Code ==3){
            if(res.data.Data.Total>0){
              let TotalNum = res.data.Data.Total;
              if(TotalNum>10){
                  var options = {
                         currentPage: 1,
                         totalPages: parseInt(TotalNum /10) + 1,
                         onPageClicked: function (e, originalEvent, type, page) {
                             switch (type) {
                                 case 'first':
                                     that.visitorList(0);
                                     break;
                                 case 'page':
                                     that.BegIdx = (page - 1) * 10;
                                     that.visitorList(that.BegIdx);
                                     break;
                                 case 'next':
                                     that.BegIdx  += 10;
                                     that.visitorList(that.BegIdx);
                                     break;
                                 case 'last':
                                     that.BegIdx = TotalNum - TotalNum % 10;
                                     that.visitorList(that.BegIdx);
                                     break;
                                 case 'prev':
                                     that.BegIdx -= 10;
                                     that.visitorList(that.BegIdx);
                                     break;
                             }
                         }
                     };
                     $('#visitor_pagnation').bootstrapPaginator(options);
              }
            that.visitorlists = res.data.Data.Detail;
            }
          }
      }).catch(function(err){
        console.log(err);
      });
    },

    visitorList(idx){
      let params={
          begidx:idx,
          counts:10
        };

      let that = this;

      api.queryVisitor(params).then(function(res){
        if(res.data.Code ==3){
          that.visitorlists = res.data.Data.Detail;
        }
      }).catch(function(err){
          console.log(err);
        });
    }
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

    #visitorTable th,#visitorTable td{
        padding:20px 0;
        border:1px solid #ececec;
   }

    #visitorTable tr:hover{
        background-color:#f7f7f7;
    }

   #visitorTable tr:nth-child(odd){
        background-color:#f7f7f7;
   }
</style>
