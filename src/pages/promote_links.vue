<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div class="prizemall-box">
                <div v-if="!is_show_add">
                    <div v-if="!is_show_modify">
                     <ul class="list-inline">
                        <li><h3>推广链接</h3></li>
                        <li class="pull-right" style="margin-top:15px;">
                        <button @click="AddPromotelinks()"
                            style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                            <i class="fa fa-plus fa-1x"></i>新增推广链接
                        </button>
                    </li>
                    </ul>
                    <hr/>
                    <!--    展示推广链接 -->
                    <div id="promotelinks_pagnation"></div>
                    <table class="text-center" border="1" width="100%" id="productsTable">
                      <thead>
                          <th class="text-center">序号</th>
                          <th class="text-center">编号</th>
                          <th class="text-center" style="max-width:120px">备注</th>
                          <th class="text-center">二维码</th>
                          <th class="text-center">链接</th>
                          <th class="text-center">点击总数</th>
                          <th class="text-center">当月点击数</th>
                          <th class="text-center">当月转化数</th>
                          <th class="text-center">操作</th>
                      </thead>
                      <tbody>
                          <tr v-for="(item,index) in promoteLinks">
                            <td>{{index+1}}</td>
                            <td>{{item.account}}</td>
                            <td>{{item.remarks }}</td>
                            <td>{{item.qr_code}}</td>
                            <td>
                                <div style="position:relative;">
                                    <input type="text"  style="opacity:0;" v-bind:value="item.links" v-bind:id="'options_'+item.id"/>
                                    <span style="position:absolute; left:40px; top:0;">{{item.links}}</span>
                                </div>
                                <button class="btn btn-primary" v-bind:class="'options_'+item.id"  data-clipboard-action="cut" @click="copylinks('options_'+item.id,item)" >复制链接</button>
                            </td>
                            <td>{{item.clicks}}</td>
                            <td><router-link v-bind:to="'/promotelinks/details?account='+item.account">{{item.month_clicks}}</router-link></td>
                            <td><router-link v-bind:to="'/promotelinks/details?account='+item.account">{{item.month_users}}</router-link></td>
                            <td>
                              <button class="btn btn-primary" @click="modifyPromoteLinks(item)">修改</button>
                              <button class="btn btn-danger" @click="delPromotelinks(item,index)">删除</button>
                            </td>
                          </tr>
                      </tbody>
                    </table>
                    </div>
                </div>
                <!-- 新增 -->
                <div style="margin:50px 20px;" v-show="is_show_add">
                    <div class="row">
                        <div class="col-sm-3 col-md-3 col-xs-6">
                            <span class="required">*</span> 推广人员编号:
                        </div>
                        <div class="col-sm-9 col-md-9 col-xs-6">
                           <input type='text' value="" style="height:30px;" v-model="links.no"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 col-md-3 col-xs-6">
                            <span class="required">*</span> 推广链接:
                        </div>
                        <div class="col-sm-9 col-md-9 col-xs-6">
                           <input type='text' value="" style="height:30px;" v-model="links.href"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 col-md-3 col-xs-6">
                           <span class="required">*</span>上传二维码:
                        </div>
                        <div class="col-sm-9 col-md-9 col-xs-6">
                          <ul class="list-inline">
                              <li><img id="file" v-bind:src="links.qrcode" class="profile"/></li>
                              <li style="position:relative;">
                                <input type="file" @change="onFileChange" ref="uploadAdd"  value="上传图片" style="position:absolute; opacity:0;"/>
                                <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                    上传图片
                                </button>
                              </li>
                          </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 col-md-3 col-xs-6">
                           <span class="required">*</span>备注 :
                        </div>
                        <div class="col-sm-9 col-md-9 col-xs-6">
                            <textarea v-model="links.remark" style="min-height:100px; min-width:400px;"></textarea>

                            <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="addPromoteLinks()">提交</button>
                                <button style="margin-left:100px;" class="btn btn-default" @click="Cancel()">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 修改 -->
                <div style="margin:50px 20px;" v-show="is_show_modify">
                    <div class="row">
                        <div class="col-sm-3 col-md-3 col-xs-6">
                            <span class="required">*</span> 推广人员编号:
                        </div>
                        <div class="col-sm-9 col-md-9 col-xs-6">
                           <input type='text' value="" style="height:30px;" v-model="modifylinks.no" readonly/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 col-md-3 col-xs-6">
                            <span class="required">*</span> 推广链接:
                        </div>
                        <div class="col-sm-9 col-md-9 col-xs-6">
                           <input type='text' value="" style="height:30px;" v-model="modifylinks.href"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 col-md-3 col-xs-6">
                           <span class="required">*</span>上传二维码:
                        </div>
                        <div class="col-sm-9 col-md-9 col-xs-6">
                          <ul class="list-inline">
                              <li>
                                <div style="width:100px; height:100px; overflow:hidden;">
                                    <img v-bind:src="modifylinks.qrcode" class="profile img-responsive"/>
                                </div></li>
                              <li style="position:relative;">
                                <input type="file" @change="onModifyFileChange" ref="uploadmodify"  value="上传图片" style="position:absolute; opacity:0;"/>
                                <button style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                    上传二维码图片
                                </button>
                              </li>
                          </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 col-md-3 col-xs-6">
                           <span class="required">*</span>备注 :
                        </div>
                        <div class="col-sm-9 col-md-9 col-xs-6">
                            <textarea v-model="modifylinks.remark" style="min-height:100px; min-width:400px;"></textarea>
                            <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="modifyPromoteLinksConfirm()">提交</button>
                                <button style="margin-left:100px;" class="btn btn-default" @click="modifyCancel()">取消</button>
                            </div>
                        </div>
                    </div>
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

