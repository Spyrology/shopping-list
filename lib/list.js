module.exports = function list(items) {
	var html = '<!doctype html>';
	html += '<html lang="en">';
	html += '<head>';
	html += '<meta charset="UTF-8">';
	html += '<title>Carpe Diem</title>';
	html += '<link type="text/css" rel="stylesheet" href="styles/reset.css">';
	html += '<link type="text/css" rel="stylesheet" href="styles/style.css">';
	html += '<link type="text/css" rel="stylesheet" href="styles/animate.css">';
	html += '<link href="https://fonts.googleapis.com/css?family=Orbitron" rel="stylesheet" type="text/css">';
	html += '<script src="https://code.jquery.com/jquery.min.js"></script>';
	html += '<script src="jquery-ui/jquery-ui.js"></script>';
	html += '<script src="js/app.js"></script>';
	html += '</head>';
	html += '<body>';
	html += '<div id="wrapper">';
	html += '<header>Today, I will...</header>';
	html += '<section>';
	html += '<form>';
	html += '<input id="add" type="text" maxlength="22" placeholder="design my next app." required="" autocomplete="off">';
	html += '</form>';
	html += '</section>';
	html += '<section>';
	html += '<ul id="list">';

	for(var i = 0; i < items.length; i++) {
		html += '<li class="item-added" data-id=' + i + '>' + items[i];
		html += '<div class="delete"><span>&#x2717</span></div>';
		html += '<div class="check"><span>&#x2713</span></div>';
		html += '</li>';
	}

	html += '</ul>';
	html += '</section>';
	html += '</div>';
	html += '</body>';
	html += '</html>';

	return html;
};
