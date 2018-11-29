function Vehicle(name, speed) {
    this.name = name;
    this.speed = speed;
}

Vehicle.prototype.drive = function () {
    console.log(this.name + ' runs at ' + this.speed + 'Km/h.');
};

var lambo = new Vehicle('Lamborghini', 320);
lambo.drive();

function Sedan(name, speed, maxSpeed) {
    Vehicle.apply(this, arguments);
    this.maxSpeed = maxSpeed;
}

Sedan.prototype = Object.create(Vehicle.prototype);
Sedan.prototype.constructor = Sedan;
Sedan.prototype.boost = function () {
    console.log(this.name + ' boosts its speed at ' + this.maxSpeed + 'Km/h.');
};

var orlando = new Sedan('Orlando', 100, 230);
orlando.drive();
orlando.boost();