import '../../static/pagnation/bootstrap-paginator.js';


import Clipboard from "clipboard"

export default {
    name: 'promote-links',
    data() {
        return {
            Sid: '',
            is_show_add:false,
            is_show_modify:false,
            links:{
                no:'',
                href:'',
                qrcode:'',
                remark:'',
            },
            modifylinks:{
                id:'',
                no:'',
                href:'',
                qrcode:'',
                remark:'',
            },

            nodata:false,

            promoteLinks:[],
        }
    },
    mounted() {
        this.Sid = JSON.parse(window.localStorage.getItem('user')).SessionId;
        //this.checkLogin();

        this.initData();
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

        //查询推广人员列表
        initData(){
            let params={
                sid:this.Sid,
                begidx:0,
                counts:10,
            };

            let that = this;

            api.promoteLinksQuery(params).then(function(res){
                console.log(res.data);
                if(res.data.Code ==3){
                    if(res.data.Data.Total>0){
                        that.nodata = false;

                        that.promoteLinks = res.data.Data.Detail;

                        let TotalNum = parseInt(res.data.Data.Total);

                        if(TotalNum >10){
                            let options={

                            };
                        }



                    }else{
                        that.nodata = true;
                    }
                }
            }).catch(function(err){
                console.log(err);
            });
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
                _this.links.qrcode = e.target.result
            }
            reader.readAsDataURL(file)
        },

        //新增推广链接
        AddPromotelinks(){
            this.is_show_add = !this.is_show_add;
        },

        addPromoteLinks(){
            //sid,account,links,file(二维码图片),remarks
            if(this.links.no && this.links.href && this.links.qrcode && this.links.remark){
                let input = this.$refs.uploadAdd;
                let data = new FormData();
                data.append('sid',this.Sid);
                data.append('account',this.links.no);
                data.append('links',this.links.href+'?'+this.links.no);
                data.append('file',input.files[0]);
                data.append('remarks',this.links.remark);

                let that = this;

                axios.post(env.baseUrl+'/yyt/promoter/add', data, {
                        headers: {
                              'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(function (res) {
                      alert(res.data.Msg);
                      if(res.data.Code ==3){
                         that.AddPromotelinks();
                         window.location.reload();
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }else{
                   alert("存在空值!");
                }

        },

        Cancel(){
           this.is_show_add = !this.is_show_add;
        },

        //修改推广链接
        modifyPromoteLinks(item){
            this.is_show_modify = !this.is_show_modify;

            this.modifylinks.id = item.id;

            this.modifylinks.no = item.account;

            this.modifylinks.href = item.links;

            this.modifylinks.qrcode = item.qr_code;

            this.modifylinks.remark = item.remarks;
        },

        modifyPromoteLinksConfirm(){
            //sid,links,file(二维码图片),remarks,id
            let input = this.$refs.uploadmodify;
            let data = new FormData();
            data.append('sid',this.Sid);
            data.append('id',this.modifylinks.id);
            data.append('links',this.modifylinks.href+'?'+this.links.no);
            data.append('file',input.files[0]);
            data.append('remarks',this.links.remark);

            let that = this;

            axios.post(env.baseUrl+'/yyt/promoter/modify', data, {
                    headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (res) {
                  alert(res.data.Msg);
                  if(res.data.Code ==3){
                     that.is_show_modify = !that.is_show_modify;
                     window.location.reload();
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
        },

        modifyCancel(){
            this.is_show_modify = !this.is_show_modify;
        },


        onModifyFileChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length)
                return;
            this.createModifyImage(files[0])
        },

        createModifyImage(file) {
            let reader = new FileReader()
            let _this = this

            reader.onload = (e) => {
                _this.modifylinks.qrcode = e.target.result
            }
            reader.readAsDataURL(file)
        },


        //删除
        delPromotelinks(item,idx){
            let params={
                sid:this.Sid,
                id:item.id
            };


            let that =  this;

            api.promoteLinksDel(params).then(function(res){
                alert(res.data.Msg);
                if(res.data.Code ==3){
                    that.promoteLinks.splice(idx,1);

                    window.location.reload();
                }
            }).catch(function(err){
                console.log(err);
            });

        },

        //复制链接
        copylinks(data,item){
            let clipboard = new Clipboard('.'+data, {
                 target: function(trigger) {
                        return document.getElementById(data);
                    }
                });

            clipboard.on('success', function(e) {
                alert("复制成功！");
                e.clearSelection();
            });

            clipboard.on('error', function(e) {
                alert("复制失败！");
            });
        },



    }
}
</script>

<style >
  .required{
    color:#f00;
  }

  #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }
</style>
