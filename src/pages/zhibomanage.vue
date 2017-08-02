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
                                    <th>发布房间</th>
                                    <th>直播老师</th>
                                    <th>直播状态</th>
                                    <th>观看人数</th>
                                    <th>更改状态</th>
                                    <th>操作建议</th>
                                    <th>操作</th>
                                </tr>
                                <tr v-for="item in liveList">
                                    <td>{{item.type | typeFilter}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.state | stateFilter}}</td>
                                    <td>{{item.online}}</td>
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
                    <label>标题</label>
                    <input type="text" class="form-control" placeholder="请输入标题" v-model="addTitle">
                </div>
                <div class="form-group">
                    <label>直播老师</label>
                    <select v-model="addTeacher"  class="form-control">
                        <option v-for="option in teacherList" v-bind:value="option.nick">{{ option.nick }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>直播分类</label>
                    <select v-model="addSelected"  class="form-control">
                        <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>拉流地址</label>
                    <input type="text" class="form-control" placeholder="请输入拉流地址" v-model="addLiveurl">
                </div>
                <div class="form-group">
                    <label>简介</label>
                    <textarea class="form-control" placeholder="请输入简介" v-model="addInfo" rows="10"></textarea>
                </div>
                <div class="btn btn-primary" @click="addLive()">确认</div>
                <div class="btn btn-default" @click="isShowAdd()">取消</div>
            </div>


            <!-- 修改 -->
            <div class="modifylive" v-show="modifylive">
                <div class="form-group">
                    <label>标题</label>
                    <input type="text" class="form-control" placeholder="请输入标题" v-model="modifyTitle">
                </div>
                <div class="form-group">
                    <label>直播老师</label>
                    <select v-model="modifyTeacher"  class="form-control">
                        <option v-for="option in teacherList" v-bind:value="option.nick">{{ option.nick }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>直播分类</label>
                    <select v-model="modifySelected"  class="form-control">
                        <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>拉流地址</label>
                    <input type="text" class="form-control" placeholder="请输入拉流地址" v-model="modifyLiveurl">
                </div>
                <div class="form-group">
                    <label>简介</label>
                    <textarea class="form-control" placeholder="请输入简介" v-model="modifyInfo" rows="10"></textarea>
                </div>
                <div class="btn btn-primary" @click="modifyLive()">确认</div>
                <div class="btn btn-default" @click="isShowModify()">取消</div>
            </div>

            <!-- 进入直播间 -->
            <div class="living" v-show="living">
                <div class="zhibo-box">
                    
                </div>
                <div class="comment-box">
                    <div class="comment" v-for="item in comment_list" >
                        <div class="head-file">
                            <img :src="item.msginfo.userlevel | imgurl">
                        </div>
                        <div class="info">
                            <div class="name">
                                {{item.msginfo.username}}
                                <span>{{item.msginfo.time | unixTodate}}</span>
                            </div>
                            <div class="description">{{item.msginfo.message}}</div>
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
        allOnline:'',
        modifyTeacher:'',
        modifySelected:'',
        modifyTitle:'',
        modifyInfo:'',
        modifyLiveurl:'',
        modifyId:'',
        modifyRoomid:'',
        comment_list:[],
        roomId:''
    }
},
filters:{
    typeFilter:function(type){
        switch(type){
            case '0': return '大厅直播'; break;
            case '1': return '战队直播'; break;
        }
    },
    stateFilter:function(state){
        switch(state){
            case '1': return '未直播'; break;
            case '2': return '直播中'; break;
        }
    },
    statesFilter:function(state){
        switch(state){
            case '1': return '开启'; break;
            case '2': return '停止'; break;
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
        var url = 'http://yingdedao.com:10021/cycj/level/query';
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
    }
},
mounted(){
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.sid = this.user.SessionId;
    this.initData();
},
methods: {
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
                _this.teacherList = res.data.Data.Detail;
            }else{
                // alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
        this.queryLive();
    },
    queryLive(){
        let _this = this;
        let param = {
            begidx:0,
            counts:100
        }
        api.getLive(param).then(function(res){
            if(res.data.Code ==3){
                if(res.data.Data == 'no data'){
                    alert('没有直播房间')
                }
                _this.liveList = res.data.Data.Detail;
                _this.allOnline = res.data.Data.AllOnline;
                console.log(res.data.Data.Detail)
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

    showLiving(item){
        if(item.state == 1){
            alert('该直播尚未开启！请开启后重试')
            return
        }
        this.living = !this.living;
        let roomid = item.roomno;
        this.roomId = item.roomno;
        let ws = null; 
        let _this = this;
        function ConnSvr(){
            let that = _this;
            ws = new WebSocket("ws://61.147.124.143:10015/sub");
            ws.onopen = function(){
                // 发送认证消息       
                var body='{"Uid":"'+_this.user.UserId+'","Sessionid":"'+_this.sid+'","Platform":"3"}';
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
                let _that = that
                var receives = JSON.parse(evt.data);   //从字符窜中解析出json对象

                for (var i = 0; i < receives.length; i++) {
                    var data = receives[i];
                    // console.log(JSON.stringify(data)); //从对象中解析出字符窜
                    if (data.op == 8) { //认证回复
                        var rcvbody=data.body;
                        console.log('认证回复')
                        // 启动计时器发送心跳包
                        heartbeat();
                        var heartbeatInterval = setInterval(heartbeat, 20000);
                    }

                    else if (data.op == 3) { //心跳包回复
                        console.log("收到心跳回复")
                    }
                    else if (data.op == 23) { //心跳包回复
                        // console.log("发送成功")
                    }
                    else if (data.op == 28) { //
                        var rcvbody=data.body;
                        var data = JSON.parse(JSON.stringify(rcvbody));
                        // console.log('进入房间成功')
                        alert(data.msg)
                    }
                    else if(data.op == 46){
                        // var rcvbody=data.body;
                        var data = JSON.parse(JSON.stringify(data.body));
                        _that.comment_list.unshift(data);
                        console.log(data)
                    }else{
                        var data = JSON.parse(JSON.stringify(data));
                        console.log(data)
                    }
                }
            };
            ws.onclose = onclose;
            ws.onerror = onerror;
        }
        ConnSvr();
        function onclose(){      
            // console.log("WebSocket Closed.");

            //2秒后启动重连
            setTimeout("ConnSvr()",2000); 
        }

        function onerror(evt){      
            // console.log("WebSocket Error." + evt.data);
        }

        // /im/liveroom/in http协议请求进入房间
        function EnterRoom(){
            // 进入房间
            var body = roomid;
            var pklen = body.length + 16;
            ws.send(JSON.stringify({
                'pklen':pklen,
                'klen':16,
                'ver': 1,
                'op': 27,
                'id': 1,
                'body': Number(body)
            }));
        }
        setTimeout(EnterRoom,500)
        function heartbeat() {
            if (ws) {
                 ws.send(JSON.stringify({
                    'pklen':16,
                    'klen':16,
                    'ver': 1,
                    'op': 2,
                    'id': 1,
                    'body': {}
                }));
            } 
        }

    },

    pass(msgId){
        let _this = this;
        let params = {
            sid:this.sid,
            rmid:this.roomId,
            msgid:msgId
        }
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
        let params = {
            sid:this.sid,
            title:this.addTitle,
            name:this.addTeacher,
            type:this.addSelected,
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
    },
    // 管理直播间
    changeState(state,id){
        if(Number(state) == 1){
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
        console.log(params)
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
        api.modifyLive(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code == 3){
                _this.isShowModify();
                _this.queryLive();
            };
        }).catch(function(err){
            console.log(err);
        });
    }
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
        .zhibo-body {
            padding: 3rem;
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
</style>
