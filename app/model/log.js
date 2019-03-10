'use strict'
module.exports = app => {
	const mongoose = app.mongoose
	const Schema = mongoose.Schema

	const LogSchema = new Schema({
		type: String,
		env: String,
		data: Schema.Types.Mixed,
		date: { type: Date, default: Date.now }
	})
	LogSchema.index({
		'data.script': 1
	})
	LogSchema.index({
		'data.user': 1
	})
	LogSchema.index({
		'data.context.node': 1
	})
	LogSchema.index({
		'data.context.project': 1
	})
	LogSchema.index({
		'data.context.sl.version': 1
	})
	LogSchema.statics.findByTimeRange = async function(args, timeRange = [], dateKey) {
		const isRange = timeRange.indexOf(null)
		const [ startTime, endTime ] = timeRange
		// 时间范围
		if (isRange === -1) {
			return await this.find(args).where(dateKey).lt(endTime).where(dateKey).gt(startTime)
		}
		// 没有输入
		if (startTime === null && endTime === null) {
			return await this.find(args)
		}
		// 截止时间
		if (isRange === 0) {
			return await this.find(args).where(dateKey).lt(endTime)
		}
		//  起始时间
		if (isRange === 1) {
			return await this.find(args).where(dateKey).gt(startTime)
		}
	}
	return mongoose.model('Log', LogSchema)
}
