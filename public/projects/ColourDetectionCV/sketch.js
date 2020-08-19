let capture;
let img;
let w = 640;
let h = 480;
let pointX = [];
let pointY = [];

let pointR = 0;
let pointG = 0;
let pointB = 0;

let logicPoint = false;

let allowance = 10;

function setup() {
    window.canvas = createCanvas(w, h);
    canvas.parent("canvas");
    capture = createCapture(VIDEO);
    capture.hide();
}

function draw() {

    let pointX = [];
    let pointY = [];

    background(51);
    img = capture.get();

    img.loadPixels();

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let index = (x + y * width) * 4;

            if (img.pixels[index + 0] < pointR + allowance && img.pixels[index + 1] < pointG + allowance && img.pixels[index + 2] <  pointB + allowance)   {
                if (img.pixels[index + 0] > pointR - allowance && img.pixels[index + 1] > pointG - allowance && img.pixels[index + 2] >  pointB - allowance) {
                    if (logicPoint)   {
                        pointX.push(x);
                        pointY.push(y);
                    }
                }
            }
        }
    }
    img.updatePixels();

    image(img, 0, 0);

    let finalX = 0;
    let finalY = 0;

    for (let i = 0; i < pointX.length; i++) {
        finalX = finalX + pointX[i];
        finalY = finalY + pointY[i];
    }

    finalX = finalX / pointX.length;
    finalY = finalY / pointY.length;

    fill(255);
    strokeWeight(50)
    point(finalX, finalY);
}

function mousePressed() {
    console.log(mouseX, mouseY);
    img.loadPixels();
    let index = (mouseX + mouseY * w) * 4;

    pointR = img.pixels[index + 0];
    pointG = img.pixels[index + 1];
    pointB = img.pixels[index + 2];
    
    logicPoint = true;
}
