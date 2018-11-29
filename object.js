var zero = {
    firstName: 'Zero',
    lastName: 'Cho',
    body: {
        height: 173,
        weight: 70,
        fingers: {
            f1: 34,
            f2: 68
        }
    }
};

console.log(zero.firstName);
console.log(zero.lastName);
console.log(zero.body.height);
console.log(zero.body.fingers.f2);

//delete zero.body.height;
console.log(zero);