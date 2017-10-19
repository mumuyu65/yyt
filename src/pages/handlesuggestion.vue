<template>
<div id="page-wrapper">
    <div id="page-inner">
        <div v-show="!addhandlesuggestion">
           <div v-show="!Modifyhandlesuggestion">
                <ul class="list-inline">
                    <li><h3>讲师观点</h3></li>
                    <li class="pull-right" style="margin-top:15px;">
                        <button @click="AddSuggestion()"
                            style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                            <i class="fa fa-plus fa-1x"></i>新增操盘建议
                        </button>
                    </li>
                </ul>
                <!-- 搜索区域
                <ol class="list-inline" v-show="!searchArea">
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
                    <li><button class="btn btn-danger" @click="getHandleSuggestion()">搜索</button></li>
                </ol>
                 -->
                <hr/>
                <ul class="nav nav-tabs">
                    <li v-bind:class="{'active':item.flag}" v-for="(item,index) in clanItems">
                      <a style="cursor:pointer;" @click="changeFlag(item,index)">{{item.value}}</a>
                    </li>
                </ul>
                <!-- table展示区域  -->
                <table class="text-center" border="1" width="100%" id="productsTable">
                    <thead>
                        <th  class="text-center">创建时间</th>
                        <th  class="text-center">类型</th>
                        <th  class="text-center">仓位</th>
                        <th  class="text-center">商品</th>
                        <th  class="text-center">开仓价</th>
                        <th  class="text-center">止损价</th>
                        <th  class="text-center">止盈价</th>
                        <th  class="text-center">创建人</th>
                        <th  class="text-center">结果</th>
                        <th  class="text-center">麦单类型</th>
                        <th  class="text-center">操作</th>
                    </thead>
                    <tbody v-show="!nodata">
                        <tr v-for="(item, index) in templateInfos">
                            <td>{{item.unix | dateStamp}}</td>
                            <td>{{item.order_type}}</td>
                            <td>{{item.entry_price}}</td>
                            <td>{{item.category}}</td>
                            <td>{{item.open_price}}</td>
                            <td>{{item.loss_price}}</td>
                            <td>{{item.win_price}}</td>
                            <td>{{item.owner}}</td>
                            <td>{{item.result}}</td>
                            <td>{{item.wheat_type}}</td>
                            <td>
                                <button class="btn btn-primary" @click="showModify(item)">修改</button>
                                <button class="btn btn-danger" @click="removehandlesuggestion(item,index)">删除</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot v-show="nodata">
                        <tr>
                            <td colspan="11">暂无数据</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <!-- 新增 -->
        <div v-show="addhandlesuggestion">
            <h3>新增操作建议</h3>
            <hr/>
            <div class="row">
                <div class="form-group col-md-6">
                    <label>投放地</label>
                    <select class="form-control" v-model="handlesuggestion.place">
                        <option v-for="item in clanItems" :value="item.platform">{{item.value}}</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label>商品</label>
                    <input type="text" class="form-control" v-model="handlesuggestion.category_id">
                </div>
                <div class="form-group col-md-6">
                    <label>类型</label>
                    <select class="form-control" v-model="handlesuggestion.order_type">
                        <option value="买入">买入</option>
                        <option value="卖出">卖出</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label>开仓价</label>
                    <input type="number" class="form-control" v-model="handlesuggestion.open_price" />
                    <!--
                    <label>开仓时间</label>
                    <input type="text" class="form-control" id="form_datetime"/>
                    -->
                </div>
                <div class="form-group col-md-6">
                    <label>仓位</label>
                    <input type="text" class="form-control" v-model="handlesuggestion.entry_price">
                </div>
                <div class="form-group col-md-6">
                    <label>止盈价</label>
                    <input type="text" class="form-control" v-model="handlesuggestion.win_price">
                </div>
                <div class="form-group col-md-6">
                    <label>止损价</label>
                    <input type="text" class="form-control" v-model="handlesuggestion.loss_price">
                </div>
                <div class="form-group col-md-6">
                    <label>结果</label>
                    <select class="form-control" v-model="handlesuggestion.result">
                        <option value="持仓单">持仓单</option>
                        <option value="建仓单">建仓单</option>
                        <option value="平仓单">平仓单</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6">
                    <label>麦单类型</label>
                    <select class="form-control" v-model="handlesuggestion.wheat_type">
                        <option value="麦下单">麦下单</option>
                        <option value="麦上单">麦上单</option>
                    </select>
                </div>
            </div>
            <div class="form-group" style="margin:50px;">
                <button @click="HandleSuggestionAdd()" class="btn btn-danger">提交</button>
                <button class="btn btn-default" @click="CancelAdd()">取消</button>
            </div>
        </div>
        <!-- 修改 -->
        <div v-show="Modifyhandlesuggestion">
            <h3>修改操作建议</h3>
            <hr/>
            <div class="row">
                <div class="form-group col-md-6">
                    <label>投放地</label>
                    <select class="form-control" v-model="modifyhandlesuggestion.place">
                        <option v-for="item in clanItems" :value="item.platform">{{item.value}}</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label>商品</label>
                    <input type="text" class="form-control" v-model="modifyhandlesuggestion.category_id" />
                    <!--
                    <select class="form-control" v-model="modifyhandlesuggestion.category_id">
                        <option v-for="item in category" :value="item.id">{{item.name}}</option>
                    </select>
                    -->
                </div>
                <div class="form-group col-md-6">
                    <label>类型</label>
                    <select class="form-control" v-model="modifyhandlesuggestion.order_type">
                        <option value="买入">买入</option>
                        <option value="卖出">卖出</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label>开仓价</label>
                    <input type="text" class="form-control" v-model="modifyhandlesuggestion.open_price" />
                </div>
                <div class="form-group col-md-6">
                    <label>仓位</label>
                    <input type="text" class="form-control" v-model="modifyhandlesuggestion.entry_price">
                </div>
                <div class="form-group col-md-6">
                    <label>止盈价</label>
                    <input type="text" class="form-control" v-model="modifyhandlesuggestion.win_price">
                </div>
                <div class="form-group col-md-6">
                    <label>止损价</label>
                    <input type="text" class="form-control" v-model="modifyhandlesuggestion.loss_price">
                </div>
                <div class="form-group col-md-6">
                    <label>结果</label>
                    <select class="form-control" v-model="modifyhandlesuggestion.result">
                        <option value="持仓单">持仓单</option>
                        <option value="建仓单">建仓单</option>
                        <option value="平仓单">平仓单</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6">
                    <label>麦单类型</label>
                    <select class="form-control" v-model="modifyhandlesuggestion.wheat_type">
                        <option value="麦下单">麦下单</option>
                        <option value="麦上单">麦上单</option>
                    </select>
                </div>
            </div>
            <div class="form-group" style="margin:50px;">
                <button @click="modifyHandleSuggestion()" class="btn btn-danger">提交</button>
                <button class="btn btn-default" @click="CancelModify()">取消</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.js';

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js';

