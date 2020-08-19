let canv;
let w = 700;
let h = 600;
let blob = [];
let totalPoints = 5;
let brightness;
let speed = 10;

function invDistSq(x1, y1, x2, y2)  {
    let temp = 500000 /((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    return temp;
}

function setup()    {
    window.canvas = createCanvas(w, h);
    canvas.parent("canvas");
    background(51);
    for (let i = 0; i < totalPoints; i++)   {
        blob.push(new Blob(random(w), random(h), 10));
    }
}

function draw() {
    for (let i = 0; i < totalPoints; i++)   {
        blob[i].update();
    }
    loadPixels();
    for (let y = 0; y < h; y ++)    {
        for (let x = 0; x < w; x++) {
            let index = (x + y * w) * 4;
            brightness = -0;
            for (let i = 0; i < totalPoints; i++)   {
                brightness = brightness + (invDistSq(blob[i].x, blob[i].y, x, y));
            }

            if (brightness < 0)   {
                 brightness = 0;
            }

            pixels[index + 0] = brightness * 1;
            pixels[index + 1] = 255 - brightness * 3;
            pixels[index + 2] = brightness * 6;
            pixels[index + 3] = 255;
        }
    }
    updatePixels()
    // for (let i = 0; i < totalPoints; i++)   {
    //     blob[i].draw();
    // }
}
