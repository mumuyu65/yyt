<template>
    <div id="page-wrapper">
        <div id="page-inner">
            <div class="modifylive">
                <div class="form-group">
                    <label>标题</label>
                    <input type="text" class="form-control" placeholder="请输入标题">
                </div>
                <div class="form-group">
                    <label>直播老师</label>
                    <input type="text" class="form-control" placeholder="请输入直播老师">
                </div>
                <div class="form-group">
                    <label>拉流地址</label>
                    <input type="text" class="form-control" placeholder="请输入拉流地址">
                </div>
                <div class="form-group">
                    <label>简介</label>
                    <textarea class="form-control" placeholder="请输入简介"></textarea>
                </div>
                <div @click="modifyLive" class="btn btn-primary">确认</div>
                <router-link :to="{ path: '/zhibomanage' }" class="btn btn-default">取消</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'modifylive',
        data() {
            return {
                live_data: {
                    title: '',
                    teacher: '',
                    live_url: '',
                    intro: ''
                },
                user: {}
            }
        },
        mounted() {
            this.user = JSON.parse(window.localStorage.getItem('user'))
        },
        methods: {
            modifyLive() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .modifylive {
        padding: 5rem;
    }
</style>
