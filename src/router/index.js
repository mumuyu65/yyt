// this file is the router of ydd
import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'

import Index from '@/pages/Index'

//用户管理
import Home from '@/pages/accountManage'

import addUser from '@/pages/adduser'

import modifyUser from '@/pages/modifyuser'

//新闻资讯
import EconomicNews from '@/pages/economicNews'

import AddNew from '@/pages/addNew'

import ModifyNew from '@/pages/modifyNew'

//操作建议
import HandleSuggestion from '@/pages/handlesuggestion'

//直播管理
import ZhiboManage from '@/pages/zhibomanage'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: '/index',
        name: 'Index',
        component: Index,
        redirect: '/home',
        children: [{
            path: '/home',
            component: Home
        }, {
            path: '/addUser',
            component: addUser
        }, {
            path: '/modifyUser',
            component: modifyUser
        }, {
            path: '/economicNews',
            component: EconomicNews,
        }, {
            path: '/addNew',
            component: AddNew
        }, {
            path: '/modifyNews',
            component: ModifyNew
        }, {
            path: '/zhibomanage',
            component: ZhiboManage
        }, {
            path: '/handlesuggestion',
            component: HandleSuggestion
        }]
    }]
})