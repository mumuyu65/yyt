<template>
    <div id="page-wrapper" >
        <div id="page-inner">
            <div class="row">
                <div class="col-md-12">
                    <button class="pull-right" @click="addNewEconomics()"
                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                    <i class="fa fa-plus fa-1x"></i>新增资讯</button>
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
    }
  }
}
</script>
