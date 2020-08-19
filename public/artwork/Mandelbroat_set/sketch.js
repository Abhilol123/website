let wid = 800;
let hei = 700;
let variable = 2;
let infinity = 30;

let slider1;

function setup() {
    window.canvas = createCanvas(wid, hei);
    canvas.parent("canvas")
    slider1 = createSlider(30, 100, 30, 1);
    slider1.parent("sliders");
}

function draw() {
    loadPixels();
    infinity = slider1.value();
    for (let i = 0; i < hei; i++)   {
        for (let j = 0; j < wid; j++)   {

            var cb = map(i, 0, hei, -variable, variable);
            var ca = map(j, 0, wid, -variable, variable);
            var b = cb;
            var a = ca;
            var n = 0;

            for (n = 0; n < infinity; n++)  {
                var aa = a*a - b*b + ca;
                var bb = 2*a*b + cb;
                if (abs(aa + bb) > infinity)    {
                    break;
                }
                a = aa;
                b = bb;
            }

            let index = 4 * (j + i * wid);
            let brightness = map(n, 0, infinity, 0, 255);
            if (n === infinity)  {
                brightness = 0
            }
            pixels[index + 0] = brightness;
            pixels[index + 1] = brightness;
            pixels[index + 2] = brightness;
            pixels[index + 3] = 255;
        }
    }
    updatePixels();
}
