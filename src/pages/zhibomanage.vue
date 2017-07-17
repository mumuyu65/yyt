<template>
   <div id="page-wrapper">
	   <div id="page-inner" class="zhibo">
		   <div class="zhibo-head">
			   <div class="zhibo-watching-people pull-left">观看总人数：<span>1231289</span></div>
			   <router-link :to="{ path: '/live/add' }" class="btn btn-primary pull-right">新增直播室</router-link>
		   </div>
           <div class="zhibo-body">
               <table class="table table-hover">
                   <tr>
                       <th>发布房间</th>
                       <th>直播老师</th>
                       <th>直播状态</th>
                       <th>观看人数</th>
                       <th>操作建议</th>
                       <th>操作</th>
                   </tr>
                   <tr>
                       <td>大厅直播</td>
                       <td>某老师</td>
                       <td>直播中</td>
                       <td>1231289</td>
                       <td><router-link :to="{ path: '/live/operational' }" class="btn btn-info btn-xs">查看</router-link></td>
                       <td>
                           <div class="btn btn-warning btn-xs">停止</div>
                           <div class="btn btn-danger btn-xs">删除</div>
                           <router-link :to="{ path: '/live/modify' }" class="btn btn-primary btn-xs">修改</router-link>
                           <router-link :to="{ path: '/live/room' }" class="btn btn-success btn-xs">进入</router-link>
                       </td>
                   </tr>
               </table>
           </div>
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
                user: {}
            }
        },
		mounted(){
		    this.user = JSON.parse(window.localStorage.getItem('user'))
			this.initData()
		},
		methods: {
			initData() {
//			    if (!this.user) {
//			        this.$router.push('/login')
//                }
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
