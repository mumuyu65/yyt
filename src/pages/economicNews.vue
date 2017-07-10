<template>
    <div id="page-wrapper" >
        <div id="page-inner" class="economics">
            <div class="row">
                <div class="col-md-12">
                    <button class="pull-right" @click="addNewEconomics()"
                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                    <i class="fa fa-plus fa-1x"></i>新增资讯</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-5 col-sm-5 col-lg-5">
                        <img src="../../static/img/find_user.png" />
                        <h3 style="display:inline-block;">媒体标题</h3>
                        <h4>2017-7-10</h4>
                        <hr/>
                        <p>这是一些示例文本。这是一些示例文本。
                            这是一些示例文本。这是一些示例文本。
                            这是一些示例文本。这是一些示例文本。
                            这是一些示例文本。这是一些示例文本。
                            这是一些示例文本。这是一些示例文本。
                            </p>
                        <div class="text-center" style="margin-top:20px;">
                                <button class="btn btn-danger" style="margin-right:50px;" @click="modifyNews()">修改</button>
                                <button class="btn btn-primary" style="margin-right:50px;" @click="previewNews()">预览</button>
                                <button class="btn btn-default" @click="deleteNew()">删除</button>
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
  name: 'economicNews',
  methods:{
    addNewEconomics(){
        this.$router.push('/addNew');
    },
    modifyNews(){
       this.$router.push('/modifyNew');
    },
    deleteNew(){
        //TODO
    },
    previewNews(){
        alert("预览。。。");
    }
  }
}
</script>

<style scoped>
   .economics>.row{
           margin:0 auto;
        margin-bottom:20px;
   }

   .economics>.row .col-md-5{
        background-color:#f3f3f3;
        margin:20px;
        padding:20px;
   }
</style>
