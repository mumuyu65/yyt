<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div class="exchangerecord-box">
                <ul class="list-inline">
                    <li><h3>兑换记录</h3></li>
                </ul>
                <hr/>
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
        }
    },
    mounted() {
        this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    },
    methods: {

    },
}
</script>

<style scoped lang="scss">
    .exchangerecord-box {
        padding: 3rem;
    }
</style>
