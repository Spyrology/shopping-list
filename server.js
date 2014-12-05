var http = require('http');
var url = require('url');
var items = [];
var root = __dirname;
var join = require('path').join;
var fs = require('fs');
var parse = require('url').parse;
var qs = require('querystring');
var html = '<!doctype html>' +
'<html lang="en">' +
'<head>' +
	'<meta charset="UTF-8">' +
	'<title>Carpe Diem</title>' +

	'<!--styles-->' +
	'<link type="text/css" rel="stylesheet" href="styles/reset.css">' +
	'<link type="text/css" rel="stylesheet" href="styles/style.css">' +
	'<link type="text/css" rel="stylesheet" href="styles/animate.css">' +
	'<link href="https://fonts.googleapis.com/css?family=Orbitron" rel="stylesheet" type="text/css">' +

	'<!--scripts-->' +
	'<script src="https://code.jquery.com/jquery.min.js"></script>' +
	'<script src="jquery-ui/jquery-ui.js"></script>' +
	'<script src="js/app.js"></script>' +
'</head>' +
'<body>' +
	'<div id="wrapper">' +
		'<header>Today, I will...</header>' +
			'<section>' +
				'<form action="/" method="post">' +
					'<input id="add" type="text" maxlength="22" placeholder="design my next app." required="" autocomplete="off">' +
				'</form>' +
			'</section>' +
		'<section>' +
			'<ul id="list">' +
				'<li class="item-added">write a poem' +
					'<div class="delete"><span>&#x2717</span></div>' +
					'<div class="check"><span>&#x2713</span></div>' +
				'</li>' +
				'<li class="item-added">drag me' +
					'<div class="delete"><span>&#x2717</span></div>' +
					'<div class="check"><span>&#x2713</span></div>' +
				'</li>' +
			'</ul>' +
		'</section>' +
	'</div>' +
'</body>' +
'</html>'

var server = http.createServer(function (req, res) {
	if(req.url == '/') {
		switch (req.method) {
			case 'POST':
				var item = '';
				req.setEncoding('utf8');
				req.on('data', function (chunk) {
					item += chunk;
				});
				req.on('end', function () {
					var obj = qs.parse(item);
					items.push(item);
					res.end('Item added\n');
				});
				break;
			case 'GET':
				res.write(html);
				res.end();
				break;
			case 'DELETE':
				var pathname = url.parse(req.url).pathname;
				var i = parseInt(pathname.slice(1), 10);

				if (isNaN(i)) {
					res.statusCode = 400;
					res.end('Item id not valid');
				}
				else if (!items[i]) {
					res.statusCode = 404;
					res.end('Item not found');
				}
				else {
					items.splice(i, 1);
					res.end('Item deleted successfully');
				}
				break;
			case 'PUT':
				var item = '';
				var pathname = url.parse(req.url).pathname;
				var i = parseInt(pathname.slice(1), 10);

				if (isNaN(i)) {
					res.statusCode = 400;
					res.end('Item id not valid');
				}
				else if (!items[i]) {
					res.statusCode = 404;
					res.end('Item id not found');
				}
				else {
					req.on('data', function (chunk) {
						item += chunk;
					});
					req.on('end', function () {
						items.splice(i, 1, item);
						res.end('Item updated successfully');
					});
				}
				break;
		}
	}

	var url = parse(req.url);
	var path = join(root, url.pathname);
	var stream = fs.createReadStream(path);
	//res.setHeader('Content-length', 'text/html');
	stream.pipe(res);
	stream.on('error', function (err) {
		res.statusCode = 500;
		res.end('Internal Server Error');
	});
});

server.listen(9000, function() {
	console.log('listening on 9000');
});

