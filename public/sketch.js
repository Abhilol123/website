let particles = [];
let oldParticles = [];
let noParticles = 400;
let w = 1800;
let h = 800;
let deleted = [];
let clearance = 0;
let initialDisturbance = 1;
let maxMass = 0.5;
let stray = [];

function setup() {
  w = windowWidth;
  h = windowHeight;
  window.canvas = createCanvas(w, h);
  canvas.parent("canvas");
  for (let i = 0; i < noParticles; i++) {
    let x = random(clearance, w - clearance);
    let y = random(clearance, h - clearance);
    let r = random(3, random(3, random(3, maxMass)));
    let vx = random(-initialDisturbance, initialDisturbance);
    let vy = random(-initialDisturbance, initialDisturbance);
    particles.push(new Mass(x, y, r, i, vx, vy));
    oldParticles.push(new Mass(x, y, r, i, vx, vy));
    for (let i = 0; i < 2; i++) {
      stray.push({ dia: random(3), x: random(w), y: random(h) });
    }
  }
}

function checkDeleted(num) {
  for (let n = 0; n < deleted.length; n++) {
    if (num == deleted[n]) {
      return false;
    }
  }
  return true;
}

function draw() {
  background(0, 0, 0);

  for (let i = noParticles - 1; i >= 0; i--) {
    if (checkDeleted(i)) {
      for (let j = i - 1; j >= 0; j--) {
        if (checkDeleted(j)) {
          if (particles[i].tag != particles[j].tag) {
            if (
              dist(
                particles[i].x,
                particles[i].y,
                0,
                particles[j].x,
                particles[j].y,
                0
              ) <
              particles[i].r + particles[j].r
            ) {
              particles[i].r = Math.pow(
                Math.pow(oldParticles[i].r, 3) + Math.pow(oldParticles[j].r, 3),
                1 / 3
              );
              oldParticles[i].r = particles[i].r;

              particles[i].x =
                (oldParticles[i].x * oldParticles[i].mass +
                  oldParticles[j].x * oldParticles[j].mass) /
                (oldParticles[i].mass + oldParticles[j].mass);
              oldParticles[i].x = particles[i].x;

              particles[i].y =
                (oldParticles[i].y * oldParticles[i].mass +
                  oldParticles[j].y * oldParticles[j].mass) /
                (oldParticles[i].mass + oldParticles[j].mass);
              oldParticles[i].y = particles[i].y;

              particles[i].velX =
                (oldParticles[i].velX * oldParticles[i].mass +
                  oldParticles[j].velX * oldParticles[j].mass) /
                (oldParticles[i].mass + oldParticles[j].mass);
              oldParticles[i].velX = particles[i].velX;

              particles[i].velY =
                (oldParticles[i].velY * oldParticles[i].mass +
                  oldParticles[j].velY * oldParticles[j].mass) /
                (oldParticles[i].mass + oldParticles[j].mass);
              oldParticles[i].velY = particles[i].velY;

              particles[i].mass = oldParticles[i].mass + oldParticles[j].mass;
              oldParticles[i].mass = particles[i].mass;

              deleted.push(j);
              particles[j] = 0;
              oldParticles[j] = 0;
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < noParticles; i++) {
    if (checkDeleted(i)) {
      oldParticles[i].update();
      oldParticles[i].draw();
    }
  }

  for (let i = 0; i < particles.length; i++) {
    if (checkDeleted(i)) {
      particles[i].x = oldParticles[i].x;
      particles[i].y = oldParticles[i].y;
    }
  }

  for (let i = 0; i < stray.length; i++) {
    strokeWeight(stray[i].dia);
    fill(255);
    stroke(255);
    point(stray[i].x, stray[i].y);
  }
}
