let racetrack = new raceTrack("field/2420706.jpg");
racetrack.create();

const cars = [
  new Car(
    racetrack.raceTrackDOM, //Track DOM
    "lambo", //Name
    "cars/car2.png", //Image
    180, //Initial
    1.55, //Rotational speed
    0.005, //Acceleration
    0.02, //Breake deceleration
    2, //maxSpeed
    45, //Size
    "ArrowUp", //Acceleration key
    "ArrowDown", //Breake key
    "ArrowLeft", //Turn left key
    "ArrowRight" //Turn right key
  ),
  new Car(
    racetrack.raceTrackDOM, //Track DOM
    "merci", //Name
    "cars/car1.png", //Image
    180, //Initial
    1.4, //Rotational speed
    0.008, //Acceleration
    0.025, //Breake deceleration
    2.4, //maxSpeed
    48, //Size
    "KeyW", //Acceleration key
    "KeyS", //Breake key
    "KeyA", //Turn left key
    "KeyD" //Turn right key
  ),
];

for (let i = 0; i < cars.length; i++) {
  cars[i].create();
}

function gameloop() {
  for (let i = 0; i < cars.length; i++) {
    cars[i].update();
  }
}

setInterval(() => {
  gameloop();
}, 8);
