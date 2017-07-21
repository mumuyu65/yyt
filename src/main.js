// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'

import 'bootstrap-table'

import store from './store/store'

// register global progress.
const whiteList = ['/']; // 不重定向白名单

// permissiom judge
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
    if (!permissionRoles) return true; //免权限，直接通过
    return roles.some(role => permissionRoles.indexOf(role) >= 0) //监测roles数组中是否存在某些权限
}

//关闭生产模式下给出的提示
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (store.getters.getUser.Flag) { // 判断是否有user
        if (to.path === '/login') {
            next({
                path: '/'
            });
        } else {
            let roles = store.getters.getUser.Flag;
            if (roles == 4) {
                roles = ['superman'];
            } else if (roles == 3) {
                roles = ['admin'];
            } else if (roles == 2) {
                roles = ['checker'];
            } else if (roles == 1) {
                roles = ['teacher'];
            } else {
                roles = ['user']
            }
            store.dispatch('changeRole', roles).then(() => {
                if (store.getters.getRoles.length === 1) { // 判断当前用户是否已拉取完user_info信息
                    store.dispatch('generateRoutes', {
                        roles
                    }).then(() => { // 生成可访问的路由表
                        router.matcher.addRoutes(store.getters.getRoutes) // 动态添加可访问路由表
                        store.dispatch('changeAdmin', store.getters.getRoutes);
                        next();
                    })
                } else {
                    // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                    if (hasPermission(store.getters.getRoles, to.meta.role)) {
                        next();
                    }
                }
            })

        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/'); // 否则全部重定向到登录页
        }
    }
});

// 生产环境错误日志
if (process.env === 'production') {
    Vue.config.errorHandler = function(err, vm) {
        console.log(err, window.location.href);
        errLog.pushLog({
            err,
            url: window.location.href,
            vm
        })
    };
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});