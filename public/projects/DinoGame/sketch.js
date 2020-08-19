let D = [];
let C = [];
let counter = 0;
let save = [];
let total = 100;
let generation = 0;
let speed;
let playing = false;

function setup() {
    window.canvas = createCanvas(800, 700);
    canvas.parent("canvas");
    for (let i = 0; i < total; i++) {
        let n = new NN(3, 2, 1, [4]);
        brain = NN_child.createChild(n)
        D.push(new DinoAI(brain))
    }
}

function draw() {
    if (playing) {
        background(0);
        fill(100, 75, 50);
        rectMode(CORNERS);
        rect(0, height, width, height - 40);

        D.update();
        D.show();

        if (Math.random() < 0.5 && counter % 60 == 0) {
            C.push(new Cactus());
            counter = 0;
        }

        for (let i = 0; i < C.length; i++) {
            C[i].update();
            C[i].show();

            if (C[i].hits(D)) {
                re_start();
            }

            if (C[i].x + C[i].width < 0) {
                C.splice(i, 1);
                i--;
            }
        }

        counter++;
    }

    else {
        background(0);
        fill(100, 75, 50);
        rectMode(CORNERS);
        rect(0, height, width, height - 40);

        for (let i = 0; i < D.length; i++) {
            D[i].think(C);
            D[i].update();
            D[i].show();
        }

        if (counter > 100) {
            if (Math.random() < 0.75 && counter % 60 == 0) {
                C.push(new Cactus());
                counter = 0;
            }
        }

        for (let i = 0; i < C.length; i++) {
            C[i].update();
            C[i].show();

            for (let j = 0; j < D.length; j++) {
                if (C[i].hits(D[j])) {
                    save.push(D.splice(j, 1)[0]);
                    j--;
                }
            }

            if (C[i].x + C[i].width < 0) {
                C.splice(i, 1);
                i--;
            }
        }

        counter++;

        if (D.length === 0) {
            let pop = new Population(total, save);
            D = pop.nextGen();
            counter = 0;
            C = []
            generation++;
            console.log(generation)
        }
    }
}

function re_start() {
    D = new Dino();
    C = [new Cactus()];
    counter = 0;
}

function keyPressed() {
    if (keyCode === 32) {
        if (playing) {
            D.jump();
        }
    }

    if (keyCode === 80) {
        playing = true;
        D = new Dino();
        C = [];
        save = [];
        generation = 0;
        counter = 0;
    }

    if (keyCode === 82) {
        playing = false;
        D = [];
        C = [];
        for (let i = 0; i < total; i++) {
            let n = new NN(3, 2, 1, [4]);
            brain = NN_child.createChild(n)
            D.push(new DinoAI(brain))
        }
        counter = 0;
    }
}
