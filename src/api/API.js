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

    categoryUser(param) {
        config.data = param;
        return axios.post('/cycj/admin/userquery', {}, config);
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

    //微信二维码管理
    qrcodeQuery(param) {
        config.data = param;
        return axios.post('/cycj/wxcode/query', {}, config);
    }

    qrcodeUpdate(param) {
        config.data = param;
        return axios.post('/cycj/wxcode/update', {}, config);
    }

    //产品介绍管理
    productIntroQuery(param) {
        config.data = param;
        return axios.post('/cycj/product/query', {}, config);
    }

    productIntroUpdate(param) {
        config.data = param;
        return axios.post('/cycj/product/update', {}, config);
    }

    //战队介绍
    ClanQuery(param) {
        config.data = param;
        return axios.post('/cycj/clan/query', {}, config);
    }

    ClanUpdate(param) {
        config.data = param;
        return axios.post('/cycj/clan/update', {}, config);
    }

    //早晚评
    dayCommentQuery(param) {
        config.data = param;
        return axios.post('/cycj/comment/query', {}, config);
    }

    dayCommentAdd(param) {
        config.data = param;
        return axios.post('/cycj/comment/add', {}, config);
    }

    dayCommentModify(param) {
        config.data = param;
        return axios.post('/cycj/comment/modify', {}, config);
    }

    dayCommentDel(param) {
        config.data = param;
        return axios.post('/cycj/comment/del', {}, config);
    }

    dayCommentCheck(param) {
        config.data = param;
        return axios.post('/cycj/comment/check', {}, config);
    }

    dayCommentAll(param) {
        config.data = param;
        return axios.post('/cycj/comment/cliquery', {}, config);
    }

    //品类预测管理
    productsForecastQuery(param) {
        config.data = param;
        return axios.post('/cycj/forecast/query', {}, config);
    }

    productsForecastAdd(param) {
        config.data = param;
        return axios.post('/cycj/forecast/add', {}, config);
    }

    productsForecastModify(param) {
        config.data = param;
        return axios.post('/cycj/forecast/modify', {}, config);
    }

    productsForecastDel(param) {
        config.data = param;
        return axios.post('/cycj/forecast/del', {}, config);
    }

    productsForecastCheck(param) {
        config.data = param;
        return axios.post('/cycj/forecast/check', {}, config);
    }

    //课程表管理
    scheduleQuery(param) {
        config.data = param;
        return axios.post('/cycj/schedule/query', {}, config);
    }

    scheduleAdd(param) {
        config.data = param;
        return axios.post('/cycj/schedule/add', {}, config);
    }

    scheduleModify(param) {
        config.data = param;
        return axios.post('/cycj/schedule/modify', {}, config);
    }

    scheduleDel(param) {
        config.data = param;
        return axios.post('/cycj/schedule/del', {}, config);
    }

    //客服管理
    qqQuery(param) {
        config.data = param;
        return axios.post('/cycj/customer/query', {}, config);
    }

    qqAdd(param) {
        config.data = param;
        return axios.post('/cycj/customer/add', {}, config);
    }

    qqModify(param) {
        config.data = param;
        return axios.post('/cycj/customer/modify', {}, config);
    }

    qqDel(param) {
        config.data = param;
        return axios.post('/cycj/customer/del', {}, config);
    }

    //学习课件
    coursesQuery(param) {
        config.data = param;
        return axios.post('/cycj/courware/query', {}, config);
    }

    coursesAdd(param) {
        config.data = param;
        return axios.post('/cycj/courware/add', {}, config);
    }

    coursesModify(param) {
        config.data = param;
        return axios.post('/cycj/courware/modify', {}, config);
    }

    coursesDel(param) {
        config.data = param;
        return axios.post('/cycj/courware/del', {}, config);
    }

    coursesCheck(param) {
        config.data = param;
        return axios.post('/cycj/courware/check', {}, config);
    }

    //应用上传
    appAdd(param) {
        config.data = param;
        return axios.post('/cycj/app/add', {}, config);
    }

    appQuery(param) {
        config.data = param;
        return axios.post('/cycj/app/query', {}, config);
    }

    // 小游戏
    // 奖品管理
    getAward(param) {
        config.data = param
        return axios.post('/cycj/award/query', {}, config)
    }

    addAward(param) {
        config.data = param
        return axios.post('/cycj/award/add', {}, config)
    }

    delAward(param) {
        config.data = param
        return axios.post('/cycj/award/del', {}, config)
    }

    modifyAward(param) {
        config.data = param
        return axios.post('/cycj/award/modify', {}, config)
    }

    // 兑奖记录
    getDj(param) {
        config.data = param
        return axios.post('/cycj/dj/query', {}, config)
    }

    Confirm(param) {
        config.data = param
        return axios.post('/cycj/dj/check', {}, config)
    }
    
    // 赢豆记录
    getBeansChangeRecord(param) {
        config.data = param
        return axios.post('/cycj/bean/change', {}, config)
    }
}
export default API;
