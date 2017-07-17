<template>
   <div id="page-wrapper">
	   <div id="page-inner" class="zhibo">
		   <div class="zhibo-head">
			   <div class="zhibo-watching-people pull-left">观看总人数：<span>1231289</span></div>
			   <router-link :to="{ path: '/addlive' }" class="btn btn-primary pull-right">新增直播室</router-link>
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
	}
</style>
