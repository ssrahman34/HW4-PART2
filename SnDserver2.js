var http  = require("http");
var staticServer = require("node-static");
var fileServer = new staticServer.Server("./public");

/* Initialize global array that will contain all photo names*/
imgList = [];
imgListLoaded = false;

// like a callback
function sendFiles (request, response) {
    var url = request.url;
    
    if (url.split("/")[1].search("testWHS") == -1 && url.search("query") == -1) {
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write("<!DOCTYPE html><html><body><h1>404 Error</h1><p>Page not found.</p></body></html>");
	response.end();
	console.log("This is the value of url:");
	console.log(url);
    }

    // Handling client-side queries
    else if (url.search("query") != -1) {
	// Parse query
	var query_arr = url.split("=");
	var num = query_arr[1];
	console.log("Browser requested " + num);

	if (Number(num) > 990 || Number(num) < 1 || isNaN(Number(num))) {
	    console.log("Invalid input!");
	    response.writeHead(404, {"Content-Type": "text/plain"});
	    response.write("Invalid input");
	    response.end();
	}
	
	else {
	    console.log("Returning: " + imgList[Number(num)]);
	    console.log(imgListLoaded);
	    response.writeHead(200, {"Content-Type": "text/plain"});
	    response.write(imgList[Number(num)]);
	    response.end();

	}
    }
    
    else {
	request.addListener('end', findFile).resume();
    }

    function findFile() {
	// dynamic query part
	console.log("Serving files...");

	// Fill up imgList before serving HTML file
	// Not necessary to do this before serving files but makes for a cleaner flow
	if (imgListLoaded == false) {
	    fillUpImageList();
	    imgListLoaded = true;
	    testFillUp(imgList);
	    
	    function testFillUp(imgList) {
		console.log("Testing fill up of imgList...")
		console.log(imgList[25]);
	    }
	}

	fileServer.serve(request, response, function(err, result) {
	    if (err) {
		console.error("Error! " + err.message);
	    }

	    else {
		console.log("Success: " + request.url + " " + response.message);
	    }
	});
    }
}

var finder = http.createServer(sendFiles);

// fill in YOUR port number!
finder.listen("55899");

/* This function fills up the global variable imgList[] with the JSON file of photo names */
function fillUpImageList() {
    // global variables
    var fs = require('fs');  // file access module

    // code run on startup
    loadImageList();

    // just for testing, you can cut this out
    console.log(imgList[354]);

    function loadImageList () {
	var data = fs.readFileSync('photoList.json');
	if (! data) {
	    console.log("cannot read photoList.json");
	} else {
	    listObj = JSON.parse(data);
	    imgList = listObj.photoURLs;
	}
    }
}


