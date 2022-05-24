module.exports = function() { 
	this.status_code_description =  function(code) {
		if(code == 200) {
			return "OK";
		}
		else if(code == 401) {
			return "Required auth";
		}
		else if(code == 402) {
			return "Auth failed";
		}
		else if(code == 403) {
			return "Forbidden";
		}
		else if(code == 404) {
			return "Not found";
		}
		else if(code == 407) {
			return "Username on use";
		}
		else if(code == 408) {
			return "Login failed";
		}
		else if(code == 409) {
			return "Some required field are blank";
		}
		else if(code == 410) {
			return "Invalid value in some field";
		}
		else if(code == 510) {
			return "SQL Server error";
		}
		else {
			return "Unknown";
		}
	}
	
}