/**
 * Created by yangyangyu on 2017/6/14.
 * 统一的api接口部分
 */
import querystring from 'querystring'
import axios from 'axios'
import config from './config'

class API {
    //删除时间段
    delTimeDistance(param) {
        config.data = param;
        return axios.post('/yyt/schedule/delperiod', {}, config);
    }

    //登录
    login(param) {
        config.data = param;
        return axios.post('/yyt/login', {}, config);
    }

    //登录验证
    loginCheck(param) {
        config.data = param;
        return axios.post('/yyt/check', {}, config);
    }

    //退出
    loginout(param) {
        config.data = param;
        return axios.post('/yyt/logout', {}, config);
    }

    //在线用户信息查询
    userInfo(param) {
        config.data = param;
        return axios.post('/yyt/admin/specifyuser', {}, config);
    }

    //用户管理
    addUser(param) {
        config.data = param;
        return axios.post('/yyt/admin/adduser', {}, config);
    }

    modifyUser(param) {
        config.data = param;
        return axios.post('/yyt/admin/modifyuser', {}, config);
    }

    queryUser(param) {
        config.data = param;
        return axios.post('/yyt/admin/userquery', {}, config);
    }

    delUser(param) {
        config.data = param;
        return axios.post('/yyt/admin/deluser', {}, config);
    }

    modifyLevel(param) {
        config.data = param;
        return axios.post('/yyt/admin/modifylevel', {}, config);
    }

    //分类查询用户
    categoryUser(param) {
        config.data = param;
        return axios.post('/yyt/admin/userquery', {}, config);
    }

    //修改密码
    modifypwd(param) {
        config.data = param;
        return axios.post('/yyt/pwd/modify', {}, config);
    }

    //修改昵称或简介
    modifypwd(param) {
        config.data = param;
        return axios.post('/yyt/userinfo/update', {}, config);
    }

    //修改头像
    modifyProfile(param) {
        config.data = param;
        return axios.post('/yyt/upload/head', {}, config);
    }

    //查询特定用户信息
    querySpecifyuser(param) {
        config.data = param;
        return axios.post('/yyt/admin/specifyuser', {}, config);
    }

    //查询权限列表
    authList(param) {
        config.data = param;
        return axios.post('/yyt/admin/authlist', {}, config);
    }

    //查询特定用户权限
    authQuery(param) {
        config.data = param;
        return axios.post('/yyt/admin/authquery', {}, config);
    }

    //用户授权
    authUser(param) {
        config.data = param;
        return axios.post('/yyt/admin/authuser', {}, config);
    }

    //资讯类型管理
    newsType(param) {
        config.data = param;
        return axios.post('/yyt/news/type/query', {}, config);
    }

    addnewsType(param) {
        config.data = param;
        return axios.post('/yyt/news/type/add', {}, config);
    }

    delnewsType(param) {
        config.data = param;
        return axios.post('/yyt/news/type/del', {}, config);
    }


    //资讯管理
    addNews(param) {
        config.data = param;
        return axios.post('/yyt/news/add', {}, config);
    }

    modifyNews(param) {
        config.data = param;
        return axios.post('/yyt/news/modify', {}, config);
    }

    queryNews(param) {
        config.data = param;
        return axios.post('/cycj/news/query', {}, config);
    }

    delNews(param) {
        config.data = param;
        return axios.post('/yyt/news/del', {}, config);
    }

    //品类管理---针对产品
    addCategory(param) {
        config.data = param;
        return axios.post('/yyt/category/add', {}, config);
    }

    modidyCategory(param) {
        config.data = param;
        return axios.post('/yyt/category/modify', {}, config);
    }

    queryCategory(param) {
        config.data = param;
        return axios.post('/yyt/category/query', {}, config);
    }

    delCategory(param) {
        config.data = param;
        return axios.post('/yyt/category/del', {}, config);
    }

