// this file is the router of ydd
import Vue from 'vue'

import Router from 'vue-router'

import Login from '@/components/login'

import Index from '@/pages/Index'

//用户管理
import Home from '@/pages/accountManage'

//个人设置
import Settings from '@/pages/settings'

//新闻资讯
import EconomicNews from '@/pages/economicNews'

//新闻资讯类型管理
import EconomicNewsType from '@/pages/economicNewsType'

// 操作建议
import HandleSuggestion from '@/pages/handlesuggestion'

//产品管理
import productsManage from '@/pages/productsManage'

// 直播管理
import ZhiboManage from '@/pages/zhibomanage'

// const ZhiboManage = resolve => require(['@/pages/ZhiboManage'], resolve)

//操作建议管理
import operational from '@/pages/operational'

//高级助理管理
import qqManage from '@/pages/qqManage'

//用户等级管理
import userLevel from '@/pages/userlevel'

//微信二维码管理
import qrcode from '@/pages/qrcode'

//产品介绍
import productIntro from '@/pages/productsIntro'

//产品介绍
import Clan from '@/pages/clan'

import Comment from '@/pages/comment'

//早晚评
import DayComment from '@/pages/daycomment'

//果蔬预测
import productsComment from '@/pages/productsComment'

//课程安排
import ClassArrange from '@/pages/classArrange'

import Classes from '@/pages/classes'

//学习课件
import juniorclasses from '@/pages/juniorclasses'

import seniorclasses from '@/pages/seniorclasses'

//下载中心
import download from '@/pages/download'

import Smallgame from '@/pages/smallgame'

//小游戏
import prizemall from '@/pages/prizemall'

import exchangerecord from '@/pages/exchangerecord'

import beansrecord from '@/pages/beansrecord'

//活动专区管理
import activities from '@/pages/activities'

//聊天图片管理
import chatImg from '@/pages/chatImg'

// 用户管理
import userManage from '@/pages/userManage'

// 权限分配
import authorization from '@/pages/authorization'

Vue.use(Router)

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [{
        path: '/',
        base: __dirname,
        component: Login,
        name: '登录',
    }, //hidden为自定义属性，侧边栏那章会纤细解释
    {
        path: '/index',
        name: 'Index',
        component: Index,
        redirect: '/settings',
        meta: {
            role: ['admin', 'superman']
        },
        children: [],
    }
];

