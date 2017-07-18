<template>
    <div id="page-wrapper">
        <div id="page-inner">
            <div class="add-handlesuggestion">
                <div class="form-group col-md-12">
                    <label>投放地</label>
                    <select class="form-control" v-model="handlesuggestion.place">
                        <option value="">-- 请选择 --</option>
                        <option value="大厅">大厅</option>
                        <option value="战队">战队</option>
                    </select>
                </div>
                <div class="form-group col-md-12">
                    <label>商品</label>
                    <select class="form-control" v-model="handlesuggestion.category_id">
                        <option value="">-- 请选择 --</option>
                        <option value="1">果蔬1</option>
                        <option value="2">果蔬2</option>
                        <option value="3">股票</option>
                    </select>
                </div>
                <div class="form-group col-md-12">
                    <label>类型</label>
                    <select class="form-control" v-model="handlesuggestion.order_type">
                        <option value="">-- 请选择 --</option>
                        <option value="1">买入</option>
                        <option value="2">卖出</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label>开仓时间</label>
                    <input type="date" class="form-control" @blur="isCurrentTime" v-model="handlesuggestion.open_time">
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
                <div class="form-group col-md-12">
                    <label>结果</label>
                    <select class="form-control" v-model="handlesuggestion.result">
                        <option value="">-- 请选择 --</option>
                        <option value="赢单">赢单</option>
                        <option value="输单">输单</option>
                    </select>
                </div>
                <div class="form-group col-md-12">
                    <label>麦单类型</label>
                    <select class="form-control" v-model="handlesuggestion.wheat_type">
                        <option value="麦下单">麦下单</option>
                    </select>
                </div>
                <div class="btn btn-primary col-md-1 col-md-offset-4" @click="addHandleSuggestion">提交</div>
                <router-link :to="{ path: '/handlesuggestion' }" class="btn btn-default col-md-1 col-md-offset-1">取消</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import API from '@/api/API'
    const api = new API()
    export default {
        name: 'addhandlesuggestion',
        data() {
            return {
                sid: '',
                handlesuggestion: {
                    place: '', // 投放地
                    category_id: '', // 商品id
                    order_type: '', // 买入卖出
                    open_time: '', // 开仓时间
                    entry_price: '', // 仓位
                    win_price: '', // 止盈价
                    loss_price: '', // 止损价
                    result: '', // 结果
                    wheat_type: '' // 麦单类型
                }
            }
        },
        mounted() {
            this.sid = JSON.parse(window.localStorage.getItem('user')).SessionId
        },
        methods: {
            addHandleSuggestion() {
                let hs = this.handlesuggestion
                let ot = hs.open_time
                ot = ot.split('-')
                ot = this.dateToUnix(ot[0], ot[1] - 1, ot[2])
                let param = {
                    sid: this.sid,
                    place: hs.place,
                    category_id: hs.category_id,
                    order_type: hs.order_type,
                    open_time: ot,
                    entry_price: hs.entry_price,
                    win_price: hs.win_price,
                    loss_price: hs.loss_price,
                    result: hs.result,
                    wheat_type: hs.wheat_type
                }
                let _this = this
                api.addHandleSuggestion(param).then(function(res) {
                    if (res.data.Code != 3) {
                        if (res.data.Code == 6) {
                            alert('登录状态已过期, 请重新登录!')
                            _this.$router.push('/')
                        }
                        alert(res.data.Msg)
                    } else {
                        alert('添加成功!')
                        _this.$router.push('/handlesuggestion')
                    }
                }).catch(function(err) {
                    console.log(err)
                })
            },
            isCurrentTime() {
                // 当前时间戳
                let date_now = new Date()
                let dny = date_now.getFullYear()
                let dnm = date_now.getMonth()
                let dnd = date_now.getDate()
                date_now = this.dateToUnix(dny, dnm, dnd)
                // 选择时间戳
                let date_select = this.handlesuggestion.open_time
                date_select = date_select.split('-')
                date_select = this.dateToUnix(date_select[0], date_select[1] - 1, date_select[2])
                // 判断当前时间戳不能大于选择时间戳
                if (date_now > date_select) {
                    alert('所选时间不能小于当前时间!')
                    this.handlesuggestion.open_time = ''
                }
            },
            dateToUnix(y, m, d) {
                let common_time = new Date(Date.UTC(y, m, d))
                return (common_time.getTime() / 1000)
            }
        }
    }
</script>

<style scoped lang="scss">
    .add-handlesuggestion {
        padding: 5rem;
    }
</style>
