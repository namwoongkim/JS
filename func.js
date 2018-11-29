var v1 = {
    'val1': 1,
    'val2': 2,
    'val3': 3
};

var v2 = {
    'val1': 10,
    'val2': 50,
    'val3': 100,
    'val4': 25,
};

function sum() {
    var _sum = 0;
    for (var name in this) {
        _sum += this[name];
    }
    return _sum;
}

console.log(sum.apply(v1));
console.log(sum.apply(v2));