//实例化vue的时候只挂载constantRouter
export default new Router({
    routes: [{
        path: '/',
        base: __dirname,
        component: Login,
        name: '登录',
        hidden: true
    }, {
        path: '/index',
        name: 'Index',
        component: Index,
        redirect: '/settings',
        meta: {
            role: ['admin', 'superman']
        },
        children: [{ //个人中心
            path: '/settings',
            name: '个人中心',
            hidden: true,
            icon: 'fa fa-user fa-2x',
            component: Settings,
            noDropdown: true,
        }, { //账户管理
            path: '/home',
            component: Home,
            name: '账户管理',
            meta: {
                role: ['superman']
            },
            icon: 'fa fa-dashboard fa-2x',
            noDropdown: true,
        }, { //用户管理
            path: '/userManage',
            component: userManage,
            name: '用户权限管理',
            meta: {
                role: ['admin', 'superman']
            },
            icon: 'fa fa-vcard fa-2x',
            noDropdown: true,
        }, { //权限分配
            path: '/authorization',
            component: authorization,
            name: '权限分配',
            meta: {
                role: ['superman']
            },
            icon: 'fa fa-address-book-o fa-2x',
            noDropdown: true,
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
        }, { //直播管理
            path: '/live',
            component: ZhiboManage,
            name: '直播管理',
            meta: {
                role: ['checker', 'admin', 'superman']
            },
            icon: 'fa fa-file-video-o fa-2x',
            noDropdown: true,
        }, {
            path: '/comment',
            name: '老师点评',
            redirect: '/comment/dayComment',
            noDropdown: false,
            component: Comment,
            meta: {
                role: ['teacher', 'superman']
            },
            icon: 'fa fa-comments fa-2x',
            children: [{
                path: '/comment/dayComment',
                component: DayComment,
                name: '早晚评',
            }, {
                path: '/comment/productsComment',
                component: productsComment,
                name: '果蔬预测',
            }]
        }, {
            path: '/classes',
            name: '学习课件',
            redirect: '/classes/juniorclasses',
            noDropdown: false,
            component: Classes,
            meta: {
                role: ['teacher', 'superman']
            },
            icon: 'fa fa-book fa-2x',
            children: [{
                path: '/classes/juniorclasses',
                component: juniorclasses,
                name: '基础课件',
            }, {
                path: '/classes/seniorclasses',
                component: seniorclasses,
                name: '高级课件',
            }]
        // }, {
        //     path: '/smallgame',
        //     name: '小游戏',
        //     redirect: '/smallgame/prizemall',
        //     noDropdown: false,
        //     component: Smallgame,
        //     meta: {
        //         role: ['admin', 'superman']
        //     },
        //     icon: 'fa fa-gamepad fa-2x',
        //     children: [{
        //         path: '/smallgame/prizemall',
        //         component: prizemall,
        //         name: '积分商城',
        //     }, {
        //         path: '/smallgame/exchangerecord',
        //         component: exchangerecord,
        //         name: '兑换记录',
        //     }, {
        //         path: '/smallgame/beansrecord',
        //         component: beansrecord,
        //         name: '赢豆记录',
        //     }]
        }, { //操作建议管理
            path: '/handlesuggestion',
            component: HandleSuggestion,
            name: '操作建议管理',
            meta: {
                role: ['teacher', 'checker', 'superman']
            },
            icon: 'fa fa-sitemap fa-2x',
            noDropdown: true,
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
            name: '用户等级图标管理',
            meta: {
                role: ['admin', 'superman']
            },
            icon: 'fa fa-gear fa-2x',
            noDropdown: true,
        }, { //微信二维码管理
            path: '/qrcode',
            component: qrcode,
            name: '微信二维码管理',
            meta: {
                role: ['admin', 'superman']
            },
            icon: 'fa fa-qrcode fa-2x',
            noDropdown: true,
        }, { //活动专区管理
            path: '/activities',
            component: activities,
            name: '活动专区管理',
            meta: {
                role: ['admin', 'superman']
            },
            icon: 'fa fa-heart-o fa-2x',
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
        }, { //聊天图片
            path: '/chatImg',
            component: chatImg,
            name: '聊天图片',
            meta: {
                role: ['admin', 'superman']
            },
            icon: 'fa fa-file-image-o fa-2x',
            noDropdown: true,
        }, { //下载中心
            path: '/download',
            component: download,
            name: '下载中心',
            meta: {
                role: ['admin', 'superman']
            },
            icon: 'fa fa-download fa-2x',
            noDropdown: true,
        }]
    }]
});

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [{ //个人中心
    path: '/settings',
    name: '个人中心',
    hidden: true,
    icon: 'fa fa-user fa-2x',
    component: Settings,
    noDropdown: true,
}, { //账户管理
    path: '/home',
    component: Home,
    name: '账户管理',
    meta: {
        role: ['superman']
    },
    icon: 'fa fa-dashboard fa-2x',
    noDropdown: true,
}, { //用户管理
    path: '/userManage',
    component: userManage,
    name: '用户权限管理',
    meta: {
        role: ['admin', 'superman']
    },
    icon: 'fa fa-vcard fa-2x',
    noDropdown: true,
}, { //权限分配
    path: '/authorization',
    component: authorization,
    name: '权限分配',
    meta: {
        role: ['superman']
    },
    icon: 'fa fa-address-book-o fa-2x',
    noDropdown: true,
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
}, { //直播管理
    path: '/live',
    component: ZhiboManage,
    name: '直播管理',
    meta: {
        role: ['checker', 'admin', 'superman']
    },
    icon: 'fa fa-file-video-o fa-2x',
    noDropdown: true,
}, {
    path: '/comment',
    name: '老师点评',
    redirect: '/comment/dayComment',
    noDropdown: false,
    meta: {
        role: ['teacher', 'superman']
    },
    icon: 'fa fa-comments fa-2x',
    children: [{
        path: '/comment/dayComment',
        component: DayComment,
        name: '早晚评',
    }, {
        path: '/comment/productsComment',
        component: productsComment,
        name: '果蔬预测',
    }]
}, {
    path: '/classes',
    name: '学习课件',
    redirect: '/classes/juniorclasses',
    noDropdown: false,
    meta: {
        role: ['teacher', 'superman']
    },
    icon: 'fa fa-book fa-2x',
    children: [{
        path: '/classes/juniorclasses',
        component: juniorclasses,
        name: '基础课件',
    }, {
        path: '/classes/seniorclasses',
        component: seniorclasses,
        name: '高级课件',
    }]
    // }, {
    //     path: '/smallgame',
    //     name: '小游戏',
    //     redirect: '/smallgame/prizemall',
    //     noDropdown: false,
    //     meta: {
    //         role: ['admin', 'superman']
    //     },
    //     icon: 'fa fa-gamepad fa-2x',
    //     children: [{
    //         path: '/smallgame/prizemall',
    //         component: prizemall,
    //         name: '积分商城',
    //     }, {
    //         path: '/smallgame/exchangerecord',
    //         component: exchangerecord,
    //         name: '兑换记录',
    //     }, {
    //         path: '/smallgame/beansrecord',
    //         component: beansrecord,
    //         name: '赢豆记录',
    //     }]
}, { //操作建议管理
    path: '/handlesuggestion',
    component: HandleSuggestion,
    name: '操作建议管理',
    meta: {
        role: ['teacher', 'checker', 'superman']
    },
    icon: 'fa fa-sitemap fa-2x',
    noDropdown: true,
}, { //品类管理
    path: '/productsManage',
    component: productsManage,
    name: '品类管理',
    meta: {
        role: ['admin', 'superman']
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
}, { //微信二维码管理
    path: '/qrcode',
    component: qrcode,
    name: '微信二维码管理',
    meta: {
        role: ['admin', 'superman']
    },
    icon: 'fa fa-qrcode fa-2x',
    noDropdown: true,
}, { //活动专区管理
    path: '/activities',
    component: activities,
    name: '活动专区管理',
    meta: {
        role: ['admin', 'superman']
    },
    icon: 'fa fa-heart-o fa-2x',
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
}, { //聊天图片
    path: '/chatImg',
    component: chatImg,
    name: '聊天图片',
    meta: {
        role: ['admin', 'superman']
    },
    icon: 'fa fa-file-image-o fa-2x',
    noDropdown: true,
}, { //下载中心
    path: '/download',
    component: download,
    name: '下载中心',
    meta: {
        role: ['admin', 'superman']
    },
    icon: 'fa fa-download fa-2x',
    noDropdown: true,
}];