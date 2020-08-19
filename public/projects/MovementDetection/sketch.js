let capture;
let img1;
let img2;
let img;
let w = 640;
let h = 480;

let multiplier = 1;

let totalDiff = 0;
let threshold = 20;

function setup() {
    window.canvas = createCanvas(w, h);
    canvas.parent("canvas");
    capture = createCapture(VIDEO);
    capture.hide();
    img2 = capture.get();
}

function diff(index, ind) {
    let temp = (img1.pixels[index + ind] - img2.pixels[index + ind]) * multiplier;
    if (temp > threshold)   {
        return 255;
    }
    else    {
        return 0;
    }
}

function redo() {
    img2 = capture.get();

    img1.loadPixels();
    img2.loadPixels();
    img.loadPixels();

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let index = (x + y * w) * 4
            let brightness = diff(index, 0) + diff(index, 1) + diff(index, 2);

            if (brightness > 256) {
                brightness = 255;
            }
            else    {
                brightness = 0;
            }

            img.pixels[index + 0] = brightness;
            img.pixels[index + 1] = brightness;
            img.pixels[index + 2] = brightness;
            totalDiff = totalDiff + Math.abs((img1.pixels[index + 0] - img2.pixels[index + 0]) * multiplier);
        }
    }
    img.updatePixels();
}

function draw() {
    img2 = capture.get();

    totalDiff = 0;

    background(51)
    img1 = capture.get();
    
    img = capture.get();

    while (totalDiff < 100000) {
        totalDiff = 0;
        redo();
    }

    image(img, 0, 0);
}