    //操盘建议管理
    addHandleSuggestion(param) {
        config.data = param;
        return axios.post('/yyt/tidea/add', {}, config);
    }

    modifyHandleSuggestion(param) {
        config.data = param;
        return axios.post('/yyt/tidea/modify', {}, config);
    }

    delHandleSuggestion(param) {
        config.data = param;
        return axios.post('/yyt/tidea/del', {}, config);
    }

    queryHandleSuggestion(param) {
        config.data = param;
        return axios.post('/yyt/tidea/query', {}, config);
    }

    checkHandleSuggestion(param) {
        config.data = param;
        return axios.post('/yyt/tidea/check', {}, config);
    }

    //用户等级管理
    addUserLevel(param) {
        config.data = param;
        return axios.post('/yyt/level/add', {}, config);
    }

    modifyUserLevel(param) {
        config.data = param;
        return axios.post('/yyt/level/modify', {}, config);
    }

    queryUserLevel(param) {
        config.data = param;
        return axios.post('/yyt/level/query', {}, config);
    }

    delUserLevel(param) {
        config.data = param;
        return axios.post('/yyt/level/del', {}, config);
    }

    //微信二维码管理
    qrcodeQuery(param) {
        config.data = param;
        return axios.post('/yyt/wxcode/query', {}, config);
    }

    qrcodeUpdate(param) {
        config.data = param;
        return axios.post('/yyt/wxcode/update', {}, config);
    }

    //活動專區管理
    activityQuery(param) {
        config.data = param;
        return axios.post('/yyt/activity/query', {}, config);
    }

    activityUpdate(param) {
        config.data = param;
        return axios.post('/yyt/activity/update', {}, config);
    }

    //产品介绍管理
    productIntroQuery(param) {
        config.data = param;
        return axios.post('/yyt/product/query', {}, config);
    }

    productIntroUpdate(param) {
        config.data = param;
        return axios.post('/yyt/product/update', {}, config);
    }

    //战队介绍
    ClanQuery(param) {
        config.data = param;
        return axios.post('/yyt/clan/query', {}, config);
    }

    ClanUpdate(param) {
        config.data = param;
        return axios.post('/yyt/clan/update', {}, config);
    }

    //早晚评
    dayCommentQuery(param) {
        config.data = param;
        return axios.post('/yyt/comment/query', {}, config);
    }

    dayCommentAdd(param) {
        config.data = param;
        return axios.post('/yyt/comment/add', {}, config);
    }

    dayCommentModify(param) {
        config.data = param;
        return axios.post('/yyt/comment/modify', {}, config);
    }

    dayCommentDel(param) {
        config.data = param;
        return axios.post('/yyt/comment/del', {}, config);
    }

    dayCommentCheck(param) {
        config.data = param;
        return axios.post('/yyt/comment/check', {}, config);
    }

    dayCommentAll(param) {
        config.data = param;
        return axios.post('/yyt/comment/cliquery', {}, config);
    }

    //品类预测管理
    productsForecastQuery(param) {
        config.data = param;
        return axios.post('/yyt/forecast/query', {}, config);
    }

    productsForecastAdd(param) {
        config.data = param;
        return axios.post('/yyt/forecast/add', {}, config);
    }

    productsForecastModify(param) {
        config.data = param;
        return axios.post('/yyt/forecast/modify', {}, config);
    }

    productsForecastDel(param) {
        config.data = param;
        return axios.post('/yyt/forecast/del', {}, config);
    }

    productsForecastCheck(param) {
        config.data = param;
        return axios.post('/yyt/forecast/check', {}, config);
    }

    //课程表管理
    scheduleQuery(param) {
        config.data = param;
        return axios.post('/yyt/schedule/query', {}, config);
    }

    periodQuery(param) {
        config.data = param;
        return axios.post('/yyt/schedule/period', {}, config);
    }

    scheduleAdd(param) {
        config.data = param;
        return axios.post('/yyt/schedule/add', {}, config);
    }

