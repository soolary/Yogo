<template>
	<view class="wrapper">
		<SearchBar ref="search" @search="toSearchList" :catName="catName"></SearchBar>
		<view class="history-search">
			<view class="title">
				<text class="title">历史搜索</text>
				<icon type="clear" size="18">
				</icon>
			</view>
			<view>
				<view v-for="(item,index) in history" :key="index" @click="relocate(item)">{{item}}</view>
			</view>
		</view>
	</view>
</template>
  
<script>
	import SearchBar from '../../components/SearchBar'
	const HISTORY_KEY = 'history'
	export default {
		data() {
			return {
				inputVal: '',
				history:[]
			}
		},
		components: { 
			SearchBar
		},
		onShow(){
			this.history=uni.getStorageSync(HISTORY_KEY)|| []
		},
		methods: {
			// 直接跳转
			toSearchList(inputVal) {
				uni.navigateTo({
					url: '/pages/search_list/search_list?catName=' + inputVal
				})
			},
			// 换下顺序在跳转
			relocate(inputVal){
				this.$refs.search.confirmSearch(inputVal)
			}
		}
	}
</script>

<style lang="less">
	.search {
		background-color: #eee;
		padding: 30rpx 15rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		position: relative;

		icon {
			position: absolute;
			top: 50rpx;
			left: 38rpx;
		}

		input {
			height: 60rpx;
			flex: 1;
			background-color: #fff;
			padding-left: 70rpx;
			box-sizing: border-box;
			border-radius: 4rpx;
		}

		button {
			width: 160rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 8rpx;
			font-size: 28rpx;
			border: 1rpx solid #bfbfbf;
			background-color: #eee;
			margin-left: 20rpx;
		}
	}

	.history-search {
		color: #333;
		font-size: 28rpx;
		padding: 30rpx 30rpx 30rpx 15rpx;

		.title {
			display: flex;
			justify-content: space-between;
		}

		view {
			display: flex;
			flex-wrap: wrap;
			margin-top: 30rpx;

			view {
				height: 64rpx;
				line-height: 64rpx;
				padding: 0 26rpx;
				background-color: #ddd;
				margin: 0 30rpx 16rpx 0;
			}
		}
	}
</style>
