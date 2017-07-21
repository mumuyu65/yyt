/**
 * Created by yangyangyu on 17/6/26.
 */
import {
    constantRouterMap
} from '@/router';

export default {

    CHANGE_USER(state, value) {
            state.user = value
        },

        SET_ROUTERS(state, value) {
            //权限路由表
            state.addRouters = value;

        },

        SET_ROLES(state, value) {
            //权限路由表
            state.roles = value;
        },

        SET_ITEMS(state, value) {
            state.routers = constantRouterMap.concat(value);
        },

}