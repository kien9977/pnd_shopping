'use strict'

require('./../utils/status_code_description.js')()
require('./../utils/password_encryption.js')()
require('./../utils/random_string.js')()

const util = require('util')
const mysql = require('mysql2')
const db = require('./../db.js')

module.exports = {
	login: (req, res) => {
		let resp = {"code": 0, "description": "", "data": {"user_id": 0, "name": "", "token": ""}}
		if(typeof req.body.username !== 'undefined' && typeof req.body.password !== 'undefined') {
			// start asking db for 
			var sql = 'SELECT id, name FROM users WHERE username = ? AND password = ?'

			db.query(sql, [req.body.username, password_encryption(req.body.password)], (err, response, fields) => {
				
				if(err){
					resp.code = 510
					resp.description = status_code_description(resp.code)
					res.json(resp)
				}
				else {
					var result = Object.values(JSON.parse(JSON.stringify(response)));
					if (response.length > 0) {
						// start insert token to database

						var token = random_string(64)
						var sql = 'INSERT INTO token(user_id, token, created_at) VALUES (?, ?, ?)'

						db.query(sql, [response[0].id, token, Math.round(Date.now()/1000)], (err, response) => {
							if(err) {
								resp.code = 510
								resp.description = status_code_description(resp.code)
								res.json(resp)
							}
							else {
								resp.code = 200
								resp.description = status_code_description(resp.code)
								resp.data.user_id = result[0].id
								resp.data.name = result[0].name
								resp.data.token = token
								res.json(resp)
							}
						})
					} 
					else {
						resp.code = 402
						resp.description = status_code_description(resp.code)
						res.json(resp)
					}
				}
			})
		}
		else {
			resp.code = 409
			resp.description = status_code_description(resp.code)
			res.json(resp)
		}
	}


}