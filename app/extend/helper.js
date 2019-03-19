const isObjectId = string => /\w{24}/.test(string)
const isNumber = string => !/\D/.test(string)

const useReg = value => {
	if (typeof value === 'string' && !isObjectId(value) && !isNumber(value)) {
		return true
	}
}

module.exports = {
	resolveQuery: data => {
		const conditions = {},
			options = { sort: 'desc' }
		if (typeof data === 'object') {
			if (data.pagination) {
				const { current_page, page_size } = data.pagination
				options.skip = (current_page - 1) * page_size
				options.limit = page_size
				delete data.pagination
			}
			delete data.pagination
			Object.keys(data).forEach(key => {
				if (data[key] === undefined || data[key] === '') return
				if (data[key] instanceof Date) {
					if (key.search(/start/i) !== -1) {
						conditions[key] = { $gt: data[key].getTime() }
						return
					}
					if (key.search(/end/i) !== -1) {
						conditions[key] = { $lt: data[key].getTime() }
						return
					}
				}
				if (useReg(data[key])) {
					conditions[key] = new RegExp(data[key])
					return
				}
				conditions[key] = data[key]
			})
		}
		return { conditions, options }
	},
	filterObject: obj => {
		const _obj = {}
		Object.keys(obj).forEach(key => {
			if (obj[key] !== null && obj[key] !== undefined) {
				_obj[key] = obj[key]
			}
		})
		return _obj
	}
}
