'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db.js')

module.exports = {
	get: (req, res) => {
		let sql = 'SELECT * FROM products ORDER BY id desc LIMIT 10'
		db.query(sql, (err, response) => {
			if (err) throw err
			res.json(response)
		})
	},
	detail: (req, res) => {
		let sql = 'SELECT * FROM products WHERE id = ?'
		db.query(sql, [req.params.productId], (err, response) => {
			if (err) throw err
			res.json(response[0])
		})
	}
}