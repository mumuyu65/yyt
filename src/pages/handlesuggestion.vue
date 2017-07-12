<template>
   <div id="page-wrapper">
       <div id="page-inner" class="zhibo">
            <ul class="list-inline" style="padding:20px;">
                <li>开始时间：
                    <div class="input-append date" id="datetimepicker_start">
                      <input class="span2" size="16" type="text" value="" />
                      <span class="add-on" ><i class="icon-th"></i></span>
                    </div>
                </li>
                <li>结束时间：
                    <div class="input-append date" id="datetimepicker_end" >
                      <input class="span2" size="16" type="text" value="">
                      <span class="add-on"><i class="icon-th"></i></span>
                    </div>
                </li>
                <li>商品类别：
                    <select>
                        <option value="">---请选择商品----</option>
                        <option value="果蔬1">果蔬1</option>
                        <option value="果蔬2">果蔬2</option>
                        <option value="果蔬3">果蔬3</option>
                    </select>
                </li>
                <li>分析师：
                    <select>
                        <option value="">---请选择分析师----</option>
                        <option value="果蔬1">果蔬1</option>
                        <option value="果蔬2">果蔬2</option>
                        <option value="果蔬3">果蔬3</option>
                    </select>
                </li>
                <li class="pull-right">
                    搜索：<input type="text" placeholder="search......"/>
                </li>
            </ul>
            <hr/>
        </div>
   </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.js';

import '../../static/bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js';

export default {
  name: 'ZhiboManage',
  mounted(){
    this.initData();
  },
  data (){
    return {
    }
  },
  methods:{
    initData (){
        //初始化
        $('#datetimepicker_start').datetimepicker({
          language: 'zh-CN',
          format: 'yyyy-mm-dd hh:ii:ss',
          todayBtn: 1,
          autoclose: 1,
          minView:0,
        });

        //初始化
        $('#datetimepicker_end').datetimepicker({
          language: 'zh-CN',
          format: 'yyyy-mm-dd hh:ii:ss',
          todayBtn: 1,
          autoclose: 1,
          minView:0,
        });
    },
  }
}
</script>

<style scoped>
    .zhibo>ul input,.zhibo>ul select{
        height:30px;
        padding-left:5px;
        outline:none;
        border:1px solid #ececec;
        position:relative;
        display:inline-block;
        width:200px;
    }

    .zhibo>ul .input-append{
      display:inline-block;
      vertical-align:middle;
    }

    .zhibo>ul .add-on{
      height:30px;
    }
</style>
