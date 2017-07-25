<template>
    <div id="page-wrapper" >
        <div id="page-inner">
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
             <div class="schedule" style="margin-top:50px; margin-left:50px; height:99%;" v-show="!addSchedules">
                <ul>
                    <li>时间</li>
                    <li>星期一</li>
                    <li>星期二</li>
                    <li>星期三</li>
                    <li>星期四</li>
                    <li>星期五</li>
                    <li>星期六</li>
                    <li>星期日</li>
                    <li class="border-r">操作</li>
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
                    <li class="border-b"></li>
                    <li class="border-l"></li>
                </ul>
                <div style="clear:both; float:none;"></div>
            </div>
            <div v-show="addSchedules" style="width:700px;margin:0 auto; margin-top:50px;">
                <div class="row">
                        <div class="col-sm-3 col-md-3 col-xs-6">
                            <span class="required">*</span> 时间段:
                        </div>
                        <div class="col-sm-9 col-md-9 col-xs-6">
                            <select v-model="Period" class="form-control">
                                <option v-for="option in PeriodOptions" v-bind:value="option.value">
                                        {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>  星期：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <select v-model="selected" class="form-control">
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
                        <input type='text' value="" style="height:30px;" v-model="teacher" class="form-control"/>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="add()">提交</button>
                                <button style="margin-left:50px;" class="btn btn-default" @click="Cancel()">取消</button>
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
        PeriodOptions:[
          { text: '9:00--10:00' ,  value: '9:00--10:00' },
          { text: '10:00--11:30', value: '10:00--11:30' },
          { text: '11:30--13:00', value: '11:30--13:00' },
          { text: '13:00--14:30', value: '13:00--14:30' },
          { text: '14:30--16:00', value: '14:30--16:00' },
          { text: '16:00--17:30', value: '16:00--17:30' },
          { text: '17:30--19:00', value: '17:30--19:00' },
          { text: '19:00--20:30', value: '19:00--20:30' },
          { text: '20:30--22:00', value: '20:30--22:00' },
          { text: '22:00--23:30', value: '22:00--23:30' },
        ],
        teacher:'',
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initSchedule();
  },
  methods:{
    addSchedule(){
        let that = this;
        this.addSchedules = !this.addSchedules;
    },

    add(){
        let that = this;
        let params={
            sid:this.Sid,
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

    initSchedule(){
        let that = this;
        let params={
            sid:this.Sid
        };
        api.scheduleQuery(params).then(function(res){
            if(res.data.Code ==3){
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
                    if(items[i].period == '9:00--10:00'){
                         pointName = 1;
                    }
                    else if(items[i].period =='10:00--11:30'){
                         pointName = 2;
                    }
                    else if(items[i].period =='11:30--13:00'){
                         pointName = 3;
                    }
                    else if(items[i].period =='13:00--14:30'){
                         pointName = 4;
                    }
                    else if(items[i].period =='14:30--16:00'){
                         pointName = 5;
                    }
                    else if(items[i].period =='16:00--17:30'){
                         pointName = 6;
                    }
                    else if(items[i].period =='17:30--19:00'){
                         pointName = 7;
                    }
                    else if(items[i].period =='19:00--20:30'){
                         pointName = 8;
                    }
                    else if(items[i].period =='20:30--22:00'){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    console.log(pointName,i);
                    DataSource[0].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                case '周二':
                    var pointName;
                    if(items[i].period == '9:00--10:00'){
                         pointName = 1;
                    }
                    else if(items[i].period =='10:00--11:30'){
                         pointName = 2;
                    }
                    else if(items[i].period =='11:30--13:00'){
                         pointName = 3;
                    }
                    else if(items[i].period =='13:00--14:30'){
                         pointName = 4;
                    }
                    else if(items[i].period =='14:30--16:00'){
                         pointName = 5;
                    }
                    else if(items[i].period =='16:00--17:30'){
                         pointName = 6;
                    }
                    else if(items[i].period =='17:30--19:00'){
                         pointName = 7;
                    }
                    else if(items[i].period =='19:00--20:30'){
                         pointName = 8;
                    }
                    else if(items[i].period =='20:30--22:00'){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    console.log(pointName);
                    DataSource[1].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                case '周三':
                    var pointName;
                    if(items[i].period == '9:00--10:00'){
                         pointName = 1;
                    }
                    else if(items[i].period =='10:00--11:30'){
                         pointName = 2;
                    }
                    else if(items[i].period =='11:30--13:00'){
                         pointName = 3;
                    }
                    else if(items[i].period =='13:00--14:30'){
                         pointName = 4;
                    }
                    else if(items[i].period =='14:30--16:00'){
                         pointName = 5;
                    }
                    else if(items[i].period =='16:00--17:30'){
                         pointName = 6;
                    }
                    else if(items[i].period =='17:30--19:00'){
                         pointName = 7;
                    }
                    else if(items[i].period =='19:00--20:30'){
                         pointName = 8;
                    }
                    else if(items[i].period =='20:30--22:00'){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    DataSource[2].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                case '周四':
                    var pointName;
                    if(items[i].period == '9:00--10:00'){
                         pointName = 1;
                    }
                    else if(items[i].period =='10:00--11:30'){
                         pointName = 2;
                    }
                    else if(items[i].period =='11:30--13:00'){
                         pointName = 3;
                    }
                    else if(items[i].period =='13:00--14:30'){
                         pointName = 4;
                    }
                    else if(items[i].period =='14:30--16:00'){
                         pointName = 5;
                    }
                    else if(items[i].period =='16:00--17:30'){
                         pointName = 6;
                    }
                    else if(items[i].period =='17:30--19:00'){
                         pointName = 7;
                    }
                    else if(items[i].period =='19:00--20:30'){
                         pointName = 8;
                    }
                    else if(items[i].period =='20:30--22:00'){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    DataSource[3].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                    case '周五':
                    var pointName;
                    if(items[i].period == '9:00--10:00'){
                         pointName = 1;
                    }
                    else if(items[i].period =='10:00--11:30'){
                         pointName = 2;
                    }
                    else if(items[i].period =='11:30--13:00'){
                         pointName = 3;
                    }
                    else if(items[i].period =='13:00--14:30'){
                         pointName = 4;
                    }
                    else if(items[i].period =='14:30--16:00'){
                         pointName = 5;
                    }
                    else if(items[i].period =='16:00--17:30'){
                         pointName = 6;
                    }
                    else if(items[i].period =='17:30--19:00'){
                         pointName = 7;
                    }
                    else if(items[i].period =='19:00--20:30'){
                         pointName = 8;
                    }
                    else if(items[i].period =='20:30--22:00'){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    DataSource[4].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                    case '周六':
                    var pointName;
                    if(items[i].period == '9:00--10:00'){
                         pointName = 1;
                    }
                    else if(items[i].period =='10:00--11:30'){
                         pointName = 2;
                    }
                    else if(items[i].period =='11:30--13:00'){
                         pointName = 3;
                    }
                    else if(items[i].period =='13:00--14:30'){
                         pointName = 4;
                    }
                    else if(items[i].period =='14:30--16:00'){
                         pointName = 5;
                    }
                    else if(items[i].period =='16:00--17:30'){
                         pointName = 6;
                    }
                    else if(items[i].period =='17:30--19:00'){
                         pointName = 7;
                    }
                    else if(items[i].period =='19:00--20:30'){
                         pointName = 8;
                    }
                    else if(items[i].period =='20:30--22:00'){
                         pointName = 9;
                    }
                    else {
                         pointName = 10;
                    }
                    DataSource[5].course.push({teacherName:items[i].lecturer,pointName:pointName,pointTime:items[i].period,id:items[i].id}); break;
                    case '周日':
                    var pointName;
                    if(items[i].period == '9:00--10:00'){
                         pointName = 1;
                    }
                    else if(items[i].period =='10:00--11:30'){
                         pointName = 2;
                    }
                    else if(items[i].period =='11:30--13:00'){
                         pointName = 3;
                    }
                    else if(items[i].period =='13:00--14:30'){
                         pointName = 4;
                    }
                    else if(items[i].period =='14:30--16:00'){
                         pointName = 5;
                    }
                    else if(items[i].period =='16:00--17:30'){
                         pointName = 6;
                    }
                    else if(items[i].period =='17:30--19:00'){
                         pointName = 7;
                    }
                    else if(items[i].period =='19:00--20:30'){
                         pointName = 8;
                    }
                    else if(items[i].period =='20:30--22:00'){
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

</style>
