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
                <button id="remove" class="btn btn-danger">
                    批量删除
                </button>
            </div>
            <table id="newsTable"></table>
        </div>
    </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import 'bootstrap-table'

export default {
  name: 'economicNews',
  data(){
    return{
      Sid:'',
      newsType:[],
    }
  },
  mounted(){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initData();
  },
  methods:{
    initData(){
      let that = this;
      api.newsType().then(function(res){
            if(res.data.Code ==3){
                that.newsType = res.data.Data;
                that.queryNews();
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });

    },

    //新增资讯
    addNewEconomics(){
        this.$router.push('/addNew');
    },

    queryNews(){
      let that = this;
      let params={
          begidx:0,
          counts:100,
          type:1,
        };
      api.queryNews(params).then(function(res){
          console.log(res);
          if(res.data.Code ==3){
            $('#newsTable').bootstrapTable({
                        data:res.data.Data.Detail,
                        striped:true,
                        toolbar:'#toolbar',
                        pagination:'true',
                        sidePagination:'server',
                        pageNumber:1,
                        pageSize:10,
                        pageList:[10,15,20,25,30],
                        search:true,
                        searchOnEnterKey:true,
                        showColumns:false,
                        showRefresh:false,
                        showToggle:false,
                        showPaginationSwitch:false,
                        searchAlign:'right',
                        toolbarAlign:'left',
                        sortable:true,
                        searchFormatter:true,
                        columns: [{
                            checkbox:true,
                        },{
                            field: 'id',
                            title: '序列号',
                            formatter:function(value,row,index){
                                return index+1;
                            }
                        },{
                            field: 'type',
                            title: '资讯类型',
                            formatter:function(value,row,index){
                              let obj=that.newsType;
                              for(let i =0; i<obj.length;i++){
                                if(value == obj[i].type){
                                  return obj[i].text;
                                }
                              }
                            }
                        }, {
                            field: 'title',
                            title: '资讯标题'
                        }, {
                            field: 'content',
                            title: '资讯内容',
                        },{
                            field: 'imgurl',
                            title: '资讯图片',
                        },  {
                            field: 'unix',
                            title: '创建时间',
                            formatter:that.operateDate
                        },{
                            title: '用户操作',
                            formatter:function(value,row,index){
                              return '<a href="#/modifyNews?id='+row.id+'&img='+row.imgurl+'"><button class="btn btn-danger">修改</button></a>'
                            }
                        }],
                });
          }
      });
    },

    operateDate(value,row,index){
        return this.time(value*1000);
    },

    add(m) {
         return m<10?'0'+m:m
     },
    time(tm) {
         //获取一个事件戳
         var time = new Date(tm);
         //获取年份信息
         var y = time.getFullYear();
         //获取月份信息，月份是从0开始的
         var m = time.getMonth()+1;
         //获取天数信息
         //获取天数信息
         var d = time.getDate();

         var H=time.getHours();

         var M=time.getMinutes();
         //返回拼接信息
         return y+'-'+this.add(m) + '-' + this.add(d)+'&nbsp;&nbsp;'+this.add(H)+":"+this.add(M);
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
