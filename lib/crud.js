var parse = require('url').parse;
var list = require('./list.js');
var items = ['write two poems', 'awesome', 'get some milk!'];

exports.get = function (req, res) {
	var html = list(items);
	res.end(html);
};

exports.post = function (req, res) {
	var item = '';
	req.setEncoding('utf8');
	req.on('data', function (chunk) {
		item += chunk;
	});
	req.on('end', function () {
		items.push(item);
		console.log(items);
		res.end();
	});
};

exports.put = function (req, res) {
	var item = '';
	var pathname = parse(req.url).pathname;
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
};

exports.delete = function (req, res) {
	var pathname = parse(req.url).pathname;
	var i = parseInt(pathname.slice(1), 10);
	var obj = '';

	req.on('data', function (chunk) {
		obj += chunk;
	});
	req.on('end', function () {
		obj = JSON.parse(obj);
		var id = obj.itemId;
		// TODO: Should check to make sure this item exists and that the id is a number
		items.splice(id, 1);
		res.setHeader("Content-Type", "application/json");
		res.statusCode = 200;
		// TODO: Should send the items back to the frontend
		res.end(JSON.stringify({status:'deleted'}));
	});
};
