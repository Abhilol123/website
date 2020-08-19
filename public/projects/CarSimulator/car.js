class Car {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.width = 20;
        this.height = 10;
        this.velocity = 0;
        this.angVelocity = 0;
        this.boundary = [new Boundary(), new Boundary(), new Boundary(), new Boundary()];
        this.dia = Math.pow(this.width / 2 * this.width / 2 + this.height / 2 * this.height / 2, 0.5);
        this.alphaAngle = Math.atan(this.width / this.height);
        this.maxVelocity = 4;
        this.maxAngVelocity = 0.1;
        this.rayLength = w + h;
        this.noOfRays = 100;
        this.ray = [];

        let ang = 0;
        for (let i = 0; i < this.noOfRays; i++) {
            this.ray.push(new Ray(ang));
            ang += 2 * Math.PI / this.noOfRays;
        }
    }

    rotateRight() {
        if (this.angVelocity < this.maxAngVelocity) {
            this.angVelocity += 0.01;
        }
    }

    rotateLeft() {
        if (this.angVelocity > -this.maxAngVelocity) {
            this.angVelocity += -0.01;
        }
    }

    brake() {
        if (this.velocity > -this.maxVelocity) {
            this.velocity += -0.5;
        }
    }

    gas() {
        if (this.velocity < this.maxVelocity) {
            this.velocity += 0.5;
        }
    }

    update() {
        this.x += this.velocity * Math.cos(this.angle);
        this.y += this.velocity * Math.sin(this.angle);
        this.angle += this.angVelocity;

        this.boundary[0].point1.x = this.x + this.dia * Math.sin(+this.alphaAngle - this.angle);
        this.boundary[0].point1.y = this.y + this.dia * Math.cos(+this.alphaAngle - this.angle);
        this.boundary[0].point2.x = this.x + this.dia * Math.sin(-this.alphaAngle - this.angle);
        this.boundary[0].point2.y = this.y + this.dia * Math.cos(-this.alphaAngle - this.angle);

        this.boundary[1].point1.x = this.x + this.dia * Math.sin(+this.alphaAngle - this.angle + Math.PI);
        this.boundary[1].point1.y = this.y + this.dia * Math.cos(+this.alphaAngle - this.angle + Math.PI);
        this.boundary[1].point2.x = this.x + this.dia * Math.sin(-this.alphaAngle - this.angle + Math.PI);
        this.boundary[1].point2.y = this.y + this.dia * Math.cos(-this.alphaAngle - this.angle + Math.PI);

        this.boundary[2].point1.x = this.x + this.dia * Math.sin(+this.alphaAngle - this.angle);
        this.boundary[2].point1.y = this.y + this.dia * Math.cos(+this.alphaAngle - this.angle);
        this.boundary[2].point2.x = this.x + this.dia * Math.sin(-this.alphaAngle - this.angle + Math.PI);
        this.boundary[2].point2.y = this.y + this.dia * Math.cos(-this.alphaAngle - this.angle + Math.PI);

        this.boundary[3].point1.x = this.x + this.dia * Math.sin(+this.alphaAngle - this.angle + Math.PI);
        this.boundary[3].point1.y = this.y + this.dia * Math.cos(+this.alphaAngle - this.angle + Math.PI);
        this.boundary[3].point2.x = this.x + this.dia * Math.sin(-this.alphaAngle - this.angle);
        this.boundary[3].point2.y = this.y + this.dia * Math.cos(-this.alphaAngle - this.angle);

        for (let i = 0; i < this.ray.length; i++) {
            this.ray[i].point1.x = this.x;
            this.ray[i].point1.y = this.y;
            this.ray[i].point2.x = this.x + this.rayLength * Math.cos(this.angle + this.ray[i].angle);
            this.ray[i].point2.y = this.y + this.rayLength * Math.sin(this.angle + this.ray[i].angle);
        }

        for (let j = 0; j < this.noOfRays; j++) {
            this.ray[j].distance = w + h;
            for (let i = 0; i < boundary.length; i++) {
                if (boundary[i].touch(this.ray[j])) {
                    let p = boundary[i].touch(this.ray[j]);
                    let d = dist(p.x, p.y, this.x, this.y);
                    if (d < this.ray[j].distance) {
                        this.ray[j].distance = d;
                        this.ray[j].point.x = p.x;
                        this.ray[j].point.y = p.y;
                    }
                }
            }
        }
    }

    draw() {
        for (let i = 0; i < this.noOfRays; i++) {
            this.ray[i].draw();
        }

        push();
        stroke(255);
        fill(255);
        strokeWeight(1);
        translate(this.x, this.y);
        rotate(this.angle);
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();

        push();
        for (let i = 0; i < 4; i++) {
            this.boundary[i].draw(255, 0, 0, 255);
        }
        pop();
    }
}
