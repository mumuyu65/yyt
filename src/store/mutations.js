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

        SET_ROUTERS(state, routers) {
            //权限路由表
            state.addRouters = routers;

            //有权限和无权限的路由表
            state.routers = constantRouterMap.concat(routers);
        }

}