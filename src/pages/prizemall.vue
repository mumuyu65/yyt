<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div class="prizemall-box">
                <div v-if="!is_show_add">
                    <div v-if="!is_show_modify">
                     <ul class="list-inline">
                        <li><h3>奖品商城</h3></li>
                        <li class="pull-right" style="margin-top:15px;">
                        <button @click="isShowAdd()"
                            style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                            <i class="fa fa-plus fa-1x"></i>新增奖品
                        </button>
                    </li>
                    </ul>
                    <hr/>
                    <div>
                        <div class="col-md-3" v-for="item in prizes">
                            <div class="prize-item">
                                <div class="p-img">
                                    <img class="thumbnail-image" src="../assets/prizebg.png" :style="'background-image: url('+ item.imgurl + ')'" alt="奖品图片">
                                </div>
                                <div class="p-info">
                                    <span class="pull-left">{{item.name}}</span>
                                    <span class="pull-right beans">¥ {{item.beans}}</span>
                                </div>
                                <div class="p-intro">{{item.intro}}</div>
                                <div class="btn-group">
                                    <div class="btn btn-primary" @click="showModify(item)">修改</div>
                                    <div class="btn btn-danger" @click="delPrize(item.id)">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <!-- 新增 -->
                <div class="row" v-if="is_show_add">
                    <div class="form-group">
                        <label>奖品名称</label>
                        <input type="text" class="form-control" placeholder="请输入奖品名称" v-model="add_prizes.name">
                    </div>
                    <div class="form-group">
                        <label>奖品价格</label>
                        <input type="text" class="form-control" placeholder="请输入奖品价格" v-model="add_prizes.beans">
                    </div>
                    <div class="form-group">
                        <label>奖品简介</label>
                        <input type="text" class="form-control" placeholder="请输入奖品简介" v-model="add_prizes.intro">
                    </div>
                    <div class="form-group">
                        <label>奖品图片</label>
                        <input type="file" class="form-control" ref="upload" @change="onFileChange" style="width: 100%;">
                    </div>
                    <div class="col-md-12" style="margin-bottom: 1rem; text-align: center">
                        <img :src="add_prizes.img" alt="" class="thumbnail-img">
                    </div>
                    <div class="btn btn-primary" @click="addPrize">确认</div>
                    <div class="btn btn-default pull-right" @click="isShowAdd">取消</div>
                </div>
                <!-- 修改 -->
                <div class="col-md-6 col-md-offset-3" v-if="is_show_modify">
                    <div class="form-group">
                        <label>奖品名称</label>
                        <input type="text" class="form-control" placeholder="请输入奖品名称" v-model="modify_prizes.name">
                    </div>
                    <div class="form-group">
                        <label>奖品价格</label>
                        <input type="text" class="form-control" placeholder="请输入奖品价格" v-model="modify_prizes.beans">
                    </div>
                    <div class="form-group">
                        <label>奖品简介</label>
                        <input type="text" class="form-control" placeholder="请输入奖品简介" v-model="modify_prizes.intro">
                    </div>
                    <div class="col-md-12" style="margin-bottom: 1rem; text-align: center">
                        <img :src="modify_prizes.img" alt="" class="thumbnail-img">
                    </div>
                    <div class="form-group">
                        <label>奖品图片</label>
                        <input type="file" class="form-control" ref="update" @change="onFileChange" style="width: 100%;">
                    </div>
                    <div class="btn btn-primary" @click="modifyPrize">确认</div>
                    <div class="btn btn-default" @click="isShowModify">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
// 实例化api
const api = new API();

import axios from 'axios'

import env from '@/config/env'

