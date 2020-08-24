const BASE_URL = "https://api-ugo-dev.itheima.net"

function request({
	url,
	data,
	showLoading = true
}) {
	// const BASE_URL="https://www.uinav.com"
	return new Promise((resolve, reject) => {
		if (showLoading) {
			uni.showLoading({
				mask: false,
				title: '乌拉'
			})
		}
		uni.request({
			url: BASE_URL + url,
			data: data,
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
export {
	request
}
