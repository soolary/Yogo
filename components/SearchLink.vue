<template>
	<view class="search-link">
		<view class="inner">
			<icon class="icon" type="search" size="16"></icon>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.search-link {
		height: 100rpx;
		background-color: #eb4450;
		padding: 20rpx 16rpx;
		box-sizing: border-box;
	
		.inner {
			display: flex;
			height: 60rpx;
			background-color: #fff;
			border-radius: 8rpx;
			justify-content: center;
			align-items: center;
			icon {
				margin-top: 4rpx;
			}
			text {
				margin-left: 16px;
				color: #bbb;
			}
		}
	}
</style>
