<template>
    <div id="page-wrapper">
        <div id="page-inner">
            <div class="category-box">
                <div v-if="!is_show_add">
                    <div class="category-list" v-if="!is_show_modify">
                        <div class="btn btn-primary" @click="isShowAdd">新增品类</div>
                        <table class="table table-hover">
                            <tr>
                                <th>编号</th>
                                <th>品类</th>
                                <th>编辑</th>
                            </tr>
                            <tr v-for="item in category">
                                <td>{{item.num}}</td>
                                <td>{{item.name}}</td>
                                <td>
                                    <div class="btn btn-primary" @click="showModify(item)">修改</div>
                                    <div class="btn btn-danger" @click="delCategory(item.id)">删除</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!-- 添加 -->
                <div class="col-md-6 col-md-offset-3" v-if="is_show_add">
                    <div class="form-group">
                        <label>编号</label>
                        <input type="text" class="form-control" v-model="add_category.num" placeholder="请输入编号">
                    </div>
                    <div class="form-group">
                        <label>品类名称</label>
                        <input type="text" class="form-control" v-model="add_category.name" placeholder="请输入品类名称">
                    </div>
                    <div class="btn btn-primary col-md-4" @click="addCategory">确定</div>
                    <div class="btn btn-default col-md-4 col-md-offset-4" @click="isShowAdd">取消</div>
                </div>
                <!-- 修改 -->
                <div class="col-md-6 col-md-offset-3" v-if="is_show_modify">
                    <div class="form-group">
                        <label>编号</label>
                        <input type="text" class="form-control" v-model="modify_category.num" placeholder="请输入编号">
                    </div>
                    <div class="formgroup">
                        <label>品类名称</label>
                        <input type="text" class="form-control" v-model="modify_category.name" placeholder="请输入品类名称">
                    </div>
                    <div class="btn btn-primary col-md-4" @click="modifyCategory">确定</div>
                    <div class="btn btn-default col-md-4 col-md-offset-4" @click="isShowModify">取消</div>
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

export default {
        name: 'category',
        data() {
            return {
                sid: '',
                is_show_add: false,
                is_show_modify: false,
                category: [],
                add_category: {
                    num: '',
                    name: ''
                },
                modify_category: {
                    num: '',
                    name: ''
                }
            }
        },
        mounted() {
            this.sid = JSON.parse(window.localStorage.getItem('user')).SessionId
            this.queryCategory();
            this.checkLogin();
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
            isShowAdd() {
                this.is_show_add = !this.is_show_add
            },
            isShowModify() {
                this.is_show_modify = !this.is_show_modify
            },
            queryCategory() {
                let _this = this
                api.queryCategory().then(function(res) {
                    if (res.data.Code != 3) {
                        if (res.data.Code == 6) {
                            alert('登录状态已过期, 请重新登录!')
                            _this.$router.push('/')
                        }
                        alert(res.data.Msg)
                    } else {
                        _this.category = res.data.Data
                    }
                })
            },
            addCategory() {
                let _this = this
                let param = {
                    sid: this.sid,
                    num: this.add_category.num,
                    name: this.add_category.name
                }
                api.addCategory(param).then(function(res) {
                    if (res.data.Code != 3) {
                        alert(res.data.Msg)
                    } else {
                        alert('添加成功!')
                        _this.isShowAdd() // 成功后显示列表页
                        _this.queryCategory() // 成功后重新获取列表
                    }
                }).catch(function(err) {
                    console.log(err)
                })
            },
            delCategory(id) {
                let _this = this
                let param = {
                    sid: this.sid,
                    id: id
                }
                if (confirm('确认删除吗?')) {
                    api.delCategory(param).then(function(res) {
                        if (res.data.Code != 3) {
                            alert(res.data.Msg)
                        } else {
                            alert('删除成功!')
                            _this.queryCategory() // 成功后重新获取列表
                        }
                    })
                }
            },
            showModify(obj) {
                this.isShowModify()
                this.modify_category.id = obj.id
                this.modify_category.num = obj.num
                this.modify_category.name = obj.name
            },
            modifyCategory() {
                let _this = this
                let param = {
                    sid: this.sid,
                    id: this.modify_category.id,
                    num: this.modify_category.num,
                    name: this.modify_category.name
                }
                api.modidyCategory(param).then(function(res) {
                    if (res.data.Code != 3) {
                        alert(res.data.Msg)
                    } else {
                        alert('修改成功!')
                        _this.isShowModify()
                        _this.queryCategory()
                    }
                })
            }
        }
}
</script>

<style scoped lang="scss">
    .category-box {
        padding: 3rem;
        .category-list {
            .table {
                margin-top: 4rem;
            }
        }
    }
</style>
