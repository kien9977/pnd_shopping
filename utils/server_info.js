'use strict'

const util = require('util')

module.exports = {
	info: (req, res) => {
		res.json({"name": "AF1", "valid": "true"})
	}
}