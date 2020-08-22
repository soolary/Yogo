<template>
	<view class="">
		<SearchLink></SearchLink>
		<view class="content">
			<view class="left">
				 <view class="cate1 active" >大家电</view>
				 <view class="cate1" v-for="(cate1,index) in 20" :key="index">
				 	热门推荐
				 </view>
			</view>
			<view class="right"> 
				
			</view>
		</view>
	</view>
</template>

<script>
	import SearchLink from '@/components/SearchLink.vue'
	export default {
		components:{
			SearchLink
		}
	}
</script>

<style lang="less" scoped>
.content { 
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	top: 100rpx;
	bottom: 0; 
	.left {
		width: 198rpx;
		overflow: auto;
		.cate1 {
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1px solid #eee;
			background-color: #f4f4f4;
			color: #333;
			text-align: center;
			box-sizing: border-box;
			&.active {
				position: relative;
				background-color: #fff;
				color:#eb4450;
				&::before {
					content:'' ;
					position: absolute;
					top: 20rpx;
					left: 0;
					width: 8rpx;
					height: 60rpx;
					background-color: #eb4450;
				}
			}
		}
	}
	.right {
		
	}
}
</style>