<template>
	<view class="">
		<SearchLink></SearchLink>
		<swiper :indicator-dots="true" indicator-active-color="#fff" indicator-color="rgba(255,255,255,.3)" :autoplay="true"
		 :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperdata" :key="index">
				<image :src="item.image_src" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="nav">
			<image v-for="item in catitems" :key="index" :src="item.image_src" mode=""></image>
		</view>
		<view class="floor" v-for="(floor, i) in floordata" :key="i">
			<image :src="floor.floor_title.image_src" mode="" mode=""></image>
			<view class="floor-item">
				<view class="left">
					<image :src="floor.product_list[0].image_src" mode=""></image>
				</view>
				<view class="right">
					<block v-for="(item,index) in floor.product_list" v-if="index" :key="index">
						<image :src="item.image_src" mode=""></image>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SearchLink from '@/components/SearchLink.vue'
	export default {
		data() {
			return {
				swiperdata: [],
				catitems: [],
				floordata: []
			}
		},
		components:{
			SearchLink
		},
		onLoad() {
			this.getSwiperdata()
			this.getCatitem()
			this.getFloordata()
		},
		methods: {
			async getSwiperdata() {
				let data = await this.$request({
					url: "/api/public/v1/home/swiperdata"
				})
				this.swiperdata = data
			},
			async getCatitem() {
				let data = await this.$request({
					url: "/api/public/v1/home/catitems"
				})
				this.catitems = data
			},
			async getFloordata() {
				let data = await this.$request({
					url: "/api/public/v1/home/floordata"
				})
				this.floordata = data
			}
		}
	}
</script>

<style lang="less">
	

	swiper {
		height: 340rpx;

		image {
			height: 340rpx;
			width: 100%;
		}
	}

	.nav {
		display: flex;
		height: 194rpx;
		justify-content: space-around;
		align-items: center;
		border: 1px solid #ccc;

		image {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor {
		padding: 20rpx 17rpx 0;

		>image {
			height: 88rpx;
			width: 100%;
		}

		.floor-item {
			display: flex;

			.left {
				image {
					width: 232rpx;
					height: 386rpx;
				}
			}

			.right {
				flex: 1;

				image {
					margin: 0 0 10rpx 10rpx;
					width: 232rpx;
					height: 188rpx;
				}
			}
		}
	}
</style>
