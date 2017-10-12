<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div v-if="is_show">
                <div class="order-box">
                    <input type="number" class="form-control" v-model="order_num" placeholder="请填写快递单号">
                    <button class="btn btn-primary" @click="confirmNo">确认</button>
                    <button class="btn btn-danger" @click="isShow">取消</button>
                </div>
            </div>
            <div class="exchangerecord-box">
                <ul class="list-inline form-inline">
                    <li><h3>兑换记录</h3></li>
                    <li class="pull-right">
                        <ol class="list-inline">
                             <li>
                                <input type="number" class="form-control" placeholder="请输入用户手机号" v-model="account">
                            </li>
                            <li class="form-group">
                                <label>起始时间</label>
                                <input type="date" class="form-control" v-model="bdt">
                            </li>
                            <li>
                                <label>终止时间</label>
                                <input type="date" class="form-control" v-model="edt">
                            </li>
                            <li><div class="btn btn-primary" @click="djList">搜索</div></li>
                        </ol>
                    </li>
                </ul>
                <hr/>
                <table id="djTable" class="text-center" width="100%" border="1" >
                    <thead>
                        <th  class="text-center">手机号</th>
                        <th  class="text-center">昵称</th>
                        <th  class="text-center">兑换时间</th>
                        <th  class="text-center">姓名</th>
                        <th  class="text-center">配送地址</th>
                        <th  class="text-center">商品</th>
                        <th  class="text-center">数量</th>
                        <th  class="text-center">状态</th>
                        <th  class="text-center">快递单号</th>
                        <th  class="text-center">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dj_list">
                            <td>{{item.account}}</td>
                            <td>{{item.nick}}</td>
                            <td>{{item.unix | unixTodate}}</td>
                            <td>{{item.recv_name}}</td>
                            <td>{{item.location}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.amount}}</td>
                            <td>{{item.status | getStatus}}</td>
                            <td v-if="item.tracking_no">{{item.tracking_no}}</td>
                            <td v-if="!item.tracking_no"><button class="btn btn-success" @click="isShow(item.id)">填写</button></td>
                            <td>
                                <button class="btn btn-primary" @click="isConfirm(item.id,item.status)">{{item.status | getStatu}}</button>
                                <button class="btn btn-danger" @click="Abandoned(item.id)">废弃</button>
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
    name: 'exchangerecord',
    data() {
        return {
            Sid:'',
            account:'',
            bdt:'',
            edt:'',
            dj_list:[],
            order_num:'',
            is_show:false,
            id:''
        }
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
        getStatus(n){
            var num = Number(n);
            var str = '';
            switch(num){
                case 0:str = '未确认';
                        break;
                case 1:str = '已确认未发货';
                        break;
                case 2:str = '已确认已发货';
                        break;
                case 3:str = '已废弃';
                        break;
            }
            return str
        },
        getStatu(n){
            var num = Number(n);
            var str = '';
            switch(num){
                case 0:str = '确认';
                        break;
                case 1:str = '发送';
                        break;
                case 2:str = '已发送';
                        break;
                case 3:str = '已废弃';
                        break;
            }
            return str
        }
    },
    mounted() {
        this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
        //this.checkLogin();
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
        dateToUnix(dateStr) {
            let newstr = dateStr.replace(/-/g,'/');
            let date =  new Date(newstr);
            let time_str = date.getTime().toString();
            return time_str.substr(0, 10);
        },
        djList(){
            let _this = this
            let param = {
                sid:this.Sid,
                bdt: this.dateToUnix(this.bdt),
                edt: this.dateToUnix(this.edt),
                account:this.account,
                status:-1
            }
            if (param.bdt < param.edt) {
                api.getDj(param).then(function(res) {
                    if (res.data.Code != 3) {
                        alert(res.data.Msg)
                    } else {
                        if (res.data.Data == null) {
                            alert('暂无数据')
                        }else{
                            _this.dj_list = res.data.Data
                        }
                    }
                }).catch(function(err) {
                    console.log(err)
                    location.reload()
                })
            } else {
                alert('结束时间不得小于开始时间')
            }
        },
        isConfirm(id,status){
            let _this = this
            let param = {
                sid:this.Sid,
                id:id,
                flag:Number(status) + 1
            }
            if(param.flag > 2){
                return
            }
            api.Confirm(param).then(function(res) {
                alert(res.data.Msg);
                _this.djList();
            }).catch(function(err) {
                console.log(err)
            })
        },
        Abandoned(id){
            let _this = this
            let param = {
                sid:this.Sid,
                id:id,
                flag:3
            }
            api.Confirm(param).then(function(res) {
                alert(res.data.Msg);
                _this.djList();
            }).catch(function(err) {
                console.log(err)
            })
        },
        isShow(id){
            this.is_show = !this.is_show
            this.id = id
        },
        confirmNo(){
            let _this = this
            let param = {
                sid:this.Sid,
                id:this.id,
                tracking_no:this.order_num
            }
            api.Confirm(param).then(function(res) {
                alert(res.data.Msg);
                if(res.data.Code == 3){
                    _this.is_show = !_this.is_show
                    _this.djList();
                }
            }).catch(function(err) {
                console.log(err)
            })
        },
        dateToUnix(dateStr) {
            let newstr = dateStr.replace(/-/g,'/');
            let date =  new Date(newstr);
            let time_str = date.getTime().toString();
            return time_str.substr(0, 10);
        }
    }
}
</script>

<style scoped lang="scss">
    .exchangerecord-box {
        padding: 3rem;
    }
    #djTable td{
        padding:10px 0;
    }
    .order-box{
        background:#fff;
        width:300px;
        height:200px;
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