    scheduleModify(param) {
        config.data = param;
        return axios.post('/yyt/schedule/modify', {}, config);
    }

    scheduleDel(param) {
        config.data = param;
        return axios.post('/yyt/schedule/del', {}, config);
    }

    //客服管理
    qqQuery(param) {
        config.data = param;
        return axios.post('/yyt/customer/query', {}, config);
    }

    qqAdd(param) {
        config.data = param;
        return axios.post('/yyt/customer/add', {}, config);
    }

    qqModify(param) {
        config.data = param;
        return axios.post('/yyt/customer/modify', {}, config);
    }

    qqDel(param) {
        config.data = param;
        return axios.post('/yyt/customer/del', {}, config);
    }

    //学习课件
    coursesQuery(param) {
        config.data = param;
        return axios.post('/yyt/courware/query', {}, config);
    }

    coursesAdd(param) {
        config.data = param;
        return axios.post('/cycj/courware/add', {}, config);
    }

    coursesModify(param) {
        config.data = param;
        return axios.post('/yyt/courware/modify', {}, config);
    }

    coursesDel(param) {
        config.data = param;
        return axios.post('/yyt/courware/del', {}, config);
    }

    coursesCheck(param) {
        config.data = param;
        return axios.post('/yyt/courware/check', {}, config);
    }

    //应用上传
    appAdd(param) {
        config.data = param;
        return axios.post('/yyt/app/add', {}, config);
    }

    appQuery(param) {
        config.data = param;
        return axios.post('/yyt/app/query', {}, config);
    }

    // 小游戏
    // 奖品管理
    getAward(param) {
        config.data = param
        return axios.post('/yyt/award/query', {}, config)
    }

    addAward(param) {
        config.data = param
        return axios.post('/yyt/award/add', {}, config)
    }

    delAward(param) {
        config.data = param
        return axios.post('/yyt/award/del', {}, config)
    }

    modifyAward(param) {
        config.data = param
        return axios.post('/yyt/award/modify', {}, config)
    }

    // 兑奖记录
    getDj(param) {
        config.data = param
        return axios.post('/yyt/dj/query', {}, config)
    }

    Confirm(param) {
        config.data = param
        return axios.post('/yyt/dj/check', {}, config)
    }

    // 赢豆记录
    getBeansChangeRecord(param) {
        config.data = param
        return axios.post('/yyt/bean/change', {}, config)
    }

    getRecordRough(param) {
        config.data = param
        return axios.post('/yyt/record/rough', {}, config)
    }

    // 签到管理
    getSigninRecord(param) {
        config.data = param
        return axios.post('/yyt/signin/query', {}, config)
    }

    // 直播管理
    getLive(param) {
        config.data = param
        return axios.post('/yyt/live/query', {}, config)
    }
    addLive(param) {
        config.data = param
        return axios.post('/yyt/live/add', {}, config)
    }
    delLive(param) {
        config.data = param
        return axios.post('/yyt/live/del', {}, config)
    }
    changeLive(param) {
        config.data = param
        return axios.post('/yyt/live/operate', {}, config)
    }
    modifyLive(param) {
        config.data = param
        return axios.post('/yyt/live/update', {}, config)
    }
    passMsg(param) {
        config.data = param
        return axios.post('/yyt/live/message/pass', {}, config)
    }
    refuseMsg(param) {
        config.data = param
        return axios.post('/yyt/live/message/refuse', {}, config)
    }

    // 聊天图片
    delImg(param) {
        config.data = param
        return axios.post('/yyt/live/image/delete', {}, config)
    }
    addImg(param) {
        config.data = param
        return axios.post('/yyt/live/image/save', {}, config)
    }
    getImg(param) {
        config.data = param
        return axios.post('/yyt/live/images', {}, config)
    }

    queryVisitor(param) {
        config.data = param
        return axios.post('/yyt/visitor/query', {}, config)
    }
}
export default API;