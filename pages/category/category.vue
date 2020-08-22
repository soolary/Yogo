<template>
	<view class="">
		<SearchLink></SearchLink>
		<view class="content">
			<view class="left">
				<!-- <view class="cate1 active" >大家电</view> -->
				<view class="cate1" :class="{active:index===curIndex}" v-for="(cate1,index) in categoryList" :key="index" @click="selectCate1(index)">
					{{cate1.cat_name}}
				</view>
			</view>
			<scroll-view class="right" scroll-y="true" :scroll-top="scrollTop" @scroll="scroll">
				<view >
					<image class="banner" src="/static/images/titleImage.png" mode=""></image>
					<view class="cate2" v-for="(cate2,index2) in categoryList[curIndex].children" :key="index2">
						<view class="title">
							<text>{{cate2.cat_name}}</text>
						</view>
						<view class="cate3-wrapper">
							<view class="cate3" v-for="(cate3,index3) in cate2.children" :key="index3">
								<image :src="cate3.cat_icon" mode=""></image>
								<view class="">
									{{cate3.cat_name}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import SearchLink from '@/components/SearchLink.vue'
	export default {
		components: {
			SearchLink
		},
		data() {
			return {
				curIndex: 0,
				categoryList: [],
				scrollTop: '',
				oldScrollTop: ''
			}
		},
		onLoad() {
			this.getCateList()
		},
		methods: {
			async getCateList() {
				this.categoryList = await this.$request({
					url: '/api/public/v1/categories'
				})
			},
				scroll(e){
				// console.log(e)
				this.oldScrollTop = e.detail.scrollTop
			},
			selectCate1(index){
				this.scrollTop=this.oldScrollTop
				this.$nextTick(()=>{
					this.scrollTop=0
				})
				this.curIndex=index
			}
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
					color: #eb4450;

					&::before {
						content: '';
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
			flex: 1;
			padding: 20rpx 16rpx 0;
			overflow: scroll;

			.banner{
				width: 520rpx;
				height: 180rpx;
			}

			.cate2 {
				margin-bottom: 40rpx;

				.title {
					text-align: center;
					color: #e0e0e0;
					height: 110rpx;
					line-height: 110rpx;

					text {
						color: #333;
						margin: 0 30rpx;
					}
				}
			}

			.cate3-wrapper {
				display: flex;
				flex-wrap: wrap;

				.cate3 {
					width: 33.33%;
					text-align: center;
					margin-bottom: 20rpx;

					image {
						width: 120rpx;
						height: 120rpx;
					}
				}
			}
		}
	}
</style>
