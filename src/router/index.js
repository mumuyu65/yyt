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
        name: '退出',
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
    path: '/index',
    name: 'Index',
    component: Index,
    redirect: '/settings',
    meta: {
        role: ['admin', 'superman']
    },
    children: [{ //个人中心
        path: '/settings',
        component: Settings,
        name: '个人中心',
        hidden: true,
        icon: 'fa fa-user fa-2x',
        noDropdown: true,
    }, { //账户管理
        path: '/home',
        component: Home,
        name: '账户管理',
        meta: {
            role: ['admin', 'superman']
        },
        icon: 'fa fa-dashboard fa-2x',
        noDropdown: true,
        children: [{
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
        }],
    }, { //新闻资讯类别管理
        path: '/economicNewsType',
        component: EconomicNewsType,
        name: '新闻资讯类别管理',
        meta: {
            role: ['admin', 'superman']
        },
        icon: 'fa fa-users fa-2x',
        noDropdown: true,
    }, { //新闻资讯
        path: '/economicNews',
        component: EconomicNews,
        name: '新闻资讯管理',
        meta: {
            role: ['admin', 'superman']
        },
        icon: 'fa fa-hacker-news fa-2x',
        noDropdown: true,
        children: [{
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
        }],
    }, { //直播管理
        path: '/live',
        component: ZhiboManage,
        name: '直播管理',
        meta: {
            role: ['checker', 'admin', 'superman']
        },
        icon: 'fa fa-file-video-o fa-2x',
        noDropdown: true,
        children: [{
            path: '/live/add',
            component: AddLive,
        }, {
            path: '/live/modify',
            component: ModifyLive,
        }, {
            path: '/live/room',
            component: zhibo,
        }, {
            path: '/live/operational',
            component: operational,
        }],
    }, { //操作建议管理
        path: '/handlesuggestion',
        component: HandleSuggestion,
        name: '操作建议管理',
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
        icon: 'fa fa-sitemap fa-2x',
        noDropdown: true,
        children: [{
            path: '/handlesuggestion/add',
            component: AddHandleSuggestion,
        }],
    }, { //品类管理
        path: '/productsManage',
        component: productsManage,
        name: '品类管理',
        meta: {
            role: ['admin']
        },
        icon: 'fa fa-joomla fa-2x',
        noDropdown: true,
    }, { //用户等级管理
        path: '/userlevel',
        component: userLevel,
        name: '用户等级管理',
        meta: {
            role: ['admin', 'superman']
        },
        icon: 'fa fa-gear fa-2x',
        noDropdown: true,
        children: [{
            path: '/userlevel/add',
            component: userLeveladd,
        }],
    }, { //微信二维码管理
        path: '/qrcode',
        component: qrcode,
        name: '微信二维码管理',
        meta: {
            role: ['admin', 'superman']
        },
        icon: 'fa fa-qrcode fa-2x',
        noDropdown: true,
    }, { //产品介绍管理
        path: '/productsintro',
        component: productIntro,
        name: '产品介绍管理',
        meta: {
            role: ['admin', 'superman']
        },
        icon: 'fa fa-codepen fa-2x',
        noDropdown: true,
    }, { //战队介绍管理
        path: '/clan',
        component: Clan,
        name: '战队介绍管理',
        meta: {
            role: ['admin', 'superman']
        },
        icon: 'fa fa-cubes fa-2x',
        noDropdown: true,
    }, {
        //早晚评管理
        path: '/dayComment',
        component: DayComment,
        name: '早晚评',
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
        icon: 'fa fa-comments fa-2x',
        noDropdown: false,
    }, { //果蔬预测
        path: '/productsComment',
        component: productsComment,
        name: '果蔬预测',
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
        icon: 'fa fa-comments fa-2x',
        noDropdown: false,
    }, { //课程安排管理
        path: '/classArrange',
        component: ClassArrange,
        name: '课程安排',
        meta: {
            role: ['admin', 'superman']
        },
        icon: 'fa fa-table fa-2x',
        noDropdown: true,
    }, { //高级助理管理
        path: '/qqManage',
        component: qqManage,
        meta: {
            role: ['admin', 'superman']
        },
        name: '高级助理',
        icon: 'fa fa-qq fa-2x',
        noDropdown: true,
    }, { //基础课件
        path: '/juniorclasses',
        component: juniorclasses,
        name: '基础课件',
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
        icon: 'fa fa-book fa-2x',
        noDropdown: false,
    }, { //高级课件
        path: '/seniorclasses',
        component: seniorclasses,
        name: '高级课件',
        meta: {
            role: ['teacher', 'admin', 'superman']
        },
        icon: 'fa fa-book fa-2x',
        noDropdown: false,
    }, { //下载中心
        path: '/download',
        component: download,
        name: '下载中心',
        meta: {
            role: ['admin', 'superman']
        },
        icon: 'fa fa-download fa-2x',
        noDropdown: true,
    }, { //积分商城
        path: '/prizemall',
        component: prizemall,
        name: '积分商城',
        meta: {
            role: ['admin', 'superman']
        },
        noDropdown: false,
    }, { //兑换记录
        path: '/exchangerecord',
        component: exchangerecord,
        name: '兑换记录',
        meta: {
            role: ['admin', 'superman']
        },
        noDropdown: false,
    }, { //赢豆记录
        path: '/beansrecord',
        component: beansrecord,
        name: '赢豆记录',
        meta: {
            role: ['admin', 'superman']
        },
        noDropdown: false,
    }]
}];