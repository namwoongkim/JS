var arr = [];
for(var i = 0; i < 5; i++) {
	arr[i] = function() {
		return i;
	}();
}

for (var index in arr) {
	console.log(arr[index]);
}