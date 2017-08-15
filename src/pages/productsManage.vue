<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div class="row">
                    <div class="col-md-12">
                        <ul class="list-inline">
                            <li><h3>产品管理</h3></li>
                            <li class="pull-right" style="margin-top:15px;">
                                <input type="text" value="" v-model="newData" style="height:35px; vertical-align:top;"/>
                                <button @click="addProduct()"
                                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                    <i class="fa fa-plus fa-1x"></i>新增产品
                                </button>
                            </li>
                        </ul>
                    <hr/>
                    <table id="productsTable" class="text-center" border="1" width="100%">
                        <thead>
                            <th  class="text-center">编号</th>
                            <th  class="text-center">简介</th>
                            <th  class="text-center">操作</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in currentItems">
                                <td>{{index +1}}</td>
                                <td>
                                    <span v-show="!item.flag">{{item.name}} </span>
                                    <span v-show="item.flag"><input type="text" :name="index" v-model="item.name" style="height:35px;"></span>
                                </td>
                                <td>
                                    <button class="btn btn-primary" @click="changeEditable(item)" v-show="!item.flag">修改</button>
                                    <span class="btn btn-primary" @click="submitProduct(item)" v-show="item.flag" >提交</span>
                                    <button class="btn btn-danger" @click="removeProduct(item.id,index)">删除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
        newData: '',
        currentItems:[],
        Num:0,
    }
  },
  mounted (){
    this.Sid=JSON.parse(window.localStorage.getItem('user')).SessionId;
    this.initProduct();
  },
  methods:{
    addProduct(){
        if(this.newData){
            this.Num ++;
            let that = this;
            let params ={
                sid: this.Sid,
                num:this.Num,
                name:this.newData,
            };
            this.currentItems.push({ id:this.Num,name:this.newData,flag:false});
            api.addCategory(params).then(function(res){
                if(res.data.Code ==3){
                    that.newData ='';
                }
                alert(res.data.Msg);
            }).catch(function(err){
                console.log(err);
            });
        }else{
            alert("产品类型不能为空！");
        }

    },

    initProduct(){
        let that = this;
        api.queryCategory().then(function(res){
            if(res.data.Code ==3){
                let templateObj=res.data.Data;
                that.Num =templateObj.length;
                for(let i=0; i<that.Num;i++){
                    templateObj[i].flag = false;
                }
                 that.currentItems = templateObj;
            }
            else{
                alert(res.data.Msg);
            }
        }).catch(function(err){
            console.log(err);
        });
    },

    removeProduct(item,idx){
        let params={
            sid:this.Sid,
            id:item
        };

        let that = this;
        api.delCategory(params).then(function(res){
            if(res.data.Code ==3){
                that.currentItems.splice(idx, 1);
            }
            alert(res.data.Msg);
        }).catch(function(err){
            console.log(err);
        });
    },

    changeEditable(item){
       item.flag = !item.flag;
    },

    submitProduct(item){
        let params={
            sid:this.Sid,
            id:item.id,
            num:this.num,
            name:item.name
        };

        api.modidyCategory(params).then(function(res){
            alert(res.data.Msg);
            if(res.data.Code ==3){
                item.flag = !item.flag;
            }
        }).catch(function(err){
            console.log(err);
        });
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

</style>
