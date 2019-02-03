var fs = require("fs");
var path = require("path");
var http = require("http");
var CodeGen = require("swagger-typescript-codegen").CodeGen;

var args = process.argv.slice(2);

var url = args[0];

http.get(url, function(res) {
	var body = "";

	res.on("data", function(chunk) {
		body += chunk;
	});

	res.on("end", function() {
		var swagger = JSON.parse(body);

		var tsSourceCode = CodeGen.getTypescriptCode({
			className: "ChainService",
			swagger,
			lint: false
		});

		fs.writeFileSync(path.resolve(__dirname, "..", "src", "api", "./swagger-gen.ts"), tsSourceCode);
	});
}).on("error", function(e) {
	console.log("Got an error: ", e);
});
