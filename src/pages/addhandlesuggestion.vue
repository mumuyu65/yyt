<template>
<div id="page-wrapper">
    <div id="page-inner">
        <h3>新增操作建议</h3>
        <hr/>
        <div class="row">
            <div class="form-group col-md-6">
                <label>投放地</label>
                <select class="form-control" v-model="handlesuggestion.place">
                    <option value="大厅直播">大厅直播</option>
                    <option value="战队直播">战队直播</option>
                </select>
            </div>
            <div class="form-group col-md-6">
                <label>商品</label>
                <select class="form-control" v-model="handlesuggestion.category_id">
                    <option v-for="item in category" :value="item.id">{{item.name}}</option>
                </select>
            </div>
            <div class="form-group col-md-6">
                <label>类型</label>
                <select class="form-control" v-model="handlesuggestion.order_type">
                    <option value="买入">买入</option>
                    <option value="卖出">卖出</option>
                </select>
            </div>
            <div class="form-group col-md-6">
                <label>开仓时间</label>
                <input type="text" class="form-control" id="form_datetime"/>
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
                    <option value="赢单">赢单</option>
                    <option value="输单">输单</option>
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
            <button @click="addHandleSuggestion" class="btn btn-danger">提交</button>
            <router-link :to="{ path: '/handlesuggestion' }" class="btn btn-default">取消</router-link>
        </div>
    </div>
</div>
</template>

<script>
import API from '@/api/API'

const api = new API();

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.js';

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js';

export default {
    name: 'addhandlesuggestion',
    data() {
        return {
            sid: '',
            handlesuggestion: {
                place: '大厅直播', // 投放地
                category_id: '', // 商品id
                order_type: '买入', // 买入卖出
                entry_price: '', // 仓位
                win_price: '', // 止盈价
                loss_price: '', // 止损价
                result: '赢单', // 结果
                wheat_type: '麦下单' // 麦单类型
            },
            category: [],
            open_time: '', // 开仓时间
        }
    },
    mounted() {
        this.sid = JSON.parse(window.localStorage.getItem('user')).SessionId;
        this.getCategory();
         //时间
        $("#form_datetime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            todayBtn: true,
            language:'zh-CN',
            pickerPosition: "bottom"
        });
    },
    methods: {
        getCategory() {
            let _this = this;
            api.queryCategory().then(function(res) {
                if (res.data.Code != 3) {
                    if (res.data.Code == 6) {
                        alert('登录状态已过期, 请重新登录!');
                        _this.$router.push('/');
                    }
                    alert(res.data.Msg);
                } else {
                    _this.category = res.data.Data;
                }
            })
        },
        addHandleSuggestion() {
            let hs = this.handlesuggestion;
            let ot = $("#form_datetime").val();
            let arr = ot.replace(/ |:/g, '-').split('-');
            let date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]).getTime()/1000;
            let param = {
                sid: this.sid,
                place: hs.place,
                category_id: hs.category_id,
                order_type: hs.order_type,
                open_time: date,
                entry_price: hs.entry_price,
                win_price: hs.win_price,
                loss_price: hs.loss_price,
                result: hs.result,
                wheat_type: hs.wheat_type
            }
            let _this = this;
            api.addHandleSuggestion(param).then(function(res) {
                if (res.data.Code == 3) {
                    _this.$router.push('/handlesuggestion')

                }
                alert(res.data.Msg);
            }).catch(function(err) {
                console.log(err)
            })
        },
    }
}
</script>

<style scoped>
.add-handlesuggestion {
    padding: 5rem;
}
</style>
