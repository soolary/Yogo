<template>
	<view class="searchBar">
		<input type="text" @confirm="confirmSearch(inputVal)" confirm-type="search" v-model.trim="inputVal" />
		<icon class="search-icon" type="search" size="16"></icon>
		<icon class="clear-icon" type="clear" size="16" color="#fff" v-show="inputVal" @click="inputVal=''"></icon>
	</view>
</template>

<script>
	export default {
		props: ['catName'],
		data() {
			return {
				inputVal: ''
			}
		},
		watch: {
			catName(newVal) {
				this.inputVal = newVal
			}
		},
		methods: {
			confirmSearch(inputVal) {
				if (inputVal) { 
					//获取历史
					let history=uni.getStorageSync('history')
					//加个历史
					history.unshift(inputVal)
					// 去重
					history=[...new Set(history)]
					//多6就删最后一个
					history.length > 6 && history.pop()
					//在存进去+去重
					uni.setStorageSync('history',history)
					this.$emit('search',inputVal)
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.searchBar {
		height: 120rpx;
		background-color: #eee;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		input {
			background-color: #fff;
			height: 60rpx;
			width: 720rpx;
			padding-left: 74rpx;
			box-sizing: border-box;
		}

		.search-icon {
			position: absolute;
			left: 44rpx;
		}

		.clear-icon {
			position: absolute;
			right: 44rpx;
			z-index: 100;
		}
	}
</style>
