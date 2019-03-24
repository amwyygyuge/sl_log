'use strict'
module.exports = app => {
	const mongoose = app.mongoose
	const Schema = mongoose.Schema

	const SlProjectSchema = new Schema(
		{
			name: String,
			cname: String,
			info: String,
			pak: Schema.Types.Mixed,
			group: String,
			type: String,
			build: String,
			level: String,
			dev: String,
			hub: String,
			evn: String,
			machine: Schema.Types.Mixed,
			prod: String,
			isSL: Boolean
		},
		{
			versionKey: false,
			timestamps: true
		}
	)
	return mongoose.model('SlProject', SlProjectSchema)
}
