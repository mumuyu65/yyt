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
            <div id="toolbar">
                <button id="remove" class="btn btn-danger" disabled>
                    <i class="glyphicon glyphicon-remove"></i>批量删除
                </button>
            </div>
            <table id="table"
                   data-toolbar="#toolbar"
                   data-search="true"
                   data-show-refresh="true"
                   data-show-toggle="true"
                   data-show-columns="true"
                   data-show-export="true"
                   data-detail-view="true"
                   data-detail-formatter="detailFormatter"
                   data-minimum-count-columns="2"
                   data-show-pagination-switch="true"
                   data-pagination="true"
                   data-id-field="id"
                   data-page-list="[10, 25, 50, 100, ALL]"
                   data-show-footer="false"
                   data-side-pagination="server"
                   data-url="/examples/bootstrap_table/data"
                   data-response-handler="responseHandler">
            </table>
            <div class="row">
                <div class="col-md-5 col-sm-5 col-lg-5">
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

import bootstrapTable from 'bootstrap-table'

export default {
  name: 'economicNews',
  mounted(){
    this.initData();
  },
  methods:{
    initData(){
        console.log(Data);
        let options={
            url:'',
            columns: [
                    {
                        field: 'state',
                        checkbox: true,
                        rowspan: 2,
                        align: 'center',
                        valign: 'middle'
                    }, {
                        field: 'id',
                        title: '序列号',
                        rowspan: 2,
                        align: 'center',
                        valign: 'middle',
                        sortable: true,
                    },
                    {
                        field: 'name',
                        title: '标题',
                        sortable: true,
                        editable: true,
                        align: 'center'
                    }, {
                        field: 'price',
                        title: '图片',
                        sortable: true,
                        align: 'center',
                    }, {
                        field: 'operate',
                        title: 'Item Operate',
                        align: 'center',
                        formatter:this.operateFormatter
                    }
            ]
        };

        //$('#table').bootstrapTable(options);
    },

    operateFormatter(value, row, index) {
        return [
            '<a class="like" href="javascript:void(0)" title="Like">',
            '<i class="glyphicon glyphicon-heart"></i>',
            '</a>  ',
            '<a class="remove" href="javascript:void(0)" title="Remove">',
            '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
    },

    //新增资讯
    addNewEconomics(){
        this.$router.push('/addNew');
    },

    //修改资讯
    modifyNews(){
       this.$router.push('/modifyNew');
    },

    //删除资讯
    deleteNew(){
        //TODO
    },

    //预览资讯
    previewNews(){
        alert("预览。。。");
    },

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
