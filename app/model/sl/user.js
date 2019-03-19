'use strict'
module.exports = app => {
	const mongoose = app.mongoose
	const Schema = mongoose.Schema

	const SlUserSchema = new Schema(
		{
			name: String,
			cname: String,
			starType: String
		},
		{
			versionKey: false,
			timestamps: true
		}
	)
	return mongoose.model('SlUser', SlUserSchema)
}
