'use strict'
require('./../utils/status_code_description.js')()

const mysql = require('mysql2')
const db = require('./../db.js')

module.exports = {
	get: (req, res) => {
		let resp = {"code": 0, "description": "", "data": []}
		let sql = 'SELECT id, product_name, image_metadata, price, sale_price FROM products ORDER BY id desc LIMIT 10'
		db.query(sql, (err, response) => {
			if (err) {
				resp.code = 510
				resp.description = status_code_description(resp.code)
				res.json(resp)
			}
			else {
				resp.code = 200
				resp.description = status_code_description(resp.code)
				for(var i = 0; i < response.length; i++) {
					var image_metadata = JSON.parse(response[i].image_metadata)
					var rchild = {"id": response[i].id, "product_name": response[i].product_name, "photo": image_metadata.preview_img, "price": response[i].price, "sale_price": response[i].sale_price}
					resp.data.push(rchild)
				}
			}
			
			res.json(resp)

		})
		

	},


	detail: (req, res) => {
		let resp = {"code": 0, "description": "", "data": {"id": 0, "product_name": "", "image": {"preview_img": "", "detail_img": []}, "price": 0, "sale_price": 0, "collection_id": 0, "quality": 0, "view_count": 0, "updated_at": 0, "created_at": 0}}
		let sql = 'SELECT * FROM products WHERE id = ?'
		db.query(sql, [req.params.productId], (err, response) => {
			if (err) {
				resp.code = 510
				resp.description = status_code_description(resp.code)
				res.json(resp)
			}
			else {
				resp.code = 200
				resp.description = status_code_description(resp.code)
				
				// handle data
				resp.data.id = response[0].id
				resp.data.product_name = response[0].product_name
				resp.data.price = response[0].price
				resp.data.sale_price = response[0].sale_price
				resp.data.collection_id = response[0].collection_id
				resp.data.quality = response[0].quality
				resp.data.view_count = response[0].view_count
				resp.data.updated_at = response[0].updated_at
				resp.data.created_at = response[0].created_at

				try {
					var image = JSON.parse(response[0].image_metadata)

					resp.data.image.preview_img = image.preview_img
					for (var i = 0; i < image.detail_img.length; i++) {
						resp.data.image.detail_img.push(image.detail_img[i])
					}
				}
				catch (e) {
					console.log(e)
				}
			}
			
			res.json(resp)


		})
	}
}