<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div style="width:500px; margin:0 auto; margin-top:50px;">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        标题：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type="text" value='' placeholder="请输入文章标题" class="form-control"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        上传封面图:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <img src=""/>
                        <div>
                            <button @click="addNewEconomics()"
                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                    <i class="fa fa-plus fa-1x"></i>上传图片</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        简介:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <textarea cols='45' rows='10'></textarea>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger">提交</button>
                                <button class="btn btn-default pull-right" @click="Cancel()">取消</button>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'AddNew',
  methods:{
        Cancel(){
            this.$router.push('/economicNews');
        }
  }
}
</script>

<style scoped>
    #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }
</style>
