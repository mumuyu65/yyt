<template>
   <div id="page-wrapper">
	   <div id="page-inner" class="zhibo">
            <div v-show="!addlive">
                <div v-show="!modifylive">
                    <ul class="list-inline">
                        <li><h3>直播室管理</h3></li>
                        <li class="pull-right" style="margin-top:15px;">
                            <button
                                    style="background-color:#84B4DC; color:#fff; border:1px solid transparent; padding:5px 10px;" >
                                    <i class="fa fa-plus fa-1x"></i>新增直播室
                            </button>
                        </li>
                    </ul>
                    <hr/>
                </div>
            </div>
            <!-- 添加 -->



            <!-- 修改 -->
	   </div>
   </div>
</template>

<script>
import API from '@/api/API'
const api = new API()

export default {
name: 'ZhiboManage',
data() {
    return {
        user: {},
        addlive:false,
        modifylive:false,

    }
},
mounted(){
    this.user = JSON.parse(window.localStorage.getItem('user'));
	this.initData();
},
methods: {
	initData(){

    }
 }

}
</script>

<style scoped lang="scss">
	.zhibo {
		.zhibo-head {
			width: 100%;
			padding: 15px;
			border-bottom: 1px solid #c0c0c0;
			&:after {
				display: table;
				content: ' ';
				clear: both;
			}
			.zhibo-watching-people {
				font-size: 1.6rem;
				span {
					font-size: 2.4rem;
					color: #e80000;
				}
			}
		}
        .zhibo-body {
            padding: 5rem;
        }
	}
</style>
