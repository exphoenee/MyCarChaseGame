class Car {
  constructor(
    raceTrack,
    name,
    image,
    imageAngle,
    steering,
    acceleration,
    breake,
    maxSpeed,
    size,
    accKey,
    breakeKey,
    turnLeftKey,
    turnRightKey
  ) {
    this.trackDOM = raceTrack;
    this.raceTrackHeight = raceTrack.clientHeight;
    this.raceTrackWidth = raceTrack.clientWidth;
    this.trackY = this.trackDOM.offsetTop;
    this.trackX = this.trackDOM.offsetLeft;
    this.carDOM = null;
    this.dashBoradDOM = null;
    this.hitBox = [];
    this.hitBoxChoords = [];
    this.name = name;
    this.image = image;
    this.imageAngle = imageAngle;
    this.steeringSpeed = steering;
    this.acceleration = acceleration;
    this.carBreake = breake;
    this.accX = 0;
    this.accY = 0;
    this.maxSpeed = maxSpeed;
    this.size = size;
    this.direction = 0;
    this.positionX = 0;
    this.positionY = 0;
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.controlKeys = [accKey, breakeKey, turnLeftKey, turnRightKey];
    this.controlPressed = [false, false, false, false];
  }

  calcX(value) {
    return value * Math.cos((this.direction / 180) * Math.PI);
  }

  calcY(value) {
    return value * Math.sin((this.direction / 180) * Math.PI);
  }

  calcRes(valueX, valueY) {
    return Math.sqrt(Math.pow(valueX, 2) + Math.pow(valueY, 2));
  }

  accelerate() {
    this.speed = this.speed + this.acceleration;

    this.speed > this.maxSpeed
      ? (this.speed = this.maxSpeed)
      : this.speed < 0
      ? (this.speed = this.speed + this.carBreake)
      : (this.speed = this.speed);
  }

  accelerateold() {
    this.speed = this.speed + this.acceleration;

    this.speed > this.maxSpeed
      ? (this.speed = this.maxSpeed)
      : this.speed < 0
      ? (this.speed = this.speed + this.carBreake)
      : (this.speed = this.speed);
  }

  breake() {
    this.speed > 0 / 2
      ? (this.speed = this.speed - this.carBreake)
      : this.speed < 0
      ? (this.speed = this.speed - this.acceleration * 0.7)
      : (this.speed = this.speed);
  }

  friction() {
    this.speed = (this.speed * (1 - this.acceleration * 1.5)) / 1;
    if (Math.abs(this.speed) < this.acceleration) {
      this.speed = 0;
    }
  }

  spriteRotate() {
    this.carDOM.style.webkitTransform = "rotate(" + this.direction + "deg)";
    this.carDOM.style.mozTransform = "rotate(" + this.direction + "deg)";
    this.carDOM.style.msTransform = "rotate(" + this.direction + "deg)";
    this.carDOM.style.oTransform = "rotate(" + this.direction + "deg)";
    this.carDOM.style.transform = "rotate(" + this.direction + "deg)";
  }

  wrapAngle(angle) {
    angle > 360
      ? (angle = angle - 360)
      : angle < 0
      ? (angle = angle + 360)
      : angle;
    return angle;
  }

  turn(direction) {
    if (this.speed !== 0) {
      var relativeSpeed = this.speed / this.maxSpeed;
      this.direction =
        this.direction + direction * this.steeringSpeed * relativeSpeed;
      this.direction = this.wrapAngle(this.direction);
    }
  }

  setPosition() {
    this.trackX = this.trackDOM.offsetLeft;
    this.trackY = this.trackDOM.offsetTop;
    let xInc = this.calcX(this.speed);
    let yInc = this.calcY(this.speed);

    this.positionX = this.positionX + xInc;
    this.positionY = this.positionY + yInc;

    this.carDOM.style.left =
      (this.raceTrackWidth - this.size) / 2 -
      this.positionX +
      this.trackX +
      "px";
    this.carDOM.style.top =
      (this.raceTrackHeight - this.size) / 2 -
      this.positionY +
      this.trackY +
      "px";
  }

  createHitBoxs() {
    let hitBoxNames = [
      "hitbox-topright",
      "hitbox-toplef",
      "hitbox-bottomright",
      "hitbox-bottomleft",
    ];

    let hitBoxSize = 5;

    let hitboxCorrection = [
      [this.size / 6 + hitBoxSize / 2, hitBoxSize / 2],
      [-this.size / 6 + hitBoxSize, hitBoxSize / 2],
      [this.size / 6 + hitBoxSize / 2, this.size - hitBoxSize],
      [-this.size / 6 + hitBoxSize, this.size - hitBoxSize],
    ];

    hitBoxNames.forEach((key, i) => {
      this.hitBox[i] = document.createElement("div");
      this.hitBox[i].classList.add(hitBoxNames[i]);
      this.hitBox[i].id = hitBoxNames[i] + "-" + this.name;
      this.hitBox[i].style.position = "absolute";
      this.hitBox[i].style.top = this.size / 2 - hitboxCorrection[i][0] + "px";
      this.hitBox[i].style.left = 0 + hitboxCorrection[i][1] + "px";
      this.hitBox[i].style.height = hitBoxSize + "px";
      this.hitBox[i].style.width = hitBoxSize + "px";
      this.hitBox[i].style.backgroundColor = "white";
      this.hitBox[i].style.border = "1px solid black";
      document.getElementById(this.name).appendChild(this.hitBox[i]);
    });
  }

  calculatehitBox() {}

  collisionDetection() {}

  control() {
    /* itt az if-en belül miért nem férek hozzá az objektumomhoz? */
    var keyPressed = this.controlPressed;

    this.controlKeys.forEach((key, i) => {
      document.addEventListener("keydown", (event) => {
        if (event.code == key) {
          keyPressed[i] = true;
        }
      });
      document.addEventListener("keyup", (event) => {
        if (event.code == key) {
          keyPressed[i] = false;
        }
      });
    });
    this.controlPressed = keyPressed;
  }

  updateCar() {
    this.controlPressed[0]
      ? this.accelerate()
      : this.controlPressed[1]
      ? this.breake()
      : this.friction();

    if (this.controlPressed[2]) {
      this.turn(-1);
    }
    if (this.controlPressed[3]) {
      this.turn(1);
    }

    this.setPosition();
    this.spriteRotate();
    this.calculatehitBox();
  }

  updateDashboard() {
    this.dashBoradDOM.innerHTML = "Speed:" + Math.round((this.speed / 2) * 220);
    this.dashBoradDOM.innerHTML +=
      "\r" + "Direction:" + Math.round(this.direction);
    this.dashBoradDOM.innerHTML += "\r" + "PosX: " + Math.round(this.positionX);
    this.dashBoradDOM.innerHTML += "\r" + "PosY: " + Math.round(this.positionY);
  }

  update() {
    this.updateCar();
    this.updateDashboard();
  }

  createCar() {
    this.carDOM = document.createElement("div");

    /* a facé nem érem el a racetrack DOM-ját az objektumon keresztül. */
    //this.trackDOM = document.getElementById('racetrack');

    this.carDOM.classList.add("car");
    this.carDOM.id = this.name;
    this.carDOM.style.height = this.size + "px";
    this.carDOM.style.width = this.size + "px";
    this.carDOM.style.position = "fixed";
    this.carDOM.style.backgroundImage = "url(" + this.image + ")";
    this.carDOM.style.backgroundPosition = "center center";
    this.carDOM.style.backgroundSize = "contain";
    this.carDOM.style.backgroundRepeat = "no-repeat";
    document.getElementById("racetrack").appendChild(this.carDOM);
  }

  crateDashBoard() {
    this.dashBoradDOM = document.createElement("div");
    this.dashBoradDOM.classList.add("dashBoard");
    this.dashBoradDOM.id = "DB-" + this.name;
    this.dashBoradDOM.style.height = 20 + "px";
    this.dashBoradDOM.style.color = "white";
    this.dashBoradDOM.style.paddingLeft = 5 + "px";
    this.dashBoradDOM.style.paddingTop = 5 + "px";
    document.getElementById("racetrack").appendChild(this.dashBoradDOM);
  }

  create() {
    if (!this.carDOM) {
      this.createCar();
      this.crateDashBoard();
      this.control();
      this.createHitBoxs();
    }
  }
}
