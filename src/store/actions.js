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


function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
    if (!permissionRoles) return true; //免权限，直接通过
    return roles.some(role => permissionRoles.indexOf(role) >= 0) //监测roles数组中是否存在某些权限
}


function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        console.log(route, roles);
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

export const GenerateRoutes = ({
    commit
}, value) => {
    const {
        roles
    } = value;
    let accessedRouters;
    if (roles.indexOf('admin') >= 0) {
        accessedRouters = asyncRouterMap;
    } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
    }
    console.log(accessedRouters);
    commit('SET_ROUTERS', accessedRouters);
}