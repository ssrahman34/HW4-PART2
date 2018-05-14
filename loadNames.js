

//var finder = http.createServer(readJson);
// fill in YOUR port number!
//finder.listen("53974");

function readJson(){
var fs = require('fs');
function loadImageList () {
	var data = fs.readFileSync('6whs.json');
		if (! data) {
	    		console.log("cannot read the .json");
		} else {
	    		listObj = JSON.parse(data);
			console.log(listObj);
	    		function addDB(listObj){
				for (int i = 1; i <= listObj.length; i++){
					/*http.get(listObj[i][2], function (response) {
				  		var chunks = [];
  						response.on('data', function (chunk) {
    							chunks.push(chunk);
  						}).on('end', function() {
    							var buffer = Buffer.concat(chunks);
    							console.log(sizeOf(buffer));
  						});
					}); */	
					//To-do: get width and height.
					INSERT INTO photoTags VALUES(i, listObj[i], 0,0,"","");
				}
			}//addes Json Data to DB
		}
}//loadImage
}//readJson
