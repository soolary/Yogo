<template>
	<view>
		<view class="top-header" >
			<view class="header">
				<icon type="search" size="16" color="#bbb"></icon>
				<input type="text" v-model="catName" confirm-type="search" @confirm="search" />
			</view>
			<view class="filter-menu">
				<view class="active">
					综合
				</view>
				<view>销量</view>
				<view>价格</view>
			</view>
		</view>
		<view class="goods-list" >
			<view class="goods" v-for="(item,index) in goodsList" :key="index" @click="toDetail">
				<image :src="item.goods_small_logo" mode=""></image>
				<view class="right">
					<view class="good-name text-line2">
						{{item.goods_name}}
					</view>
					<view class="price">
						￥<text>{{item.goods_price}}</text>.00
					</view>
				</view>
			</view>
		</view>
		<view class="btm-line" v-show="isDown">----到底啦----</view>
	</view>
</template>

<script>
	// 设定一个固定的每页数据量
	const PAGE_SIZE = 6
	export default {
		data() {
			return {
				goodsList: [], // 商品数据
				catName: '', // 接口请求参数
				// pageNum: 1, // 页码
				isDown: false, // 到底了吗
				// isRequseting: false, // 是否请求中
				isScroll: false // 你拉了吗
			}
		},
		onLoad(options) {
			this.pageNum=1
			this.isRequseting=false
			console.log(options)
			this.catName = options.catName
			this.queryGoodsList()
		},
		
		// 上拉事件
		onPageScroll() {
			this.isScroll = true
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.search()
			this.isScroll = false
		},
		// 到底了
		onReachBottom() {
			if (!this.isDown) {
				this.pageNum++
				this.queryGoodsList()
			}
			// this.goodsList.push(...data)
		},
		methods: {
			// 获取数据
			async queryGoodsList() {
				if (this.isRequseting) {
					return
				}
				this.isRequseting = true
				let data = await this.$request({
					url: '/api/public/v1/goods/search',
					data: {
						query: this.catName,
						pagenum: this.pageNum,
						pagesize: PAGE_SIZE
					},
					showLoading:false
				})
				console.log(data.goods)
				uni.stopPullDownRefresh();
				this.isRequseting = false
				this.goodsList = [...this.goodsList, ...data.goods]
				if (data.total <= this.goodsList.length) {
					this.isDown = true
				}
			},
			// 搜索商品
			search() {
				this.pageNum = 1
				this.goodsList = []
				this.queryGoodsList()
				this.isDown = false
			},
			toDetail(){
				wx.navigateTo({
					url:"/pages/goodDetail/goodDetail"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.top-header {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff;

		.header {
			height: 120rpx;
			width: 100%;
			padding: 30rpx 16rpx;
			box-sizing: border-box;
			background-color: #eee;
			position: relative;

			icon {
				position: absolute;
				top: 48rpx;
				left: 44rpx;
			}

			input {
				height: 60rpx;
				width: 100%;
				border-radius: 4rpx;
				background-color: #fff;
				padding-left: 80rpx;
				box-sizing: border-box;
			}
		}


			.filter-menu {
				// padding-top: 120rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 100rpx;

				view.active {
					color: #eb4450;
				}
			}
		}

		.goods-list {
			// margin-top: 220rpx;
		.goods {
			border-top: 1rpx solid #ddd;
			height: 260rpx;
			box-sizing: border-box;
			padding: 0 20rpx;
			display: flex;
			align-items: center;

			image {
				width: 200rpx;
				height: 200rpx;
			}

			.right {
				flex: 1;
				margin-left: 26rpx;

				.good-name {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.price {
					color: #eb4450;
					font-size: 24rpx;
					margin-top: 80rpx;

					text {
						font-size: 36rpx;
					}
				}
			}
		}
	}

	.btm-line {
		text-align: center;
	}
</style>
