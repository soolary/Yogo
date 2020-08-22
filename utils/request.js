function request(options) {
	const BASE_URL="http://www.uinav.com"
	return new Promise((resolve, reject) => {
		uni.showLoading({
			mask:false,
			title:''
		})
		uni.request({
			url: BASE_URL+options.url,
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
