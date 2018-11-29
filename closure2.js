function outter() {
	var title = 'Hello, World!';
	return function() {
		console.log(title);
	}
}

var inner = outter();
inner();