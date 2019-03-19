'use strict'
module.exports = app => {
	const mongoose = app.mongoose
	const Schema = mongoose.Schema

	const ProjectSchema = new Schema(
		{
			project: String,
			git: String,
			name: String,
			logs: [ { ref: 'Log', type: Schema.Types.ObjectId } ],
			users: [ { ref: 'User', type: Schema.Types.ObjectId } ],
			dependencies: Object
		},
		{
			versionKey: false,
			timestamps: true
		}
	)
	return mongoose.model('Project', ProjectSchema)
}
