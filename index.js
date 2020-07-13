var cars = [
  new Car(
    "lambo",
    "cars/car2.png",
    180,
    1.5,
    0.005,
    0.02,
    2,
    45,
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight"
  ),
  new Car(
    "merci",
    "cars/car1.png",
    180,
    1.5,
    0.007,
    0.02,
    2.3,
    48,
    "KeyW",
    "KeyS",
    "KeyA",
    "KeyD"
  ),
];

var racetrack = new raceTrack("field/2420706.jpg");

racetrack.create();

for (var i = 0; i < cars.length; i++) {
  cars[i].create();
}

function gameloop() {
  for (var i = 0; i < cars.length; i++) {
    cars[i].update();
  }
}

setInterval(() => {
  gameloop();
}, 8);
