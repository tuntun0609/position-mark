// 给layer添加自定义属性

L.Layer.include({
	// 初始化自定义对象属性
	_customData: {},

	// 方法：设置自定义对象
	setValue: function (key, value) {
		// 确保传入的是对象
		if (typeof key !== 'string') {
			console.error('key must be an string')
			return
		}
		this._customData.key = value
	},

	// 方法：获取自定义对象
	getValue: function (key) {
		return this._customData.key
	}
})