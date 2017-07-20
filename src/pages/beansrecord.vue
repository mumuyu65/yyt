<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div class="beansrecord-box">
                <ul class="list-inline">
                    <li><h3>赢豆记录</h3></li>
                </ul>
                <hr/>
                <div v-if="!is_show_sign">
                    <div v-if="!is_show_bean">
                        <div class="container">
                            <div class="col-md-4">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="请输入手机号">
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary" type="button">搜索</button>
                                    </span>
                                </div>
                            </div>
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
                                <tr>
                                    <td><img class="user-head" src="" alt=""></td>
                                    <td></td>
                                    <td></td>
                                    <td><div class="btn btn-default">查看</div></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><div class="btn btn-info">明细</div></td>
                                </tr>
                            </table>
                        </div>
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
            beans_record: []
        }
    },
    mounted() {
        this.Sid = JSON.parse(window.localStorage.getItem('user')).SessionId
        this.getBeansRecord()
    },
    methods: {
        isShowSign() {
            this.is_show_sign = !this.is_show_sign
        },
        isShowBean() {
            this.is_show_bean = !this.is_show_bean
        },
        getBeansRecord() {
            let _this = this
            let param = {
                sid: this.Sid,
                begidx: 0,
                counts: 100
            }
            api.getBeansChangeRecord(param).then(function(res) {
                console.log(res)
                if (res.data.Code != 3) {
                    alert(res.data.Msg)
                    if (res.data.Code == 6) {
                        _this.$router.push('/')
                    }
                } else {
                    _this.beans_record = res.data.Data.Detail
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
</style>
