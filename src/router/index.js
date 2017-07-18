// this file is the router of ydd
import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'

import Index from '@/pages/Index'

//用户管理
import Home from '@/pages/accountManage'

import addUser from '@/pages/adduser'

import modifyUser from '@/pages/modifyuser'

//个人设置
import Settings from '@/pages/settings'

//新闻资讯
import EconomicNews from '@/pages/economicNews'

import AddNew from '@/pages/addNew'

import ModifyNew from '@/pages/modifyNew'

//新闻资讯类型管理
import EconomicNewsType from '@/pages/economicNewsType'

// 品类管理
const Category = resolve => require(['@/pages/category'], resolve)

// 操作建议
import HandleSuggestion from '@/pages/handlesuggestion'

const AddHandleSuggestion = resolve => require(['@/pages/addhandlesuggestion'], resolve)

//产品管理
import productsManage from '@/pages/productsManage'

// 直播管理
import ZhiboManage from '@/pages/zhibomanage'

const AddLive = resolve => require(['@/pages/addlive'], resolve)

const ModifyLive = resolve => require(['@/pages/modifylive'], resolve)

const zhibo = resolve => require(['@/pages/zhibo'], resolve)

const operational = resolve => require(['@/pages/operational'], resolve)

//高级助理管理
import qqManage from '@/pages/qqManage'

//用户等级管理
import userLevel from '@/pages/userlevel'

//用户等级图标的管理
import levelIcon from '@/pages/levelIcon'

//微信二维码管理
import qrcode from '@/pages/qrcode'

//产品介绍
import productIntro from '@/pages/productsIntro'

//产品介绍
import Clan from '@/pages/clan'

//早晚评
import DayComment from '@/pages/daycomment'

//果蔬预测
import productsComment from '@/pages/productsComment'

//课程安排
import ClassArrange from '@/pages/classArrange'

//学习课件
import juniorclasses from '@/pages/juniorclasses'

import seniorclasses from '@/pages/seniorclasses'

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
            path: '/settings',
            component: Settings
        }, {
            path: '/economicNewsType',
            component: EconomicNewsType,
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
            path: '/live',
            component: ZhiboManage
        }, {
            path: '/category',
            component: Category
        }, {
            path: '/handlesuggestion',
            component: HandleSuggestion
        }, {
            path: '/handlesuggestion/add',
            component: AddHandleSuggestion
        }, {
            path: '/live/add',
            component: AddLive
        }, {
            path: '/live/modify',
            component: ModifyLive
        }, {
            path: '/live/room',
            component: zhibo
        }, {
            path: '/live/operational',
            component: operational
        }, {
            path: '/productsManage',
            component: productsManage
        }, {
            path: '/userlevel',
            component: userLevel
        }, {
            path: '/levelIcon',
            component: levelIcon
        }, {
            path: '/qrcode',
            component: qrcode
        }, {
            path: '/productsintro',
            component: productIntro
        }, {
            path: '/clan',
            component: Clan
        }, {
            path: '/dayComment',
            component: DayComment
        }, {
            path: '/productsComment',
            component: productsComment
        }, {
            path: '/classArrange',
            component: ClassArrange
        }, {
            path: '/qqManage',
            component: qqManage
        }, {
            path: '/juniorclasses',
            component: juniorclasses
        }, {
            path: '/seniorclasses',
            component: seniorclasses
        }]
    }]
})
