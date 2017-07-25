import Vue from 'vue'

import Vuex from 'vuex'

import * as actions from './actions'

import mutations from './mutations'

import * as getters from './getters'

import {
    constantRouterMap
} from '@/router';

Vue.use(Vuex)

const state = {
    user: '',
    routers: constantRouterMap,
    addRouters: [],
    roles: [],
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})