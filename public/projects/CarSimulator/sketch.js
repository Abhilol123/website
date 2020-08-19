let w = 800;
let h = 700;

let car1;

let temp = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
let temp1 = { x: 0, y: 0 };
let notPressed = true;
let boundary = [];

let showRays = false;

function setup() {
    window.canvas = createCanvas(w, h);
    canvas.parent("canvas");
    car1 = new Car(w / 2, h / 2);

    boundary.push(new Boundary(0, 0, w, 0));
    boundary.push(new Boundary(w, 0, w, h));
    boundary.push(new Boundary(w, h, 0, h));
    boundary.push(new Boundary(0, h, 0, 0));
}

function draw() {
    background(0);

    if (keyIsPressed) {
        if (key === "w") {
            car1.gas();
        }
        if (key === "a") {
            car1.rotateLeft();
        }
        if (key === "s") {
            car1.brake();
        }
        if (key === "d") {
            car1.rotateRight();
        }
        if (key === "c") {
            notPressed = true;
        }
        if (key === "z") {
            if (showRays) {
                showRays = false;
            }
            else {
                showRays = true;
            }
        }
    }
    else {
        car1.angVelocity = 0;
    }
    car1.update();
    
    for (let i = 0; i < boundary.length; i++) {
        boundary[i].draw(0, 0, 255, 255);
    }

    car1.draw();

    for (let i = 0; i < boundary.length; i++) {
        for (let j = 0; j < 4; j++) {
            car1.boundary[j].hits(boundary[i]);
        }
    }


}

function mousePressed() {
    if (notPressed) {
        temp1.x = mouseX;
        temp1.y = mouseY;
        notPressed = false;
    }
    else {
        temp[0].x = temp1.x;
        temp[0].y = temp1.y;
        temp[1].x = mouseX;
        temp[1].y = mouseY;
        temp1.x = mouseX;
        temp1.y = mouseY;
        boundary.push(new Boundary(temp[0].x, temp[0].y, temp[1].x, temp[1].y))
    }
}