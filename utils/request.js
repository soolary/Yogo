// const BASE_URL = "https://api-ugo-dev.ithema.net"

function request({
	url,
	data,
	methods,
	showLoading = true
}) {
	const BASE_URL="https://www.uinav.com"
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
			methods,
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
