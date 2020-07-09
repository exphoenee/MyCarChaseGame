class Car {
    constructor(name, image, imageAngle, steering, acceleration, breake, maxSpeed, size, accKey, breakeKey, turnLeftKey, turnRightKey) {
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
    }
    
    getCar() {
        return document.getElementById(this.name);
    }

    accelerate() {
        this.speed = this.speed + this.acceleration;
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
    }

    breake() {
        this.speed = this.speed - this.acceleration/2;
        if (this.speed < -this.maxSpeed/2) {
            this.speed = -this.maxSpeed/2;
        }
    }

    spriteRotate(angle)
    {
        var carDOM = this.getCar();
        carDOM.style.webkitTransform = 'rotate('+angle+'deg)'; 
        carDOM.style.mozTransform    = 'rotate('+angle+'deg)'; 
        carDOM.style.msTransform     = 'rotate('+angle+'deg)'; 
        carDOM.style.oTransform      = 'rotate('+angle+'deg)'; 
        carDOM.style.transform       = 'rotate('+angle+'deg)'; 
    }

    wrapAngle(angle) {
        if (angle > 360) { angle = angle - 360; }
        if (angle < 0) { angle = angle + 360; }
        return angle;
    }

    turn(direction) {
        if (this.speed !== 0)
        {
            this.direction = this.direction + direction*this.steeringSpeed;
            this.direction = this.wrapAngle(this.direction);
        }
    }

    setPosition() {
        var xInc = this.speed*Math.cos(this.direction/180*Math.PI);
        var yInc = this.speed*Math.sin(this.direction/180*Math.PI);
        this.positionX = this.positionX + xInc;
        this.positionY = this.positionY + yInc;
        
        var moveingDirection = Math.atan(xInc/yInc)/Math.PI*180;

        var carDOM = this.getCar();

        console.log(moveingDirection);
        console.log(this.direction);

        carDOM.style.left = (window.innerWidth-this.size)/2-this.positionX+"px";
        carDOM.style.top = (window.innerHeight-this.size)/2-this.positionY+"px";
        //this.update();
    }

    control (accKey, breakeKey, turnLeftKey, turnRightKey, functions) {

        document.addEventListener('keydown', function(event) {
            if (event.code == accKey) {
                functions.accelerate();
                functions.update();
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.code == breakeKey) {
                functions.breake();
                functions.update();
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.code == turnLeftKey) {
                functions.turn(-1);
                functions.update();
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.code == turnRightKey) {
                functions.turn(1);
                functions.update();
            }
        });
        
        /* itt valamiért nem működik, ezért be kelett tennem mindegyik gombnyomáshoz.
            Meg amúgy is mé nem megy az autóka, ha nem nyomom a gombot!?!??!
            Na meg valahová kellene nekem egy lassulás, ha nem nyomja a gázt
            a játékos, akkor lassan álljon meg az autó */
    }

    update(){
        this.setPosition();
        this.spriteRotate(this.direction);
        console.log('refreshed');
        //gameloop();
    }

    create() {
        if (!this.getCar())
        {
            var carDOM = document.createElement("div");
            carDOM.classList.add(this.name);
            carDOM.id = this.name;
            carDOM.style.height = this.size+"px";
            carDOM.style.width = this.size+"px";
            carDOM.style.position = "fixed";
            carDOM.style.backgroundImage = "url("+this.image+")";
            carDOM.style.backgroundPosition = "center center";
            carDOM.style.backgroundSize = "contain";
            carDOM.style.backgroundRepeat = "no-repeat";
            document.body.appendChild(carDOM);
            carDOM.style.top = (window.innerHeight-this.size)/2+"px";
            carDOM.style.left = (window.innerWidth-this.size)/2+"px";
            this.spriteRotate(-this.imageAngle);
            this.control(this.accKey, this.breakeKey, this.turnLeftKey, this.turnRightKey, this);
        }
    }
}

var car1 = new Car("lambo", "cars/car2.png", 180, 3, 0.2, 0.5, 5, 85, "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight");
var car2 = new Car("merci", "cars/car1.png", 180, 3, 0.3, 0.7, 6, 90, "KeyW", "KeyS", "KeyA", "KeyD");

car1.create();
car2.create();

function gameloop()
{
    car1.update();
}

//gameloop();
