'use strict'
require('./../utils/status_code_description.js')()

const mysql = require('mysql2')
const db = require('./../db.js')

module.exports = {
	get: (req, res) => {
		let resp = {"code": 0, "description": "", "data": []}
		let sql = 'SELECT id, product_name, image_metadata, price, sale_price FROM products ORDER BY id desc LIMIT 10'
		db.query(sql, (err, response) => {
			if (err) throw err
			// res.json(response)
			// console.log(response[0].product_name)
			resp.code = 200
			resp.description = status_code_description(resp.code)
			for(var i = 0; i < response.length; i++) {
				var image_metadata = JSON.parse(response[i].image_metadata)
				var rchild = {"id": response[i].id, "product_name": response[i].product_name, "photo": image_metadata.preview_img, "price": response[i].price, "sale_price": response[i].sale_price}
				resp.data.push(rchild)
			}
			res.json(resp)

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