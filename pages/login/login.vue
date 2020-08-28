<template>
	<view class="login">
		<button open-type="getUserInfo" @getuserinfo="wxLogin">点我登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			wxLogin(userInfoRes) {
				this.userInfo = userInfoRes.detail
				const {
					encryptedData,
					iv,
					rawData,
					signature
				} = this.userInfo
				uni.login({
					success: async loginRes => {
						let code = loginRes.code
						let data = await this.$request({
							url: '/api/public/v1/users/wxlogin',
							method: 'post',
							data: {
								code,
								encryptedData,
								iv,
								rawData,
								signature
							}
						})
						console.log(data)
					}
				})
			}
		}
	}
</script>

<style>
</style>
