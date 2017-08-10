<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div v-show="!addSchedules">
                <ul class="list-inline">
                    <li><h3>课程安排管理</h3></li>
                    <li class="pull-right" style="margin-top:15px;">
                        <button @click="addSchedule()"
                            style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                            <i class="fa fa-plus fa-1x"></i>添加课程
                        </button>
                    </li>
                </ul>
                <hr/>
                <div class="schedule" style="margin:50px 20px; height:99%;" >
                    <h3 style="margin:20px 0">日期:{{month_date}}</h3>
                    <ul>
                        <li>时间</li>
                        <li>星期一</li>
                        <li>星期二</li>
                        <li>星期三</li>
                        <li>星期四</li>
                        <li>星期五</li>
                        <li>星期六</li>
                        <li class="border-r">星期日</li>
                    </ul>
                    <div style="clear:both; float:none;"></div>
                    <ul name="point1">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li class="border-r"></li>
                    </ul>
                     <div style="clear:both; float:none;"></div>
                    <ul name="point2">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li class="border-r"></li>
                    </ul>
                    <div style="clear:both; float:none;"></div>
                    <ul name="point3">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li class="border-r"></li>
                    </ul>
                    <div style="clear:both; float:none;"></div>
                    <ul name="point4">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li class="border-r"></li>
                    </ul>
                    <div style="clear:both; float:none;"></div>
                    <ul name="point5">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li class="border-r"></li>
                    </ul>
                     <div style="clear:both; float:none;"></div>
                    <ul name="point6">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li class="border-r"></li>
                    </ul>
                     <div style="clear:both; float:none;"></div>
                    <ul name="point7">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li class="border-r"></li>
                    </ul>
                     <div style="clear:both; float:none;"></div>
                    <ul name="point8">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li class="border-r"></li>
                    </ul>
                    <div style="clear:both; float:none;"></div>
                    <ul name="point9">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li class="border-r"></li>
                    </ul>
                    <div style="clear:both; float:none;"></div>
                    <ul name="point10">
                        <li class="border-b"></li>
                        <li class="border-b"></li>
                        <li class="border-b"></li>
                        <li class="border-b"></li>
                        <li class="border-b"></li>
                        <li class="border-b"></li>
                        <li class="border-b"></li>
                        <li class="border-l"></li>
                    </ul>
                    <div style="clear:both; float:none;"></div>
                </div>
            </div>
            <!--  添加 -->
            <div v-show="addSchedules" style="margin:50px 20px;">
                <div v-show="!TimeDistance">
                    <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        <span class="required">*</span> 年/月/日:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type="text" id="month_date" style="height:30px;border-radius:0;width:220px;" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        <span class="required">*</span> 时间段:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <ul class="list-inline">
                            <li style="vertical-align:top;">
                                <div class="dropdown" v-bind:class="{open:isActive}" >
                                    <input type="text" @focus="dropdown" v-model="Period" style="height:30px; width:220px; cursor:pointer;"/><span class="caret" style="position:absolute; right:10px;top:6px;"></span>
                                    <ul class="dropdown-menu text-center" style="top:70%; width:220px;">
                                        <li v-for="option in PeriodOptions" >
                                            <span style="cursor:pointer;"  @click="selectTimeDistance(option)">{{ option.text }}</span>
                                            <b style="font-size:18px; margin-left:30px; cursor:pointer;" @click="delTimeDistance(option)">&times;</b>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li><button class="btn btn-danger" @click="addTimeDistance()">添加时间段</button></li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>  星期：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <select v-model="selected" >
                            <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span> 老师:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type='text' value="" style="height:30px;border-radius:0;width:220px;" v-model="teacher" />
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="add()">提交</button>
                                <button style="margin-left:50px;" class="btn btn-default" @click="Cancel()">取消</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="row" v-show="TimeDistance" style="margin:50px 20px;">
                <div class="col-sm-3 col-md-3 col-xs-6">
                     <span class="required">*</span>时间选择:
                </div>
                <div class="col-sm-9 col-md-9 col-xs-6">
                    <ul class="list-inline">
                        <li>开始时间:</li>
                        <li><input type="text" class="form-control form_datetime" id="start_time" /></li>
                        <li>结束时间:</li>
                        <li><input type="text" class="form-control form_datetime" id="end_time" /></li>
                        <li><button class="btn btn-danger" @click="submitTimeDistance()">添加</button></li>
                    </ul>
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
  name: 'productsManage',
  data (){
    return {
        Sid:'',
        currentTables:[],
        addSchedules:false,
        selected:'',
        options:[
          { text: '周一', value: '周一' },
          { text: '周二', value: '周二' },
          { text: '周三', value: '周三' },
          { text: '周四', value: '周四' },
          { text: '周五', value: '周五' },
          { text: '周六', value: '周六' },
          { text: '周日', value: '周日' },
        ],
        Period:'',
        PeriodOptions:[],
        teacher:'',

        TimeDistance:false,  //时间段
        month_date:'',

        tempPeriod:[],

        isActive:false,  //下拉框
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;

    this.initData();

    this.queryPeriod();  //查询时间段
  },
  methods:{
    initData(){
         //时间
        $(".form_datetime").datetimepicker({
            format: "hh:ii",
            autoclose: true,
            todayBtn: true,
            language:'zh-CN',
            pickerPosition: "bottom",
            minView: 0,
            startView:0,
            minuteStep:10
        });


        $("#month_date").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            language:'zh-CN',
            pickerPosition: "bottom",
            minView: 2,
            startView:3,
            minuteStep:10
        });
    },
    //dropdown
    dropdown(){
        this.isActive = !this.isActive;
    },

    //选择时间段
    selectTimeDistance(item){
        this.Period = item.text;
        this.isActive = !this.isActive;
    },
    //删除时间段
    delTimeDistance(item){
        let params={
            sid:this.Sid,
            period:item.text
        };


        api.delTimeDistance(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                window.location.reload();
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    queryPeriod(){
        let that = this;
        api.periodQuery().then(function(res){
            if(res.data.Code ==3){
                let templatObj= res.data.Data;
                let tempPeriod=[];
                for(let i =0 ; i<templatObj.length;i++){
                    that.PeriodOptions.push({text:templatObj[i].period,value:templatObj[i].period});
                    tempPeriod.push(templatObj[i].period);
                }

                that.tempPeriod=that.sortPeriod(tempPeriod);

                that.initSchedule(); //查询课程表
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    sortPeriod(tempPeriod){
        //时间点排序
        tempPeriod.sort(function (a, b) {
            var a1 = parseInt(a.split(":")[0]);
            var a2 = parseInt(a.split(":")[1]);
            var b1 = parseInt(b.split(":")[0]);
            var b2 = parseInt(b.split(":")[1]);
            if (a1 < b1 || (a1 == b1 && a2 < b2)) {
                return -1;
            } else {
                return 1;
            }
        });
        tempPeriod=tempPeriod.join().split(",");//排序后赋值
        return tempPeriod;
    },

    submitTimeDistance(){
        this.TimeDistance = !this.TimeDistance;
        let start_time=$("#start_time").val();
        let end_time=$("#end_time").val();
        let tempTime = start_time+'--'+end_time;
        this.PeriodOptions.push({text:tempTime,value:tempTime});
    },

    addSchedule(){
        let that = this;
        this.addSchedules = !this.addSchedules;
    },

    add(){
        let that = this;
        let params={
            sid:this.Sid,
            date:$("#month_date").val(),
            dayofweek:this.selected,
            period:this.Period,
            lecturer:this.teacher
        };
        api.scheduleAdd(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                that.addSchedules = !that.addSchedules;
                window.location.reload();
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //选择时间段
    addTimeDistance(){
        this.TimeDistance = !this.TimeDistance;
    },

    //查询课程表
    initSchedule(){
        let that = this;
        api.scheduleQuery().then(function(res){
            if(res.data.Code ==3){
                that.month_date = res.data.Data[0].date;
                that.resetSchedule(res.data.Data);
            }else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    //排序
    resetSchedule(items){
         let DataSource = [
            {weekday:1,course:[]},
            {weekday:2,course:[]},
            {weekday:3,course:[]},
            {weekday:4,course:[]},
            {weekday:5,course:[]},
            {weekday:6,course:[]},
            {weekday:7,course:[]},
        ];

        let that = this;

        for(let i =0; i<items.length;i++){
            switch(items[i].dayofweek){
                case '周一':
                    var pointName;
                    if(items[i].period == this.tempPeriod[0]){
                         pointName = 1;
                    }
                    else if(items[i].period == this.tempPeriod[1]){
                         pointName = 2;
                    }
                    else if(items[i].period ==this.tempPeriod[2]){
                         pointName = 3;
                    }
                    else if(items[i].period ==this.tempPeriod[3]){
                         pointName = 4;
                    }
                    else if(items[i].period ==this.tempPeriod[4]){
                         pointName = 5;
                    }
                    else if(items[i].period ==this.tempPeriod[5]){
                         pointName = 6;
                    }
                    else if(items[i].period ==this.tempPeriod[6]){
                         pointName = 7;
                    }
                    else if(items[i].period ==this.tempPeriod[7]){
                         pointName = 8;
                    }
                    else if(items[i].period ==this.tempPeriod[8]){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    //console.log(pointName,i);
                    DataSource[0].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                case '周二':
                    var pointName;
                    if(items[i].period == this.tempPeriod[0]){
                         pointName = 1;
                    }
                    else if(items[i].period ==this.tempPeriod[1]){
                         pointName = 2;
                    }
                    else if(items[i].period ==this.tempPeriod[2]){
                         pointName = 3;
                    }
                    else if(items[i].period ==this.tempPeriod[3]){
                         pointName = 4;
                    }
                    else if(items[i].period ==this.tempPeriod[4]){
                         pointName = 5;
                    }
                    else if(items[i].period ==this.tempPeriod[5]){
                         pointName = 6;
                    }
                    else if(items[i].period ==this.tempPeriod[6]){
                         pointName = 7;
                    }
                    else if(items[i].period ==this.tempPeriod[7]){
                         pointName = 8;
                    }
                    else if(items[i].period ==this.tempPeriod[8]){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    console.log(pointName);
                    DataSource[1].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                case '周三':
                    var pointName;
                    if(items[i].period == this.tempPeriod[0]){
                         pointName = 1;
                    }
                    else if(items[i].period ==this.tempPeriod[1]){
                         pointName = 2;
                    }
                    else if(items[i].period ==this.tempPeriod[2]){
                         pointName = 3;
                    }
                    else if(items[i].period ==this.tempPeriod[3]){
                         pointName = 4;
                    }
                    else if(items[i].period ==this.tempPeriod[4]){
                         pointName = 5;
                    }
                    else if(items[i].period ==this.tempPeriod[5]){
                         pointName = 6;
                    }
                    else if(items[i].period ==this.tempPeriod[6]){
                         pointName = 7;
                    }
                    else if(items[i].period ==this.tempPeriod[7]){
                         pointName = 8;
                    }
                    else if(items[i].period ==this.tempPeriod[8]){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    DataSource[2].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                case '周四':
                    var pointName;
                    if(items[i].period == this.tempPeriod[0]){
                         pointName = 1;
                    }
                    else if(items[i].period ==this.tempPeriod[1]){
                         pointName = 2;
                    }
                    else if(items[i].period ==this.tempPeriod[2]){
                         pointName = 3;
                    }
                    else if(items[i].period ==this.tempPeriod[3]){
                         pointName = 4;
                    }
                    else if(items[i].period ==this.tempPeriod[4]){
                         pointName = 5;
                    }
                    else if(items[i].period ==this.tempPeriod[5]){
                         pointName = 6;
                    }
                    else if(items[i].period ==this.tempPeriod[6]){
                         pointName = 7;
                    }
                    else if(items[i].period ==this.tempPeriod[7]){
                         pointName = 8;
                    }
                    else if(items[i].period ==this.tempPeriod[8]){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    DataSource[3].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                    case '周五':
                    var pointName;
                    if(items[i].period == this.tempPeriod[0]){
                         pointName = 1;
                    }
                    else if(items[i].period ==this.tempPeriod[1]){
                         pointName = 2;
                    }
                    else if(items[i].period ==this.tempPeriod[2]){
                         pointName = 3;
                    }
                    else if(items[i].period ==this.tempPeriod[3]){
                         pointName = 4;
                    }
                    else if(items[i].period ==this.tempPeriod[4]){
                         pointName = 5;
                    }
                    else if(items[i].period ==this.tempPeriod[5]){
                         pointName = 6;
                    }
                    else if(items[i].period ==this.tempPeriod[6]){
                         pointName = 7;
                    }
                    else if(items[i].period ==this.tempPeriod[7]){
                         pointName = 8;
                    }
                    else if(items[i].period ==this.tempPeriod[8]){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    DataSource[4].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                    case '周六':
                    var pointName;
                    if(items[i].period == this.tempPeriod[0]){
                         pointName = 1;
                    }
                    else if(items[i].period ==this.tempPeriod[1]){
                         pointName = 2;
                    }
                    else if(items[i].period ==this.tempPeriod[2]){
                         pointName = 3;
                    }
                    else if(items[i].period ==this.tempPeriod[3]){
                         pointName = 4;
                    }
                    else if(items[i].period ==this.tempPeriod[4]){
                         pointName = 5;
                    }
                    else if(items[i].period ==this.tempPeriod[5]){
                         pointName = 6;
                    }
                    else if(items[i].period ==this.tempPeriod[6]){
                         pointName = 7;
                    }
                    else if(items[i].period ==this.tempPeriod[7]){
                         pointName = 8;
                    }
                    else if(items[i].period ==this.tempPeriod[8]){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    DataSource[5].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                    case '周日':
                    var pointName;
                    if(items[i].period == this.tempPeriod[0]){
                         pointName = 1;
                    }
                    else if(items[i].period ==this.tempPeriod[1]){
                         pointName = 2;
                    }
                    else if(items[i].period ==this.tempPeriod[2]){
                         pointName = 3;
                    }
                    else if(items[i].period ==this.tempPeriod[3]){
                         pointName = 4;
                    }
                    else if(items[i].period ==this.tempPeriod[4]){
                         pointName = 5;
                    }
                    else if(items[i].period ==this.tempPeriod[5]){
                         pointName = 6;
                    }
                    else if(items[i].period ==this.tempPeriod[6]){
                         pointName = 7;
                    }
                    else if(items[i].period ==this.tempPeriod[7]){
                         pointName = 8;
                    }
                    else if(items[i].period ==this.tempPeriod[8]){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    DataSource[6].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
            }
        }
        $.each(DataSource,function(i,n){//遍历数据源 填充课程表信息
                $.each(n.course,function(j,k){
                    $(".schedule ul[name='point"+k.pointName+"'] li").eq(0).html("<span>"+k.pointTime+"</span>");
                    $(".schedule ul[name='point"+k.pointName+"'] li").eq(n.weekday).html("<input type='text' style='display:none; width:80px; vertical-align:top;'/><a data-id='"+k.id+"' class='text' style='cursor:pointer;'>"+k.teacherName+"</a>");
                });
        });

        $(".schedule a").click(function(){
            $(this).parent().append('<a class="modify" style="margin-left:10px;">修改</a><a class="del">删除</a>');
            $('.modify').click(function(){
                    let Id = $(this).parent().find(".text").attr('data-id');
                    $(this).css("display",'none');
                    $(this).parent().find('input').css("display",'inline-block');
                    $(this).parent().find('.text').css("display",'none');
                    $(this).parent().find('.del').css("display",'none');
                    $(this).parent().append('<a class="submit">提交</a>');
                    $(".submit").click(function(){
                        let lectruer= $(this).parent().find("input").val();
                        if(lectruer){
                            that.modifySchedule(Id,lectruer);
                        }else{
                            alert('输入的内容不能为空！');
                        }
                    });
            });

            $(".del").click(function(){
                let Id = $(this).parent().find(".text").attr('data-id');
                that.delSchedule(Id);
            });
        });
    },

    //修改
    modifySchedule(Id,Lecturer){
        let params={
            sid:this.Sid,
            id:Id,
            lecturer:Lecturer
        };

        api.scheduleModify(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                window.location.reload();
            }
        }).catch(function(err){
            console.log(err);
        });

    },

    //删除

    delSchedule(Id){
        let params={
            sid:this.Sid,
            id:Id
        };

        api.scheduleDel(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                window.location.reload();
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    Cancel(){
        this.addSchedules = !this.addSchedules;
    }

  },
}
</script>

<style scoped>
   #productsTable th,#productsTable td{
        padding:5px 0;
        border:1px solid #ececec;
   }

    #productsTable tr:hover{
        background-color:#f7f7f7;
    }

   #productsTable tr:nth-child(odd){
        background-color:#f7f7f7;
   }

   #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }

    .required{
        color:#e60000;
        margin-right:5px;
    }

    .schedule ul{
            margin: 0px;
            padding: 0px;
            width: 100%;
            height:100%;
            display: block;
            clear: both;
            text-align: center;
            min-width:800px;
        }
    .schedule ul li{
            float: left;
            list-style-type: none;
            border-top: #CBD8AC solid 1px;
            border-left: #CBD8AC solid 1px;
            width: 10%;
            vertical-align:middle;
            height:35px;
            padding-top:10px;
        }
    .schedule .border-r{
            border-right: #CBD8AC solid 1px;
        }
    .schedule  .border-b
        {
            border-bottom: #CBD8AC solid 1px;
        }
    .schedule .border-l
        {
            border-right: #CBD8AC solid 1px;
            border-bottom: #CBD8AC solid 1px;
        }

        .dropdown-menu>li>span{
            padding:5px 0;
            display:inline-block;
            width:60%;
            cursor:pointer;
        }

        .dropdown-menu>li:hover>span{
            background-color:#f5f5f5;
        }

</style>
