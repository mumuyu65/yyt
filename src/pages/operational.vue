<template>
    <div id="page-wrapper">
        <div id="page-inner" class="operational">
            <div class="tools">
                <form class="form-inline">
                    <div class="form-group col-md-3">
                        <label>起始时间</label>
                        <input type="date" class="form-control">
                    </div>
                    <div class="form-group col-md-3">
                        <label>结束时间</label>
                        <input type="date" class="form-control">
                    </div>
                    <div class="form-group col-md-2">
                        <select class="form-control" style="width: 100%;">
                            <option value="">所有商品</option>
                        </select>
                    </div>
                    <div class="form-group col-md-2">
                        <select class="form-control" style="width: 100%;">
                            <option value="">所有分析师</option>
                        </select>
                    </div>
                    <div class="btn btn-primary">搜索</div>
                </form>
            </div>
            <table class="table table-hover">
                <tr>
                    <th>开仓时间</th>
                    <th>类型</th>
                    <th>仓位</th>
                    <th>商品</th>
                    <th>开仓价</th>
                    <th>止损价</th>
                    <th>止盈价</th>
                    <th>结果</th>
                    <th>麦单类型</th>
                    <th>老师</th>
                    <th>操作</th>
                </tr>
                <tr>
                    <td>年月日时分秒</td>
                    <td>买入/卖出</td>
                    <td>2</td>
                    <td>果蔬2</td>
                    <td>324234</td>
                    <td>324234</td>
                    <td>324234</td>
                    <td>赢单</td>
                    <td>下单</td>
                    <td>王某某</td>
                    <td><div class="btn btn-success btn-xs">开启</div></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'operational',
        data() {
            return {
                user: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .operational {
        .tools {
            border-bottom: 1px solid #c0c0c0;
            padding: 2rem;
            &:after {
                display: table;
                content: ' ';
                clear: both;
            }
            .form-inline, .form-group, .form-group .form-control {
                margin: 0;
            }
        }
    }
</style>