import axios from 'axios'

import env from '@/config/env'

export default {
name: 'handlesuggestion',
mounted(){
    this.Sid = JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
    //this.checkLogin();

    this.queryLive();    //查询直播间
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
        clanItems:[],
        ClanInfos:[],
        RoomInfos:[],
        templateInfos:[],
        addhandlesuggestion:false,
        Modifyhandlesuggestion:false,
        handlesuggestion: {
            place: '大厅直播', // 投放地
            category_id: '', // 商品id
            order_type: '买入', // 买入卖出
            entry_price: '', // 仓位
            win_price: '', // 止盈价
            loss_price: '', // 止损价
            result: '赢单', // 结果
            wheat_type: '麦下单', // 麦单类型
            open_price:'',  //开仓价
        },
        category: [],
        open_time: '', // 开仓时间
        modifyhandlesuggestion:{
            place:'',
            category_id:'',
            order_type:'',
            entry_price:'',
            win_price:'',
            loss_price:'',
            result:'',
            wheat_type:'',
            open_price:'',
        },
        ModifyId:'',

        searchArea:false, //根据权限来看是否显示

        nodata:false,
    }
},
filters:{
    dateStamp:function(value){
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
         return y+'-'+add(m) + '-' + add(d)+'  '+add(H)+":"+add(M);

         function add(m){
            return m<10?'0'+m:m
         }
    },
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


    initData() {
        //商品
        let that = this;
        api.queryCategory().then(function(res){
            if(res.data.Code ==3){
                that.all_prizes = res.data.Data;
                that.category = res.data.Data;
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
            if(res.data.Code ==3){
                that.all_teachers = res.data.Data.Detail;
            }
            else{
                that.searchArea = !that.searchArea;
            }
        }).catch(function(err){
            console.log(err);
        });

        //this.getHandleSuggestion();  //初始化
    },

     //查询直播间列表
    queryLive(){
        let _this = this;
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
                    //_this.liveList = res.data.Data;

                    let templateObj = res.data.Data;

                    let len = templateObj.length;

                    for(let i=0; i<len; i++){
                        _this.clanItems.push({type:templateObj[i].type,value:templateObj[i].title,platform:templateObj[i].title,flag:false});
                    }

                    _this.clanItems[0].flag = true;

                    _this.getHandleSuggestion(_this.clanItems[0].value);
                }
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //搜索
    getHandleSuggestion(Place) {
        let param = {
            sid:this.Sid,
            bdt:'',
            edt:'',
            category: '',
            analysts:'',
            place:Place,
            begidx: 0,
            counts: 100,
        };

        let that = this;

        api.queryHandleSuggestion(param).then(function(res) {
            if (res.data.Code == 3) {
                if (res.data.Data == null) {
                    that.nodata = true;
                }else{
                    that.nodata = false;
                    let templateObj = res.data.Data;
                    //清空初始化中的数据
                    that.RoomInfos=[];
                    for(let i =0; i<templateObj.length;i++){
                         that.RoomInfos.push(templateObj[i]);
                    }
                    that.templateInfos = that.transName(that.RoomInfos);
                }
            }else{
                alert(res.data.Msg)
            }
        }).catch(function(err) {
            console.log(err)
        })
    },

    //时间转换
    dateToUnix(time) {
        let arr = time.replace(/ |:/g, '-').split('-');
        let oDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]).getTime()/1000;
        return oDate;
    },

    //tab标签切换
    changeFlag(item){
        for(let i=0; i<this.clanItems.length;i++){
            this.clanItems[i].flag = false;
        }
       item.flag= true;

       this.getHandleSuggestion(item.value);
    },

    transName(item){
        if(item.length>0){
            let len= item.length;
            for(let i =0; i<len;i++){
                for(let j=0;j<this.category.length;j++){
                    if(this.category[j].id == item[i].category_id){
                        item[i].categoryname = this.category[j].name;
                    }
                }
            }
            return item;
        }else{
            alert("无数据！");
        }
    },

    //添加
    AddSuggestion(){
        this.addhandlesuggestion = !this.addhandlesuggestion;
    },

    HandleSuggestionAdd() {
        let hs = this.handlesuggestion;
        let param = {
            sid: this.Sid,
            place: hs.place,
            category: hs.category_id,
            order_type: hs.order_type,
            open_price:hs.open_price,
            entry_price: hs.entry_price,
            win_price: hs.win_price,
            loss_price: hs.loss_price,
            result: hs.result,
            wheat_type: hs.wheat_type
        }
        let that = this;
        api.addHandleSuggestion(param).then(function(res) {
            if (res.data.Code == 3) {
               that.initData();
               that.addhandlesuggestion = !that.addhandlesuggestion;
            }
            alert(res.data.Msg);
        }).catch(function(err) {
            console.log(err)
        })
    },

    CancelAdd(){
        this.addhandlesuggestion = !this.addhandlesuggestion;
    },

    //修改
    showModify(item){
        console.log(item);
        this.Modifyhandlesuggestion = !this.Modifyhandlesuggestion;
        this.modifyhandlesuggestion.place = item.place;
        this.modifyhandlesuggestion.category_id= item.category;
        this.modifyhandlesuggestion.order_type= item.order_type;
        this.modifyhandlesuggestion.open_price= item.open_price;
        this.modifyhandlesuggestion.entry_price= item.entry_price;
        this.modifyhandlesuggestion.win_price= item.win_price;
        this.modifyhandlesuggestion.loss_price= item.loss_price;
        this.modifyhandlesuggestion.result= item.result;
        this.modifyhandlesuggestion.wheat_type= item.wheat_type;
        this.ModifyId = item.id;
    },

    modifyHandleSuggestion(){
        let params={
            sid:this.Sid,
            id:this.ModifyId,
            place:this.modifyhandlesuggestion.place,
            category_id:this.modifyhandlesuggestion.category_id,
            order_type:this.modifyhandlesuggestion.order_type,
            open_time:$("#modify_form_datetime").val(),
            entry_price:this.modifyhandlesuggestion.entry_price,
            win_price:this.modifyhandlesuggestion.win_price,
            loss_price:this.modifyhandlesuggestion.loss_price,
            result:this.modifyhandlesuggestion.result,
            wheat_type:this.modifyhandlesuggestion.wheat_type,
        };

        let that = this;

        api.modifyHandleSuggestion(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                that.Modifyhandlesuggestion = !that.Modifyhandlesuggestion;
                that.initData();
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    CancelModify(){
        this.Modifyhandlesuggestion = !this.Modifyhandlesuggestion;
    },

    //删除
    removehandlesuggestion(item,idx){
        let params={
            sid:this.Sid,
            id:item.id
        };

        let that = this;

        api.delHandleSuggestion(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                that.templateInfos.splice(idx,1);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //时间转换
    dateStamp (value) {
        let tm = parseInt(value)*1000;
        var time = new Date(tm);
         //获取年份信息
         var y = time.getFullYear();
         //获取月份信息，月份是从0开始的
         var m = time.getMonth()+1;
         //获取天数信息
         var d = time.getDate();

         var H=time.getHours();

         var M=time.getMinutes();
         //返回拼接信息
         return y+'-'+this.add(m) + '-' + this.add(d)+'  '+this.add(H)+":"+this.add(M);
    },
    add(m){
        return m<10?'0'+m:m
    },

    },
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
