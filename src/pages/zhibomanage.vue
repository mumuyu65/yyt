<template>
   <div id="page-wrapper">
       <div id="page-inner" class="zhibo">
            <div v-show="!addlive">
                <div v-show="!modifylive">
                    <div v-show="!living">
                        <ul class="list-inline">
                            <li><h3>观看总人数：{{allOnline}}</h3></li>
                            <li class="pull-right" style="margin-top:15px;">
                                <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" @click="isShowAdd()">
                                    <i class="fa fa-plus fa-1x"></i>新增直播室
                                </button>
                            </li>
                        </ul>
                        <hr/>
                        <div class="zhibo-body text-center" border="1" width="100%">
                           <table class="table table-hover">
                                <tr>
                                    <th>房间号</th>
                                    <th>直播名称</th>
                                    <th>直播老师</th>
                                    <th>直播状态</th>
                                    <th>直播地址</th>
                                    <th>直播简介</th>
                                    <th>观看人数</th>
                                    <th>聊天状态</th>
                                    <th>操作建议</th>
                                    <th>操作</th>
                                </tr>
                                <tr v-for="item in liveList">
                                    <td>{{item.roomno}}</td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.state | stateFilter}}</td>
                                    <td>{{item.liveurl}}</td>
                                    <td>{{item.info}}</td>
                                    <td>{{item.user_count.length}}</td>
                                    <td><div class="btn btn-warning" @click="changeState(item.state,item.id)">{{item.state | statesFilter}}</div></td>
                                    <td><router-link :to="{ path: '/handlesuggestion' }" class="btn btn-info">查看</router-link></td>
                                    <td>
                                        <div class="btn btn-success" @click="showLiving(item)">进入</div>
                                        <div class="btn btn-danger" @click="delLive(item.id)">删除</div>
                                        <div class="btn btn-primary" @click="ShowModmodify(item)">修改</div>
                                    </td>
                                </tr>
                           </table>
                       </div>
                    </div>
                </div>
            </div>
            <!-- 添加 -->
            <div class="addlive" v-show="addlive">
                <div class="form-group">
                    <label><span class="required">*</span>标题</label>
                    <input type="text" class="form-control" placeholder="请输入标题" v-model="addTitle">
                </div>
                <div class="form-group">
                    <label><span class="required">*</span>直播老师</label>
                    <select v-model="addTeacher"  class="form-control">
                        <option v-for="option in teacherList" v-bind:value="option.nick">{{ option.nick }}</option>
                    </select>
                </div>
                <!--
                <div class="form-group">
                    <label><span class="required">*</span>直播分类</label>
                    <select v-model="addSelected"  class="form-control">
                        <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
                    </select>
                </div>
                -->
                <div class="form-group">
                    <label><span class="required">*</span>拉流地址</label>
                    <input type="text" class="form-control" placeholder="请输入拉流地址" v-model="addLiveurl">
                </div>
                <div class="form-group">
                    <label><span class="required">*</span>简介</label>
                    <textarea class="form-control" placeholder="请输入简介" v-model="addInfo" rows="10"></textarea>
                </div>
                <div class="btn btn-primary" @click="addLive()">确认</div>
                <div class="btn btn-default" @click="isShowAdd()">取消</div>
            </div>


            <!-- 修改 -->
            <div class="modifylive" v-show="modifylive">
                <div class="form-group">
                    <label><span class="required">*</span>标题</label>
                    <input type="text" class="form-control" placeholder="请输入标题" v-model="modifyTitle">
                </div>
                <div class="form-group">
                    <label><span class="required">*</span>直播老师</label>
                    <select v-model="modifyTeacher"  class="form-control">
                        <option v-for="option in teacherList" v-bind:value="option.nick">{{ option.nick }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label><span class="required">*</span>直播分类</label>
                    <select v-model="modifySelected"  class="form-control">
                        <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label><span class="required">*</span>拉流地址</label>
                    <input type="text" class="form-control" placeholder="请输入拉流地址" v-model="modifyLiveurl">
                </div>
                <div class="form-group">
                    <label><span class="required">*</span>简介</label>
                    <textarea class="form-control" placeholder="请输入简介" v-model="modifyInfo" rows="10"></textarea>
                </div>
                <div class="btn btn-primary" @click="modifyLive()">确认</div>
                <div class="btn btn-default" @click="isShowModify()">取消</div>
            </div>

            <!-- 进入直播间 -->
            <div class="living" v-show="living">
                <button class="btn btn-default" @click="backToLiving()">返回</button>
                <div class="zhibo-box text-center" style="width:100%; height:454px;">
                    <div id="player" style="width:100%; height:454px;" v-if="!clanplayer" ></div>
                    <div id="clanPlayer" style="width:100%; height:454px;" v-if="clanplayer"></div>
                </div>
                <div class="comment-box" style="background-color:#f5f5f5; margin-top:50px;">
                    聊天内容审核：
                    <div class="comment" v-for="item in comment_list" >
                        <div class="head-file">
                            <img :src="item.msginfo.userlevel | imgurl">
                        </div>
                        <div class="info">
                            <div class="name">
                                {{item.msginfo.username}}
                                <span>{{item.msginfo.time | unixTodate}}</span>
                            </div>
                            <div class="description" v-html="item.msginfo.message"></div>
                        </div>
                        <div class="btn btn-primary pull-right" @click="refuse(item.msgid)">拒绝</div>
                        <div class="btn btn-danger pull-right" @click="pass(item.msgid)">通过</div>
                    </div>
                </div>
            </div>
       </div>
   </div>
</template>

<script>
import * as Player from '@/js/aodianyun.js'

import API from '@/api/API'

const api = new API()

import axios from 'axios'

import env from '@/config/env'

import Jsonp from 'jsonp'

export default {
name: 'ZhiboManage',
data() {
    return {
        user: {},
        liveList:[],
        addlive:false,
        modifylive:false,
        living:false,
        options:[{ text: '大厅直播', value: '0' },
            { text: '战队直播', value: '1' }],
        teacherList:[],
        addTeacher:'',
        addSelected:0,
        addTitle:'',
        addInfo:'',
        addLiveurl:'',
        allOnline:0,
        modifyTeacher:'',
        modifySelected:'',
        modifyTitle:'',
        modifyInfo:'',
        modifyLiveurl:'',
        modifyId:'',
        modifyRoomid:'',
        comment_list:[],  //审核聊天
        roomId:'',
        chatFaces:[],  //表情图片
        ws:'',        //长链接
        sid:'',     //用户的sessionId
        clanplayer:false,  //直播间切换
    }
},
filters:{
    typeFilter:function(type){
        switch(type){
            case 0: return '大厅直播'; break;
            case 1: return '战队直播'; break;
        }
    },
    stateFilter:function(state){
        switch(state){
            case 1: return '未直播'; break;
            case 2: return '直播中'; break;
        }
    },
    statesFilter:function(state){
        switch(state){
            case 1: return '开启'; break;
            case 2: return '停止'; break;
        }
    },
    unixTodate(tm) {
        let time = new Date(tm*1000);
        let y = time.getFullYear();
        let m = (time.getMonth()+1)<10?('0'+(time.getMonth()+1)):(time.getMonth()+1);
        let d = (time.getDate())<10?('0'+time.getDate()):time.getDate();
        let h = (time.getHours())<10?('0'+time.getHours()):time.getHours();
        let min = (time.getMinutes())<10?('0'+time.getMinutes()):time.getMinutes();
        return y+'-'+m+'-'+d+' '+h+':'+m;
    },
    imgurl(userlevel){
        var url = 'http://47.52.19.212:9000/yyt/level/query';
        var img_url;
        $.ajaxSetup({
            async : false
        });
        $.post(url,function(result){
            for(var i = 0 ;i<result.Data.length;i++){
                if(result.Data[i].lid == userlevel){
                    img_url = result.Data[i].role_css;
                }
            }
        })
        return img_url
    },
},
mounted(){
    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.sid = this.user.SessionId;

    this.initData();  //查询直播老师

    this.queryLive();  //查询直播间

    //查询表情
    Jsonp('https://api.weibo.com/2/emotions.json?source=1362404091',function (err, res) {
       that.chatFaces=res.data;
    });

    //this.checkLogin();
},
methods: {
    checkLogin(){
      let obj={
        sid:this.sid
      };

      axios.get(env.baseUrl+'/yyt/check', {params:obj})
        .then(function (res) {
          if(res.data.Code ==6){
            alert(res.data.Msg);
            window.location.replace("/");
          }
        })
      .catch(function (err) {
        console.log(err);
      });
    },

    initData(){
        let _this = this;
        let params = {
            sid:this.sid,
            flag:1,
            begidx:0,
            counts:100
        }
        api.queryUser(params).then(function(res){
            if(res.data.Code ==3){
                if(res.data.Data.Detail.length >0){
                    _this.teacherList = res.data.Data.Detail;
                }else{
                   alert("尚无参与直播的老师列表，请前往账号管理添加！");
                }
            }else{
                // alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //查询直播间列表
    queryLive(){
        let _this = this;
        let param = {
            begidx:0,
            counts:100
        }
        api.getLive(param).then(function(res){
            console.log(res.data.Data);
            if(res.data.Code ==3){
                if(res.data.Data.length == 0){
                    console.log('没有直播房间!');
                }else{
                    _this.liveList = res.data.Data;

                    let totalPeople = _this.liveList[0].user_count;

                    for(let j=0; j<totalPeople.length;j++){
                        _this.allOnline += totalPeople[j].count;
                    }
                }
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    isShowAdd(){
        this.addlive = !this.addlive
    },

    isShowModify(){
        this.modifylive = !this.modifylive
    },

    //进入直播间
    showLiving(item){
        if(item.state == 1){
            alert('该直播尚未开启！请开启后重试');
            return
        }else{
            this.living = !this.living;
            let roomid = item.roomno;
            this.roomId = item.roomno;
            this.ConnSvr();  //长连接开启
            if(item.type ==1){
                this.Player(item.liveurl.trim(),'clanPlayer');
                this.clanplayer = !this.clanplayer;
            }else{
                this.Player(item.liveurl.trim(),'player');
            }
        }
    },

    Player(liveurl,containerId){
        //大厅直播间
        let objectPlayer = new Player.aodianPlayer({
            container: containerId, //播放器容器ID，必要参数
            rtmpUrl:liveurl, //控制台开通的APP rtmp地址，必要参数
            width: '858', //播放器宽度，可用数字、百分比等
            height: '454', //播放器高度，可用数字、百分比等
            autostart: true, //是否自动播放，默认为false
            bufferlength: '3', //视频缓冲时间，默认为3秒。hls不支持！手机端不支持
            maxbufferlength: '2', //最大视频缓冲时间，默认为2秒。hls不支持！手机端不支持
            stretching: '1', //设置全屏模式,1代表按比例撑满至全屏,2代表铺满全屏,3代表视频原始大小,默认值为1。hls初始设置不支持，手机端不支持
            controlbardisplay: 'enable', //是否显示控制栏，值为：disable、enable默认为disable。
            isfullscreen: true, //是否双击全屏，默认为true
        });
    },

    //返回直播间
    backToLiving(){
        this.living = !this.living;
    },

    //长连接
    ConnSvr(){
        let that = this;
        let ws = new WebSocket("ws://61.147.124.130:10015/sub");
        this.ws = ws;
        ws.onopen = function(){
            // 发送认证消息
            var body='{"Uid":"'+that.user.UserId+'","Sessionid":"'+that.sid+'","Platform":"3"}';
            var pklen=body.length+16;
            ws.send(JSON.stringify({
                'pklen':pklen,
                'klen':16,
                'ver': 1,
                'op': 7,
                'id': 1,
                'body': JSON.parse(body)
            }));
        };
        ws.onmessage = function(evt){
            var receives = JSON.parse(evt.data);   //从字符窜中解析出json对象

            let data = receives[0];

            switch(data.op){
                case 3:
                        console.log("收到心跳回复");
                        break;
                case 8:
                        console.log('认证回复');
                        var rcvbody=data.body;
                        // 启动计时器发送心跳包
                        var heartbeatInterval = setInterval(that.heartbeat, 20000);
                        that.EnterRoom();  //进入房间
                        break;
                case 23:
                        //心跳包回复
                        console.log("发送成功");
                        break;
                case 28:
                        var rcvbody=JSON.parse(JSON.stringify(data.body));
                        if(rcvbody.code == 100){
                            alert('进入直播间成功!');
                        }else{
                            alert("进入直播间失败");
                            that.showLiving = !that.showLiving;
                        };
                        break;
                case 46:
                        var data_46 = JSON.parse(JSON.stringify(data.body));
                        let templeData = data_46;
                        templeData.msginfo.message = that.analysis(templeData.msginfo.message);
                        that.comment_list.unshift(templeData);
                        break;
            }
        };
        ws.onclose = this.onclose;
        ws.onerror = this.onerror;
    },

    //分析输入的聊天内容
     /*进行解析*/
    analysis (value) {
        let arr = value.match(/\[.{1,5}\]/g);

        let imgArr = value.indexOf("http");

        if (arr && imgArr == -1) {
            for (let i = 0; i < arr.length; i++) {
                for (let j in this.chatFaces) {
                    if (arr[i] == this.chatFaces[j].phrase) {
                        var ex = '<img src="' + this.chatFaces[j].url + '"/>';
                        value = value.replace(arr[i], ex);
                    }

                }
            }
        }
        else if(imgArr !== -1 ){
            value = '<img src="' + value + '"/>';
        }
        return value;
    },

    //连接断开
    onclose(){
        //2秒后启动重连
        setTimeout("this.ConnSvr",2000);
    },

    //连接出错
    onerror(evt){
       console.log("WebSocket Error." + evt.data);
    },

    //进入房间
    EnterRoom(){
        // 进入房间
        var body = this.roomId;
        var pklen = body.length + 16;
        this.ws.send(JSON.stringify({
            'pklen':pklen,
            'klen':16,
            'ver': 1,
            'op': 27,
            'id': 1,
            'body': Number(body)
        }));
    },

    //心跳
    heartbeat() {
        if (this.ws) {
             this.ws.send(JSON.stringify({
                'pklen':16,
                'klen':16,
                'ver': 1,
                'op': 2,
                'id': 1,
                'body': {}
            }));
        }
    },

    //通过
    pass(msgId){
        let _this = this;
        let params = {
            sid:this.sid,
            rmid:this.roomId,
            msgid:msgId
        };

        api.passMsg(params).then(function(res){
            alert(res.data.Msg);
            for(let i = 0;i<_this.comment_list.length;i++){
                if(_this.comment_list[i].msgid == msgId){
                    _this.comment_list.splice(i,1);
                }
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //拒绝
    refuse(msgId){
        let _this = this;
        let params = {
            sid:this.sid,
            rmid:this.roomId,
            msgid:msgId
        }
        api.refuseMsg(params).then(function(res){
            alert(res.data.Msg);
            for(let i = 0;i<_this.comment_list.length;i++){
                if(_this.comment_list[i].msgid == msgId){
                    _this.comment_list.splice(i,1);
                }
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    // 新增直播间
    addLive(){
        let _this = this;

        if(this.addTitle && this.addTeacher && this.addInfo && this.addLiveurl){
            let params = {
                sid:this.sid,
                title:this.addTitle,
                name:this.addTeacher,
                type:'大厅直播',
                info:this.addInfo,
                liveurl:this.addLiveurl
            }
            api.addLive(params).then(function(res){
                alert(res.data.Msg);
                if(res.data.Code == 3){
                    _this.isShowAdd();
                    _this.queryLive();
                };
            }).catch(function(err){
                console.log(err);
            });
        }else{
            alert("存在空值!");
        }
    },

    // 管理直播间状态
    changeState(state,id){
        if(parseInt(state) == 1){
            var state = 2;
        }else{
            var state = 1;
        }
        let _this = this;
        let params = {
            sid:this.sid,
            id:id,
            state:state
        }

        api.changeLive(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code == 3){
                _this.queryLive();
            };
        }).catch(function(err){
            console.log(err);
        });
    },

    // 删除直播间
    delLive(id){
        let _this = this;
        let params = {
            sid:this.sid,
            id:id
        }
        api.delLive(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code == 3){
                _this.queryLive();
            };
        }).catch(function(err){
            console.log(err);
        });
    },

    // 修改直播间
    ShowModmodify(item){
        this.isShowModify();
        if(item.type == 0){
            var livetype = '大厅直播';
        }else{
            var livetype = '战队直播';
        }
        this.modifyTeacher = item.name;
        this.modifySelected = item.type;
        this.modifyTitle = item.title;
        this.modifyInfo = item.info;
        this.modifyLiveurl = item.liveurl;
        this.modifyId = item.id;
        this.modifyRoomid = item.roomno;
    },

    modifyLive(){
        let _this = this;
        let params = {
            sid:this.sid,
            title:this.modifyTitle,
            name:this.modifyTeacher,
            type:this.modifySelected,
            info:this.modifyInfo,
            liveurl:this.modifyLiveurl,
            id:this.modifyId,
            roomno:this.modifyRoomid
        }
        console.log(params);
        api.modifyLive(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code == 3){
                _this.isShowModify();
                _this.queryLive();
            };
        }).catch(function(err){
            console.log(err);
        });
    },
 }
}
</script>

<style scoped lang="scss">
    .zhibo {
        .zhibo-head {
            width: 100%;
            padding: 15px;
            border-bottom: 1px solid #c0c0c0;
            &:after {
                display: table;
                content: ' ';
                clear: both;
            }
            .zhibo-watching-people {
                font-size: 1.6rem;
                span {
                    font-size: 2.4rem;
                    color: #e80000;
                }
            }
        }
        .addlive,.modifylive,.zhibo-box{
            padding:3rem;
        }
        .comment-box {
            padding: 3rem;
            .comment {
                padding: 10px;
                margin: 1rem 0;
                border-radius: .7rem;
                background-color: #F3F3F3;
                &:after {
                    display: table;
                    content: ' ';
                    clear: both;
                }
                .head-file {
                    width: 5rem;
                    height: 5rem;
                    border-radius: 50%;
                    float: left;
                    img {
                        width: 100%;
                        border-radius: 50%;
                    }
                }
                .info {
                    float: left;
                    margin-left: 2rem;
                    .name {
                        font-size: 2.2rem;
                        font-weight: bold;
                        span {
                            font-size: 1.4rem;
                            font-weight: normal;
                        }
                    }
                }
            }
        }
    }

    .required{
        color:#e60000;
        margin-right:5px;
    }
</style>
