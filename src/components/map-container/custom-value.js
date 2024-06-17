// 给layer添加自定义属性

L.Layer.addInitHook(function () {
	// 初始化自定义对象属性
	this._customData = {};

	// 方法：设置自定义对象
	this.setValue = function (key, value) {
		// 确保传入的是对象
		if (typeof key !== 'string') {
			console.error('key must be an string')
			return this
		}
		this._customData.key = value
		return this
	},

		// 方法：获取自定义对象
		this.getValue = function (key) {
			return this._customData.key
		}
})