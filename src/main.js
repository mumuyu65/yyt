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
        if (to.path === '/') {
            next({
                path: '/'
            });
        } else {
            let roles = store.getters.getUser.Flag;
            if (roles == 4) {
                roles = ['superman', 'admin'];
            } else if (roles == 3) {
                roles = ['admin'];
            } else if (roles == 2) {
                roles = ['checker'];
            } else if (roles == 1) {
                roles = ['teacher'];
            } else {
                roles = ['user']
            }
            store.dispatch('GenerateRoutes', {
                roles
            }).then(() => { // 生成可访问的路由表
                router.addRoutes(store.getters.getRoutes); // 动态添加可访问路由表
                for (let route of store.getters.getRoutes) {
                    router.options.routes.push(route);
                }
                let url = '' + to.path;
                next({
                    path: url
                })
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