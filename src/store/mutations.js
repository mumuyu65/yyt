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

            for (let i = 0; i < value.length; i++) {
                constantRouterMap[1].children.push(value);
            }
            window.localStorage.setItem('routes', JSON.stringify(value));
            //console.log(value);
        },

        SET_ROLES(state, value) {
            //权限路由表
            state.roles = value;
        },
}