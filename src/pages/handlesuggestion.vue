<template>
   <div id="page-wrapper">
        <div id="page-inner">
            <div class="handlesuggestion">
                <div class="tools">
                    <form class="form-inline">
                        <div class="form-group col-md-3">
                            <label>起始时间</label>
                            <input type="date" class="form-control" v-model="start_time">
                        </div>
                        <div class="form-group col-md-3">
                            <label>结束时间</label>
                            <input type="date" class="form-control" v-model="end_time">
                        </div>
                        <div class="form-group col-md-2">
                            <select class="form-control" style="width: 100%;" v-model="prize">
                                <option value="">所有商品</option>
                                <option v-for="p in all_prizes" :value="p.id">{{p.title}}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2">
                            <select class="form-control" style="width: 100%;" v-model="teacher">
                                <option value="">所有分析师</option>
                                <option v-for="t in all_teachers" :value="t.nick">{{t.nick}}</option>
                            </select>
                        </div>
                        <div class="btn btn-primary" @click="getHandleSuggestion">搜索</div>
                        <router-link class="btn btn-info" :to="{ path: '/handlesuggestion/add' }">新增</router-link>
                    </form>
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

export default {
    name: 'handlesuggestion',
    mounted(){
        this.user = JSON.parse(window.localStorage.getItem('user'))
        this.initData();
    },
    data (){
        return {
            user: '',
            start_time: '',
            end_time: '',
            prize: '',
            teacher: '',
            all_prizes: [
                { title: '果蔬1', id: '1' },
                { title: '果蔬2', id: '2' },
                { title: '果蔬3', id: '3' }
            ],
            all_teachers: [
                { nick: '王老师' },
                { nick: '李老师' },
                { nick: '张老师' }
            ]
        }
    },
    methods:{
        initData() {

        },
        getHandleSuggestion() {
            let param = {
                bdt: this.dateToUnix(this.start_time),
                edt: this.dateToUnix(this.end_time),
                category_id: this.prize,
                analysts: this.teacher,
                begidx: 0,
                countes: 100
            }
            if (param.bdt < param.edt) {
                api.queryHandleSuggestion(param).then(function(res) {
                    console.log(res)
                    if (res.data.Code == 3) {
                        if (res.data.Data == null) {
                            alert('暂无数据')
                        }
                    }
                }).catch(function(err) {
                    console.log(err)
                })
            } else {
                alert('结束时间不得小于开始时间')
            }
        },
        dateToUnix(time) {
            let oTime = time.split('-')
            let oDate = new Date(Date.UTC(
                parseInt(oTime[0]),
                parseInt(oTime[1]),
                parseInt(oTime[2])
            ))
            return (oDate.getTime() / 1000)
        }
    }
}
</script>

<style scoped lang="scss">
    .handlesuggestion {
        padding: 3rem;
        .tools {
            border-bottom: 1px solid #c0c0c0;
        }
    }
</style>
