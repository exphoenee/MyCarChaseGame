class Car {
    constructor(name, image, imageAngle, steering, acceleration, breake, maxSpeed, size, accKey, breakeKey, turnLeftKey, turnRightKey) {
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
        this.accKey = accKey;
        this.breakeKey = breakeKey;
        this.turnLeftKey = turnLeftKey;
        this.turnRightKey = turnRightKey;
        this.accPressed = false;
        this.breakePressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
    }
    
    accelerate(direction) {
        console.log(Math.abs(this.speed));
        console.log(Math.abs(this.maxSpeed * direction));

        var moveDirection = Math.sign(this.speed);
        var moveSpeed = Math.abs(this.speed);

        this.speed = this.speed + this.acceleration * direction;
        if (this.speed > this.maxSpeed * direction) {
            this.speed = this.maxSpeed * direction;
        }
    }

    friction() {
        //this.speed = this.speed * 0.99;
        if (this.speed < this.acceleration/5) {
            this.speed = 0;
        }
    }

    breake() {
        this.accelerate(-this.carBreake);
    }

    spriteRotate(angle)
    {
        this.carDOM.style.webkitTransform = 'rotate('+angle+'deg)'; 
        this.carDOM.style.mozTransform    = 'rotate('+angle+'deg)'; 
        this.carDOM.style.msTransform     = 'rotate('+angle+'deg)'; 
        this.carDOM.style.oTransform      = 'rotate('+angle+'deg)'; 
        this.carDOM.style.transform       = 'rotate('+angle+'deg)'; 
    }

    wrapAngle(angle) {
        if (angle > 360) { angle = angle - 360; }
        if (angle < 0) { angle = angle + 360; }
        return angle;
    }

    turn(direction) {
        if (this.speed !== 0)
        {
            var relativeSpeed = this.speed / this.maxSpeed;
            this.direction = this.direction + direction*this.steeringSpeed*relativeSpeed;
            this.direction = this.wrapAngle(this.direction);
        }
    }

    setPosition() {
        var xInc = this.speed*Math.cos(this.direction/180*Math.PI);
        var yInc = this.speed*Math.sin(this.direction/180*Math.PI);
        this.positionX = this.positionX + xInc;
        this.positionY = this.positionY + yInc;
        
        this.carDOM.style.left = (window.innerWidth-this.size)/2-this.positionX+"px";
        this.carDOM.style.top = (window.innerHeight-this.size)/2-this.positionY+"px";
    }

    control (accKey, breakeKey, turnLeftKey, turnRightKey, myCar) {

        document.addEventListener('keydown', function(event) {
            if (event.code == accKey) {
                myCar.accPressed = true;
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.code == breakeKey) {
                myCar.breakePressed = true;
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.code == turnLeftKey) {
                myCar.leftPressed = true;
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.code == turnRightKey) {
                myCar.rightPressed = true;
            }
        });
        document.addEventListener('keyup', function(event) {
            if (event.code == accKey) {
                myCar.accPressed = false;
            }
        });
        document.addEventListener('keyup', function(event) {
            if (event.code == breakeKey) {
                myCar.breakePressed = false;
            }
        });
        document.addEventListener('keyup', function(event) {
            if (event.code == turnLeftKey) {
                myCar.leftPressed = false;
            }
        });
        document.addEventListener('keyup', function(event) {
            if (event.code == turnRightKey) {
                myCar.rightPressed = false;
            }
        });
    }

    update(){
        this.friction();
        if (this.accPressed) {
            this.accelerate(1);
        } else
        if (this.breakePressed) {
            this.breake();
        }
        if (this.leftPressed) {
            this.turn(-1);
        }
        if (this.rightPressed) {
            this.turn(1);
        }
        this.setPosition();
        this.spriteRotate(this.direction);
        this.dashBoradDOM.innerHTML = this.speed;
    }

    createCar(){
        this.carDOM = document.createElement("div");
        this.carDOM.classList.add("car");
        this.carDOM.id = this.name;
        this.carDOM.style.height = this.size+"px";
        this.carDOM.style.width = this.size+"px";
        this.carDOM.style.position = "fixed";
        this.carDOM.style.backgroundImage = "url("+this.image+")";
        this.carDOM.style.backgroundPosition = "center center";
        this.carDOM.style.backgroundSize = "contain";
        this.carDOM.style.backgroundRepeat = "no-repeat";
        this.carDOM.style.top = (window.innerHeight-this.size)/2+"px";
        this.carDOM.style.left = (window.innerWidth-this.size)/2+"px";
        document.body.appendChild(this.carDOM);
    }

    crateDashBoard() {
        this.dashBoradDOM = document.createElement("div");
        this.dashBoradDOM.classList.add("dashBoard");
        this.dashBoradDOM.id = "DB-"+this.name;
        this.dashBoradDOM.style.height = 20+"px";
        this.dashBoradDOM.style.width = 50+"px";
        document.body.appendChild(this.dashBoradDOM);
    }

    create() {
        if (!this.carDOM)
        {
            this.createCar();
            this.crateDashBoard();
            this.control(this.accKey, this.breakeKey, this.turnLeftKey, this.turnRightKey, this);
        }
    }
}

var cars = [
    new Car("lambo", "cars/car2.png", 180, 1, 0.003, 0.5, 1, 85, "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"),
    new Car("merci", "cars/car1.png", 180, 1, 0.005, 0.6, 1.3, 90, "KeyW", "KeyS", "KeyA", "KeyD")
];

for (var i = 0; i <cars.length; i++) {
    cars[i].create();
}

function gameloop()
{
    for (var i = 0; i <cars.length; i++) {
        cars[i].update();
    }
}

setInterval(function() {
    gameloop();
}, 1);