export default {
    name: 'prizemall',
    data() {
        return {
            Sid: '',
            is_show_add: false,
            is_show_modify: false,
            add_prizes: {
                name: '',
                intro: '',
                beans: '',
                img: ''
            },
            modify_prizes: {
                id: '',
                name: '',
                intro: '',
                beans: '',
                img: ''
            },
            prizes: []
        }
    },
    mounted() {
        this.Sid = JSON.parse(window.localStorage.getItem('user')).SessionId;
        this.getPrizes();
        this.checkLogin();
    },
    methods: {
        checkLogin(){
          let obj={
            sid:this.Sid
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
        isShowAdd() {
            this.is_show_add = !this.is_show_add
        },
        isShowModify() {
            this.is_show_modify = !this.is_show_modify
        },
        clearData() {
            this.add_prizes.name = ''
            this.add_prizes.intro = ''
            this.add_prizes.beans = ''
            this.add_prizes.img = ''
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length)
                return;
            this.createImage(files[0])
        },
        createImage(file) {
            let reader = new FileReader()
            let _this = this

            reader.onload = (e) => {
                _this.add_prizes.img = e.target.result
            }
            reader.readAsDataURL(file)
        },
        getPrizes() {
            let _this = this
            api.getAward().then(function(res) {
                if (res.data.Code != 3) {
                    alert(res.data.Msg)
                } else {
                    _this.prizes = res.data.Data
                }
            }).catch(function(err) {
                console.log(err)
                location.reload()
            })
        },
        addPrize() {
            let _this = this
            let input = this.$refs.upload
            let param = new FormData()
            param.append('sid', this.Sid)
            param.append('name', this.add_prizes.name)
            param.append('intro', this.add_prizes.intro)
            param.append('beans', this.add_prizes.beans)
            param.append('img', input.files[0])

            axios.post(env.baseUrl+'/cycj/award/add', param, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res) {
                if (res.data.Code != 3) {
                    alert(res.data.Msg)
                    if (res.data.Code == 6) {
                        _this.$router.push('/')
                    }
                } else {
                    alert('添加成功!')
                    _this.isShowAdd()
                    _this.getPrizes()
                    _this.clearData()
                }
            }).catch(function(err) {
                console.log(err)
            })
        },
        showModify(obj) {
            this.isShowModify()
            this.modify_prizes.id = obj.id
            this.modify_prizes.name = obj.name
            this.modify_prizes.intro = obj.intro
            this.modify_prizes.beans = obj.beans
            this.modify_prizes.img = obj.imgurl
        },
        modifyPrize() {
            let _this = this
            let input = this.$refs.update
            let param = new FormData()
            param.append('sid', this.Sid)
            param.append('id', this.modify_prizes.id)
            param.append('name', this.modify_prizes.name)
            param.append('intro', this.modify_prizes.intro)
            param.append('beans', this.modify_prizes.beans)
            param.append('img', input.files[0])

            axios.post(env.baseUrl + '/cycj/award/modify', param, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res) {
                if (res.data.Code != 3) {
                    if (res.data.Code == 6) {
                        alert('登录状态已过期, 请重新登录!')
                        _this.$router.push('/')
                    }
                    alert(res.data.Msg)
                } else {
                    alert('修改成功!')
                    _this.isShowModify()
                    _this.getPrizes()
                }
            })
        },
        delPrize(id) {
            let _this = this
            if (confirm('确认删除吗?')) {
                let param = {
                    sid: this.Sid,
                    id: id
                }
                api.delAward(param).then(function(res) {
                    if (res.data.Code != 3) {
                        if (res.data.Code == 6) {
                            alert('登录状态已过期, 请重新登录!')
                            _this.$router.push('/')
                        }
                        alert(res.data.Msg)
                    } else {
                        alert('删除成功!')
                        _this.getPrizes()
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .prizemall-box {
        padding: 1rem 3rem;
        .prize-item {
            border: 1px solid #c0c0c0;
            border-radius: .7rem;
            margin-bottom: 3rem;
            .p-img {
                padding: 1rem;
                text-align: center;
                border-bottom: 1px solid #c0c0c0;
                .thumbnail-image {
                    max-width: 100%;
                    height: auto;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
            }
            .p-info {
                padding: 1rem;
                &:after {
                    display: table;
                    content: ' ';
                    clear: both;
                }
                .beans {
                    color: #e80000;
                }
            }
            .p-intro, .btn-group {
                padding: 1rem;
                padding-top: 0;
                color: #ccc;
            }
        }
    }

    #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }
</style>
