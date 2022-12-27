const particles = [];
const oldParticles = [];
const noParticles = 400;
const clearance = 0;
const initialDisturbance = 0;
const maxRadius = 3;
const density = 0.5;
const GC = 0.005
let w = 1800;
let h = 800;

function setup() {
	w = windowWidth;
	h = windowHeight;
	window.canvas = createCanvas(w, h);
	canvas.parent("canvas");
	for (let i = 0; i < noParticles; i++) {
		const x = random(clearance, w - clearance);
		const y = random(clearance, h - clearance);
		const r = maxRadius
		const vx = random(-initialDisturbance, initialDisturbance);
		const vy = random(-initialDisturbance, initialDisturbance);
		particles.push(new Mass(x, y, r, i, vx, vy));
		oldParticles.push(new Mass(x, y, r, i, vx, vy));
	}
}

function draw() {
	background(0, 0, 0);

	for (let i = particles.length; i > 0; i--) {
		if (particles[i]) {
			for (let j = i; j > 0; j--) {
				if (particles[j]) {
					if (particles[i].tag != particles[j].tag) {
						if (dist(particles[i].x, particles[i].y, 0, particles[j].x, particles[j].y, 0) < particles[i].r + particles[j].r) {
							particles[i].r = Math.pow(Math.pow(oldParticles[i].r, 3) + Math.pow(oldParticles[j].r, 3), 1 / 3);
							oldParticles[i].r = particles[i].r;

							particles[i].x = (oldParticles[i].x * oldParticles[i].mass + oldParticles[j].x * oldParticles[j].mass) / (oldParticles[i].mass + oldParticles[j].mass);
							oldParticles[i].x = particles[i].x;

							particles[i].y = (oldParticles[i].y * oldParticles[i].mass + oldParticles[j].y * oldParticles[j].mass) / (oldParticles[i].mass + oldParticles[j].mass);
							oldParticles[i].y = particles[i].y;

							particles[i].velX = (oldParticles[i].velX * oldParticles[i].mass + oldParticles[j].velX * oldParticles[j].mass) / (oldParticles[i].mass + oldParticles[j].mass);
							oldParticles[i].velX = particles[i].velX;

							particles[i].velY = (oldParticles[i].velY * oldParticles[i].mass + oldParticles[j].velY * oldParticles[j].mass) / (oldParticles[i].mass + oldParticles[j].mass);
							oldParticles[i].velY = particles[i].velY;

							particles[i].mass = oldParticles[i].mass + oldParticles[j].mass;
							oldParticles[i].mass = particles[i].mass;

							particles[j] = null;
							oldParticles[j] = null;
						}
					}
				}
			}
		}
	}

	for (let i = 0; i < noParticles; i++) {
		if (particles[i]) {
			oldParticles[i].update();
			oldParticles[i].draw();
		}
	}

	for (let i = 0; i < particles.length; i++) {
		if (particles[i]) {
			particles[i].x = oldParticles[i].x;
			particles[i].y = oldParticles[i].y;
		}
	}
}
