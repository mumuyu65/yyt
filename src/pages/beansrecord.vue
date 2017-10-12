<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div class="beansrecord-box">
                <ul class="list-inline">
                    <li><h3>赢豆记录</h3></li>
                    <li class="pull-right">
                        <ol class="list-inline" style="margin-top:15px;">
                          <li style="vertical-align:top;"><input type="text" class="form-control"  placeholder="请输入手机号" v-model="search_account" /></li>
                          <li><button @click="getRecordRough"
                              style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                              搜索
                          </button></li>
                        </ol>
                    </li>
                </ul>
                <hr/>
                <div v-if="!is_show_sign">
                    <div v-if="!is_show_bean">
                        <table class="table table-hover col-md-12" style="margin-top: 3rem;">
                            <tr>
                                <th>头像</th>
                                <th>手机号</th>
                                <th>昵称</th>
                                <th>签到情况</th>
                                <th>赢数量/局数</th>
                                <th>输数量/局数</th>
                                <th>总赢豆</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="item in user_info">
                                <td><img class="user-head" :src="item.headurl" alt=""></td>
                                <td>{{item.account}}</td>
                                <td>{{item.nick}}</td>
                                <td><div class="btn btn-default" @click="showSignin(item)">查看</div></td>
                                <td>{{item.win}}</td>
                                <td>{{item.lose}}</td>
                                <td>{{item.beans}}</td>
                                <td><div class="btn btn-info" @click="getBeansRecord(item)">明细</div></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div v-if="is_show_bean">
                    <div class="user-info-box">
                        <div class="user-info pull-left">
                            <div class="user-head">
                                <img :src="beans_account.headurl" alt="">
                            </div>
                            <div class="user-nick">{{beans_account.nick}}</div>
                            <div class="user-account">{{beans_account.account}}</div>
                        </div>
                        <div class="btn btn-danger pull-right" @click="isShowBean">返回</div>
                    </div>
                    <div class="beans-record">
                        <table class="table table-hover">
                            <tr>
                                <th>时间</th>
                                <th>赢豆</th>
                                <th>内容</th>
                            </tr>
                            <tr v-for="item in beans_record">
                                <td>{{item.unix | unixToDate}}</td>
                                <td>{{item.beans}}</td>
                                <td>{{item.types | beansRecordTypes}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div v-if="is_show_sign">
                    <div class="col-md-4">
                        <select class="form-control" v-model="signin_record_time">
                            <option value="">-- 请选择年份 --</option>
                            <option value="2017">2017年</option>
                            <option value="2016">2016年</option>
                        </select>
                    </div>
                    <div class="btn btn-primary" @click="getSigninRecord">查询</div>
                    <div class="btn btn-danger pull-right" @click="isShowSign">返回</div>
                    <div class="beans-record">
                        <table class="table table-hover">
                            <tr>
                                <th>时间</th>
                                <th>赢豆</th>
                            </tr>
                            <tr v-for="item in singIn">
                                <td>{{item.unix | unixToDate}}</td>
                                <td>{{item.beans}}</td></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API()

import axios from 'axios'

import env from '@/config/env'

export default {
    name: 'beansrecord',
    data (){
        return {
            Sid:'',
            is_show_sign: false,
            is_show_bean: false,
            search_account: '',
            user_info: [],
            beans_record: [],
            beans_account: {
                account: '',
                headurl: '',
                nick: ''
            },
            signin_record_account: '',
            signin_record_time: '',
            singIn:[]
        }
    },
    filters: {
        unixToDate(unix) {
            let time = new Date(unix*1000);
            let y = time.getFullYear();
            let m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
            let d = (time.getDate())<10?('0'+time.getDate()):time.getDate();
            let h = (time.getHours())<10?('0'+time.getHours()):time.getHours();
            let min = (time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
            return y+'-'+m+'-'+d+' '+h+':'+m;
        },
        beansRecordTypes(types) {
            let res = ''
            types = parseInt(types)
            switch (types) {
                case 1: res = '投注'; break;
                case 2: res = '签到'; break;
                case 3: res = '猜对奖励'; break;
                case 4: res = '充值'; break;
                case 5: res = '兑换奖励消耗'; break;
            }
            return res
        }
    },
    mounted() {
        this.Sid = JSON.parse(window.localStorage.getItem('user')).SessionId;
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
        isShowSign() {
            this.is_show_sign = !this.is_show_sign
        },
        isShowBean() {
            this.is_show_bean = !this.is_show_bean
        },
        getRecordRough() {
            let _this = this
            let param = {
                sid: this.Sid,
                account: this.search_account
            }
            api.getRecordRough(param).then(function(res) {
                if (res.data.Code != 3) {
                    alert(res.data.Msg)
                    if (res.data.Code == 6) {
                        _this.$router.push('/')
                    }
                } else {
                    _this.user_info = res.data.Data
                }
            }).catch(function(res) {
                console.log(res)
            })
        },
        getBeansRecord(item) {
            this.isShowBean()
            this.beans_account.account = item.account
            this.beans_account.headurl = item.headurl
            this.beans_account.nick = item.nick
            let _this = this
            let param = {
                sid: this.Sid,
                begidx: 0,
                counts: 100,
                account: item.account
            }
            api.getBeansChangeRecord(param).then(function(res) {
                if (res.data.Code != 3) {
                    alert(res.data.Msg)
                    if (res.data.Code == 6) {
                        _this.$router.push('/')
                    }
                } else {
                    _this.beans_record = res.data.Data.Detail
                }
            }).catch(function(res) {
                console.log(res)
            })
        },
        dateToUnix(time) {
            time = time.split('-')
            let odate = new Date(time[0], time[1] - 1, time[2]).getTime() / 1000
            return odate
        },
        showSignin(item) {
            this.isShowSign()
            this.signin_record_account = item.account
        },
        getSigninRecord() {
            let _this = this
            let param = {
                sid: this.Sid,
                account: this.signin_record_account,
                bdt: this.dateToUnix(this.signin_record_time + '-1-1'),
                edt: this.dateToUnix(this.signin_record_time + '-12-31')
            }
            api.getSigninRecord(param).then(function(res) {
                if (res.data.Code != 3) {
                    alert(res.data.Msg)
                } else {
                    if(res.data.Data == null){
                        alert('没有签到记录')
                    }else{
                        _this.singIn = res.data.Data
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .beansrecord-box {
        padding: 3rem;
    }
    .user-head {
        width: 6rem;
        height:6rem;
        border-radius: 50%;
    }
    .user-info-box {
        &:after {
            display: table;
            content: ' ';
            clear: both;
        }
        .user-info {
            margin-bottom: 2rem;
            &:after {
                display: table;
                content: ' ';
                clear: both;
            }
            .user-head, .user-nick, .user-account {
                float: left;
            }
            .user-nick, .user-account {
                margin-left: 1rem;
                line-height: 6rem;
                font-size: 3rem;
            }
            .user-account {
                margin-left: 2rem;
            }
        }
    }
</style>
