let playing = true;

let time = 0;
let n = [];
let brain = [];
let total = 500;
let b = [];
let G = 0.5;
let time2 = 0;
let p = [];
let save = [];
let speed;
let counter = 0;
let generation = 0;

function setup() {
    window.canvas = createCanvas(800, 700);
    canvas.parent("canvas");
    for (let i = 0; i < total; i++) {
        n.push(new NN(4, 2, 1, [8]));
        brain.push(NN_child.createChild(n[i]));
        b.push(new birdAI(brain[i]));
    }
}

function draw() {
    if (playing) {
        // console.log("AI")

        background(51);

        for (let i = p.length - 1; i >= 0; i--) {
            p[i].update();
            p[i].show();

            for (let n = b.length - 1; n >= 0; n--) {
                if (p[i].hits(b[n]) === 1) {
                    save.push(b.splice(n, 1)[0]);
                }
            }

            if (p[i].x + p[i].w < 0) {
                p.splice(i, 1);
            }
        }

        if (counter > 190) {
            for (let i = b.length - 1; i >= 0; i--) {
                if (b[i].y === height) {
                    save.push(b.splice(i, 1)[0]);
                }
            }
        }

        if (time2 % 120 === 0) {
            p.push(new pipe());
        }

        for (let n = 0; n < b.length; n++) {
            b[n].update(G);
            b[n].show();
            out = b[n].think(p);
            if (out.data[0][0] > out.data[1][0]) {
                b[n].jump();
            }
        }

        if (b.length === 0) {
            let blah = new Population(total, save);
            b = blah.nextGen();
            time2 = 0;
            p = []
            p.push(new pipe());
            save = [];
            counter = 0;
            generation++;
            // console.log(generation)
        }

        time2 = time2 + 1;
        counter = counter + 1;
    }

    else {
        // console.log("playing")
        background(51);
        b.update(G)
        b.show();

        for (let i = p.length - 1; i >= 0; i--) {

            p[i].update()
            p[i].show()

            if (p[i].hits(b)) {
                re_start();
            }

            if (p[i].x + p[i].w < 0) {
                p.splice(i, 1)
            }
        }

        time = time + 1;

        if (time % 120 === 0) {
            p.push(new pipe());
        }
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (playing) {

        }
        else {
            b.jump();
        }
    }


    if (keyCode === 82) {
        playing = true;
        b = [];
        p = [];
        for (let i = 0; i < total; i++) {
            n.push(new NN(4, 2, 1, [8]));
            brain.push(NN_child.createChild(n[i]));
            b.push(new birdAI(brain[i]));
        }
        time2 = 0;
        time = 0;
    }

    if (keyCode === 80) {
        playing = false;
        p = [];
        b = new bird();
        time = 0;
        time2 = 0;
        save = [];
        generation = 0;
    }
}

function re_start() {
    p = [];
    b = new bird();
    p.push(new pipe())
    time = 0;
}
