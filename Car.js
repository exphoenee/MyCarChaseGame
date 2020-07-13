class Car {
  constructor(
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
    this.carDOM = null;
    this.dashBoradDOM = null;
    this.name = name;
    this.image = image;
    this.imageAngle = imageAngle;
    this.steeringSpeed = steering;
    this.acceleration = acceleration;
    this.carBreake = breake;
    this.maxSpeed = maxSpeed;
    this.size = size;
    this.direction = 0;
    this.positionX = 0;
    this.positionY = 0;
    this.speed = 0;
    this.controlKeys = [accKey, breakeKey, turnLeftKey, turnRightKey];
    this.controlPressed = [false, false, false, false];
  }

  accelerate() {
    this.speed = this.speed + this.acceleration;
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < 0) {
      this.speed = this.speed + this.carBreake;
    }
  }

  breake() {
    if (this.speed > 0 / 2) {
      this.speed = this.speed - this.carBreake;
    }
    if (this.speed < 0) {
      this.speed = this.speed - this.acceleration * 0.7;
    }
  }

  friction() {
    this.speed = (this.speed * (1 - this.acceleration * 1.5)) / 1;
    if (Math.abs(this.speed) < this.acceleration) {
      this.speed = 0;
    }
  }

  spriteRotate(angle) {
    this.carDOM.style.webkitTransform = "rotate(" + angle + "deg)";
    this.carDOM.style.mozTransform = "rotate(" + angle + "deg)";
    this.carDOM.style.msTransform = "rotate(" + angle + "deg)";
    this.carDOM.style.oTransform = "rotate(" + angle + "deg)";
    this.carDOM.style.transform = "rotate(" + angle + "deg)";
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
    var xInc = this.speed * Math.cos((this.direction / 180) * Math.PI);
    var yInc = this.speed * Math.sin((this.direction / 180) * Math.PI);
    this.positionX = this.positionX + xInc;
    this.positionY = this.positionY + yInc;

    this.carDOM.style.left =
      (window.innerWidth - this.size) / 2 - this.positionX + "px";
    this.carDOM.style.top =
      (window.innerHeight - this.size) / 2 - this.positionY + "px";
  }

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

  update() {
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
    this.spriteRotate(this.direction);
    this.dashBoradDOM.innerHTML = this.speed;
  }

  createCar() {
    this.carDOM = document.createElement("div");
    this.carDOM.classList.add("car");
    this.carDOM.id = this.name;
    this.carDOM.style.height = this.size + "px";
    this.carDOM.style.width = this.size + "px";
    this.carDOM.style.position = "fixed";
    this.carDOM.style.backgroundImage = "url(" + this.image + ")";
    this.carDOM.style.backgroundPosition = "center center";
    this.carDOM.style.backgroundSize = "contain";
    this.carDOM.style.backgroundRepeat = "no-repeat";
    this.carDOM.style.top = (window.innerHeight - this.size) / 2 + "px";
    this.carDOM.style.left = (window.innerWidth - this.size) / 2 + "px";
    document.body.appendChild(this.carDOM);
  }

  crateDashBoard() {
    this.dashBoradDOM = document.createElement("div");
    this.dashBoradDOM.classList.add("dashBoard");
    this.dashBoradDOM.id = "DB-" + this.name;
    this.dashBoradDOM.style.height = 20 + "px";
    this.dashBoradDOM.style.width = 50 + "px";
    document.body.appendChild(this.dashBoradDOM);
  }

  create() {
    if (!this.carDOM) {
      this.createCar();
      this.crateDashBoard();
      this.control();
    }
  }
}
