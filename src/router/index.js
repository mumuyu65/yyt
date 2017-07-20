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

//操作建议管理
import operational from '@/pages/operational'

//高级助理管理
import qqManage from '@/pages/qqManage'

//用户等级管理
import userLevel from '@/pages/userlevel'

import userLeveladd from '@/pages/userLeveladd'

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

//下载中心
import download from '@/pages/download'

//小游戏
import prizemall from '@/pages/prizemall'

import exchangerecord from '@/pages/exchangerecord'

import beansrecord from '@/pages/beansrecord'

Vue.use(Router)

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [{
        path: '/',
        component: Login,
        hidden: true
    }, //hidden为自定义属性，侧边栏那章会纤细解释

]

//实例化vue的时候只挂载constantRouter
export default new Router({
    routes: constantRouterMap
});

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [{
        path: '/home',
        component: Home,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/addUser',
        component: addUser,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/modifyUser',
        component: modifyUser,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/settings',
        component: Settings,
        hidden: true
    }, //个人中心
    {
        path: '/economicNewsType',
        component: EconomicNewsType,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/economicNews',
        component: EconomicNews,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/addNew',
        component: AddNew,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/modifyNews',
        component: ModifyNew,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/live',
        component: ZhiboManage,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/handlesuggestion',
        component: HandleSuggestion,
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
    }, {
        path: '/handlesuggestion/add',
        component: AddHandleSuggestion,
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
    }, {
        path: '/live/add',
        component: AddLive,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/live/modify',
        component: ModifyLive,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/live/room',
        component: zhibo,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/live/operational',
        component: operational,
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
    }, {
        path: '/productsManage',
        component: productsManage,
        meta: {
            role: ['admin']
        },
    }, {
        path: '/userlevel',
        component: userLevel,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/userlevel/add',
        component: userLeveladd,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/qrcode',
        component: qrcode,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/productsintro',
        component: productIntro,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/clan',
        component: Clan,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/dayComment',
        component: DayComment,
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
    }, {
        path: '/productsComment',
        component: productsComment,
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
    }, {
        path: '/classArrange',
        component: ClassArrange,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/qqManage',
        component: qqManage,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/juniorclasses',
        component: juniorclasses,
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
    }, {
        path: '/seniorclasses',
        component: seniorclasses,
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
    }, {
        path: '/download',
        component: download,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/prizemall',
        component: prizemall,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/exchangerecord',
        component: exchangerecord,
        meta: {
            role: ['admin', 'superman']
        },
    }, {
        path: '/beansrecord',
        component: beansrecord,
        meta: {
            role: ['admin', 'superman']
        },
    }
];