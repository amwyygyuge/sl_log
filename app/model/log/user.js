'use strict'
module.exports = app => {
	const mongoose = app.mongoose
	const Schema = mongoose.Schema

	const UserSchema = new Schema(
		{
			email: String,
			name: String,
			cname: {
				type: String,
				default: '未知'
			},
			projects: [ { ref: 'Project', type: Schema.Types.ObjectId } ],
			os: Object,
			sl: Object,
			node: String,
			logs: [ { ref: 'Log', type: Schema.Types.ObjectId } ]
		},
		{
			versionKey: false,
			timestamps: true
		}
	)
	return mongoose.model('User', UserSchema)
}
