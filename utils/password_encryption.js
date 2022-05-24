var md5 = require('md5');

module.exports = function() { 
	this.password_encryption =  function(password) {
		return md5(password);
	}
}