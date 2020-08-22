function request(options) {
	const BASE_URL="https://api-ugo-dev.itheima.net"
	return new Promise((resolve, reject) => {
		uni.showLoading({
			mask:false,
			title:'乌拉'
		})
		uni.request({
			url: BASE_URL+options.url,
			data:options.data,
			success: res => {
				let {
					meta,
					message
				} = res.data
				if (meta.status === 200) {
					resolve(message)
				}
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}
export {request}
