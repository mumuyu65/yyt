/**
 * Created by yangyangyu on 2017/6/14.
 * 统一的api接口部分
 */
import querystring from 'querystring'
import axios from 'axios'
import config from './config'

class API {
    //登录
    login(param) {
        config.data = param;
        return axios.post('/cycj/login', {}, config);
    }

    //登录验证
    loginCheck(param) {
        config.data = param;
        return axios.post('/cycj/logcheck', {}, config);
    }

    //退出
    loginout(param) {
        config.data = param;
        return axios.post('/cycj/logout', {}, config);
    }

    //个人中心
    personSettings(param) {
        config.data = param;
        return axios.post('/cycj/userinfo/update', {}, config);
    }

    //在线用户信息查询
    userInfo(param) {
        config.data = param;
        return axios.post('', {}, config);
    }

    //用户管理
    addUser(param) {
        config.data = param;
        return axios.post('/cycj/admin/adduser', {}, config);
    }

    modifyUser(param) {
        config.data = param;
        return axios.post('/cycj/admin/modifyuser', {}, config);
    }

    queryUser(param) {
        config.data = param;
        return axios.post('/cycj/admin/userquery', {}, config);
    }

    delUser(param) {
            config.data = param;
            return axios.post('/cycj/admin/deluser', {}, config);
        }
        //修改密码
    modifypwd(param) {
        config.data = param;
        return axios.post('/cycj/pwd/modify', {}, config);
    }

    //修改昵称或简介
    modifypwd(param) {
        config.data = param;
        return axios.post('/cycj/userinfo/update', {}, config);
    }

    //修改头像
    modifyProfile(param) {
        config.data = param;
        return axios.post('/cycj/upload/head', {}, config);
    }

    //查询特定用户信息
    querySpecifyuser(param) {
        config.data = param;
        return axios.post('/cycj/admin/specifyuser', {}, config);
    }

    //资讯类型管理
    newsType(param) {
        config.data = param;
        return axios.post('/cycj/news/type/query', {}, config);
    }

    addnewsType(param) {
        config.data = param;
        return axios.post('/cycj/news/type/add', {}, config);
    }

    delnewsType(param) {
        config.data = param;
        return axios.post('/cycj/news/type/del', {}, config);
    }


    //资讯管理
    addNews(param) {
        config.data = param;
        return axios.post('/cycj/news/add', {}, config);
    }

    modifyNews(param) {
        config.data = param;
        return axios.post('/cycj/news/modify', {}, config);
    }

    queryNews(param) {
        config.data = param;
        return axios.post('/cycj/news/query', {}, config);
    }

    delNews(param) {
            config.data = param;
            return axios.post('/cycj/news/del', {}, config);
        }
        //品类管理---针对产品
    addCategory(param) {
        config.data = param;
        return axios.post('/cycj/category/add', {}, config);
    }

    modidyCategory(param) {
        config.data = param;
        return axios.post('/cycj/category/modify', {}, config);
    }

    queryCategory(param) {
        config.data = param;
        return axios.post('/cycj/category/query', {}, config);
    }

    delCategory(param) {
        config.data = param;
        return axios.post('/cycj/category/del', {}, config);
    }

    //操盘建议管理
    addHandleSuggestion(param) {
        config.data = param;
        return axios.post('/cycj/tidea/add', {}, config);
    }

    modifyHandleSuggestion(param) {
        config.data = param;
        return axios.post('/cycj/tidea/modify', {}, config);
    }

    delHandleSuggestion(param) {
        config.data = param;
        return axios.post('/cycj/tidea/del', {}, config);
    }

    queryHandleSuggestion(param) {
        config.data = param;
        return axios.post('/cycj/tidea/query', {}, config);
    }

    checkHandleSuggestion(param) {
        config.data = param;
        return axios.post('/cycj/tidea/check', {}, config);
    }

    //用户等级管理
    addUserLevel(param) {
        config.data = param;
        return axios.post('/cycj/level/add', {}, config);
    }

    modifyUserLevel(param) {
        config.data = param;
        return axios.post('/cycj/level/modify', {}, config);
    }

    queryUserLevel(param) {
        config.data = param;
        return axios.post('/cycj/level/query', {}, config);
    }

    delUserLevel(param) {
        config.data = param;
        return axios.post('/cycj/level/del', {}, config);
    }
}
export default API;