<template>
	<view class="wrapper">

		<swiper class="swiper" indicator-dots autoplay circular indicator-color="#ccc" indicator-active-color="#fff">
			<block v-for="(item, index) in goodInfo.pics" :key="index">
				<swiper-item>
					<image class="swiper-img" :src="item.pics_big" @click="showImg(index)"></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info" v-if="goodInfo">
			<view class="price">￥{{goodInfo.goods_price}}</view>
			<view class="name-favo">
				<view class="name">{{goodInfo.goods_name}}</view>
				<view class=favo>
					<text class="iconfont iconshare"></text>
					<text>分享</text>
					<button open-type="share">
						分享
					</button>
				</view>
			</view>
			<view class="express">快递: 免运费</view>
		</view>
		<view class="promote">
			<view>
				<text class="name">促销</text>
				<text class="detail">满300减30元</text>
			</view>
			<view class="brother">
				<text class="name">已选</text>
				<text class="detail gray">黑色/S/1件</text>
			</view>
		</view>
		<!-- 图文介绍 -->
		<view class="goods-detail">
			<view class="tabs">
				<text class="active">图文介绍</text>
				<text>规格参数</text>
			</view>
			<view class="main">
				<view v-html="goodInfo.goods_introduce"></view>
				<view v-show="false">商品参数</view>
			</view>
		</view>
		<view class="fixed-bottom">
			<view class="icon-text">
				<text class="iconfont iconkefu"></text>
				<text>联系客服</text>
				<button open-type="contact">客服</button>
			</view>
			<view class="icon-text">
				<text class="iconfont iconicon4"></text>
				<text>购物车</text>
			</view>
			<view class="btn add-cart-btn">加入购物车</view>
			<view class="btn buy-btn">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodInfo: '',
				goodImages: []
			}
		},
		onLoad(options) {
			// console.log(options)
			this.getGoodDetail(options.goodsId)
		},
		// 分享
		onShareAppMessage() {
			return {
				title: '一拳一个嘤嘤怪',
				path: '',
				imageUrl: 'http://soolar.oss-cn-hangzhou.aliyuncs.com/0.jpg'
			}
		},
		methods: {
			// 获取商品信息
			async getGoodDetail(id) {
				this.goodInfo = await this.$request({
					url: '/api/public/v1/goods/detail?goods_id=' + id,
				})
				console.log(this.goodInfo)
			},
			// 预览图片
			showImg(index) {
				this.goodImages = this.goodInfo.pics.map(item => item.pics_big)
				uni.previewImage({
					current: index,
					urls: this.goodImages
				})
			}
		}
	}
</script>
<style lang="less">
	.iconfont {
		font-size: 40rpx;
	}

	.wrapper {
		background-color: #f4f4f4;
		padding-bottom: 98rpx;
	}

	.swiper {
		height: 720rpx;
	}

	.swiper-img {
		width: 100%;
		height: 720rpx;
	}

	.goods-info {
		padding: 40rpx 0 30rpx 20rpx;
		background-color: #fff;

		.price {
			color: #eb4450;
			font-size: 40rpx;
		}

		.name-favo {
			display: flex;
			height: 78rpx;
			margin-top: 14rpx;

			.name {
				color: #333;
				flex: 1;
				font-size: 28rpx;
				padding-right: 78rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; // 控制多行的行数
				-webkit-box-orient: vertical;
			}

			.favo {
				border-left: 1px solid #ddd;
				width: 144rpx;
				color: #999;
				font-size: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;

				button {
					position: absolute;
					opacity: 0;
				}
			}
		}

		.express {
			color: #999;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
	}

	.promote {
		margin-top: 20rpx;

		view {
			background-color: #fff;
			height: 96rpx;
			line-height: 96rpx;
			font-size: 28rpx;
			margin-top: 20rpx;
			padding-left: 20rpx;

			&.brother {
				margin-top: 0;
			}

			.name {
				color: #404040;
			}

			.detail {
				color: #ff4055;
				margin-left: 40rpx;

				&.gray {
					color: #dfdfdf;
				}
			}
		}
	}

	.goods-detail {
		margin-top: 20rpx;
		background-color: #fff;

		.tabs {
			display: flex;

			text {
				flex: 1;
				text-align: center;
				color: #404040;
				font-size: 22rpx;
				height: 100rpx;
				line-height: 100rpx;
				box-sizing: border-box;

				&.active {
					color: #ff4055;
					border-bottom: 10rpx solid #ff2644;
				}
			}
		}
	}

	.fixed-bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 98rpx;
		display: flex;
		background-color: #fff;

		.icon-text {
			flex: 2;
			font-size: 20rpx;
			color: #404040;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;

			button {
				position: absolute;
				opacity: 0;
			}
		}

		.btn {
			flex: 3;
			color: #fff;
			text-align: center;
			line-height: 98rpx;

			&.add-cart-btn {
				background-color: #ffb400;
			}

			&.buy-btn {
				background-color: #ff2d4a;
			}
		}
	}
</style>
