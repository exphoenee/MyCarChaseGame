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
    turnRightKey,
  ) {
    this.trackDOM = raceTrack;
    this.raceTrackHeight = raceTrack.clientHeight;
    this.raceTrackWidth = raceTrack.clientWidth;
    this.trackY = this.trackDOM.offsetTop;
    this.trackX = this.trackDOM.offsetLeft;
    this.carDOM = null;
    this.dashBoradDOM = null;
    this.hitBox = null;
    this.hitBoxChoords = [];
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

  spriteRotate() {
    this.carDOM.style.webkitTransform = 'rotate(' + this.direction + 'deg)';
    this.carDOM.style.mozTransform = 'rotate(' + this.direction + 'deg)';
    this.carDOM.style.msTransform = 'rotate(' + this.direction + 'deg)';
    this.carDOM.style.oTransform = 'rotate(' + this.direction + 'deg)';
    this.carDOM.style.transform = 'rotate(' + this.direction + 'deg)';
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
    var xInc = this.speed * Math.cos((this.direction / 180) * Math.PI);
    var yInc = this.speed * Math.sin((this.direction / 180) * Math.PI);
    this.positionX = this.positionX + xInc;
    this.positionY = this.positionY + yInc;

    this.carDOM.style.left =
      (this.raceTrackWidth - this.size) / 2 -
      this.positionX +
      this.trackX +
      'px';
    this.carDOM.style.top =
      (this.raceTrackHeight - this.size) / 2 -
      this.positionY +
      this.trackY +
      'px';
  }

  createHitBox() {
    let hitBoxNames = [
      'hitbox-topleft',
      'hitbox-topright',
      'hitbox-bottomleft',
      'hitbox-bottomright',
    ];

    hitBoxNames.forEach((key, i) => {
      this.hitBox = document.createElement('div');
      this.hitBox.classList.add(hitBoxNames[i]);
      this.hitBox.id = hitBoxNames[i] + '-' + this.name;
      this.hitBox.style.height = 5 + 'px';
      this.hitBox.style.width = 5 + 'px';
      this.hitBox.style.backgroundColor = 'white';
      document.getElementById(this.name).appendChild(this.hitBox);
    });
  }

  calculatehitBox(showHitBox) {
    let hitBoxWidth = this.size / 3;
    let hitBoxHeight = this.size / 2;

    let carCoordsX = this.positionX + this.trackX + hitBoxWidth;
    let carCoordsY = this.positionY + this.trackY + hitBoxHeight;

    this.hitBoxCoords;

    this.carDOM.style.webkitTransform = 'rotate(' + this.direction + 'deg)';
    this.carDOM.style.mozTransform = 'rotate(' + this.direction + 'deg)';
    this.carDOM.style.msTransform = 'rotate(' + this.direction + 'deg)';
    this.carDOM.style.oTransform = 'rotate(' + this.direction + 'deg)';
    this.carDOM.style.transform = 'rotate(' + this.direction + 'deg)';

    this.hitBoxCoords = [];
  }

  collisionDetection() {}

  control() {
    /* itt az if-en belül miért nem férek hozzá az objektumomhoz? */
    var keyPressed = this.controlPressed;

    this.controlKeys.forEach((key, i) => {
      document.addEventListener('keydown', (event) => {
        if (event.code == key) {
          keyPressed[i] = true;
        }
      });
      document.addEventListener('keyup', (event) => {
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
    this.calculatehitBox(true);
  }

  updateDashboard() {
    this.dashBoradDOM.innerHTML = 'Speed:' + Math.round((this.speed / 2) * 220);
    this.dashBoradDOM.innerHTML +=
      '\r' + 'Direction:' + Math.round(this.direction);
    this.dashBoradDOM.innerHTML += '\r' + 'PosX: ' + Math.round(this.positionX);
    this.dashBoradDOM.innerHTML += '\r' + 'PosY: ' + Math.round(this.positionY);
  }

  update() {
    this.updateCar();
    this.updateDashboard();
  }

  createCar() {
    this.carDOM = document.createElement('div');

    /* a facé nem érem el a racetrack DOM-ját az objektumon keresztül. */
    //this.trackDOM = document.getElementById('racetrack');

    this.carDOM.classList.add('car');
    this.carDOM.id = this.name;
    this.carDOM.style.height = this.size + 'px';
    this.carDOM.style.width = this.size + 'px';
    this.carDOM.style.position = 'fixed';
    this.carDOM.style.backgroundImage = 'url(' + this.image + ')';
    this.carDOM.style.backgroundPosition = 'center center';
    this.carDOM.style.backgroundSize = 'contain';
    this.carDOM.style.backgroundRepeat = 'no-repeat';
    document.getElementById('racetrack').appendChild(this.carDOM);
  }

  crateDashBoard() {
    this.dashBoradDOM = document.createElement('div');
    this.dashBoradDOM.classList.add('dashBoard');
    this.dashBoradDOM.id = 'DB-' + this.name;
    this.dashBoradDOM.style.height = 20 + 'px';
    this.dashBoradDOM.style.color = 'white';
    this.dashBoradDOM.style.paddingLeft = 5 + 'px';
    this.dashBoradDOM.style.paddingTop = 5 + 'px';
    //this.dashBoradDOM.style.width = 50 + 'px';
    document.getElementById('racetrack').appendChild(this.dashBoradDOM);
  }

  create() {
    if (!this.carDOM) {
      this.createCar();
      this.crateDashBoard();
      this.control();
      this.createHitBox();
    }
  }
}
