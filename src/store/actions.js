/**
 * Created by yangyangyu on 17/6/26.
 */
export const changeUser = ({
    commit
}, value) => {
    commit('CHANGE_USER', value)
}

// 异步动态添加路由表

import {
    asyncRouterMap,
    constantRouterMap
} from '@/router';


function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}


function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

export const generateRoutes = ({
    commit
}, value) => {
    const {
        roles
    } = value;
    let accessedRouters;
    if (roles.indexOf('admin') >= 0) {
        accessedRouters = asyncRouterMap;
    } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap[0].children, roles);
    }
    commit('SET_ROUTERS', accessedRouters);
}


export const changeRole = ({
    commit
}, value) => {
    commit('SET_ROLES', value);
}

export const changeAdmin = ({
    commit
}, value) => {
    commit('SET_ITEMS', value);
}