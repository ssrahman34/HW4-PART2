

var finder = http.createServer(readJson);
// fill in YOUR port number!
finder.listen("53974");

function readJson{
var fs = require('fs');
function loadImageList () {
	var data = fs.readFileSync('6whs.json');
		if (! data) {
	    		console.log("cannot read the .json");
		} else {
	    		listObj = JSON.parse(data);
	    		function addDB(listObj){

			}//addes Json Data to DB
		}
}//loadImage
}//readJson
