var fs = require("fs");
var path = require("path");
var http = require("http");
var { transform, camelCase } = require("lodash");
var CodeGen = require("swagger-taxos-codegen").CodeGen;

var args = process.argv.slice(2);

var url = args[0];

http.get(url, function (res) {
	var body = "";

	res.on("data", function (chunk) {
		body += chunk;
	});

	res.on("end", function () {
		var swagger = JSON.parse(body);

		var tsSourceCode = CodeGen.generateCode({
			className: "APIService",
			swagger,
			lint: false,
			// Fix for controllers without name
			getMethodName: (op, httpVerb, path) => {
				const cleanPath = path.replace(/\/$/, "");

				let segments = cleanPath.split("/").slice(1);
				segments = transform(segments, (result, segment) => {
					if (segment[0] === "{" && segment[segment.length - 1] === "}") {
						segment = `by${segment[1].toUpperCase()}${segment.substring(
							2,
							segment.length - 1
						)}`;
					}
					result.push(segment);
				});

				const result = camelCase(segments.join("-"));

				if (!result || (result && !result.length)) {
					return `${httpVerb.toLowerCase()}Index`;
				}

				return `${httpVerb.toLowerCase()}${result[0].toUpperCase()}${result.substring(1)}`;
			}
		});

		fs.writeFileSync(
			path.resolve(__dirname, "..", "src", "api", "swagger", "./swagger-gen.ts"),
			tsSourceCode
		);
	});
}).on("error", function (e) {
	console.log("Got an error: ", e);
});
