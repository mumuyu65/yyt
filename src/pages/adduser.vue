<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div style="width:700px;margin:0 auto; margin-top:50px;">
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                         <span class="required">*</span>  角色选择：
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <select v-model="selected">
                            <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                        <span class="required">*</span> 手机号:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                       <input type='number' value="" style="height:30px;" v-model="user.phone"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-3 col-xs-6">
                       <span class="required">*</span> 密码:
                    </div>
                    <div class="col-sm-9 col-md-9 col-xs-6">
                        <input type='password' value="" style="height:30px;" v-model="user.pwd"/>
                        <div style="margin-top:20px;">
                                <button class="btn btn-danger" @click="adduser()">提交</button>
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
  name: 'AddUser',
  data (){
    return {
        user:{},
        selected: '1',
        options: [
           { text: '普通用户', value: '0' },
          { text: '老师', value: '1' },
          { text: '审核员', value: '2' },
          { text: '管理员', value: '3' }
        ],
        Sid:'',
    }
  },
   mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
  },
  methods:{
    adduser(){
        let params={
            sid:this.Sid,
            phone:this.user.phone,
            pwd:this.user.pwd,
            flag:this.selected,
        };

        let that = this;

        api.addUser(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                that.$router.push('index');
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    Cancel(){
         this.$router.push('index');
    },
  },
}
</script>

<style scoped>
    #page-inner .row{
        padding:20px;
        background-color:#F3F3F3;
        margin-bottom:10px;
    }

    .required{
        color:#e60000;
        margin-right:5px;
    }
</style>
