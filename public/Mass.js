class Mass {
	constructor(x, y, r, tag, velX, velY) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.velX = velX;
		this.velY = velY;
		this.mass = (4 / 3) * 3.14 * r * r * r * density;
		this.tag = tag;
		this.colour = [255, 255, 255]
	}

	distSq(x1, y1, x2, y2) {
		return (((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
	}

	direc(num1, num2) {
		return num1 > num2 ? -1 : 1;
	}

	update() {
		let forceX = 0;
		let forceY = 0;
		let dirX;
		let dirY;

		let angle = 0

		for (let i = 0; i < particles.length; i++) {
			if (particles[i]) {
				if (this.tag != particles[i].tag) {
					angle = Math.atan((this.y - particles[i].y) / (this.x - particles[i].x));
					dirX = this.direc(this.x, particles[i].x);
					dirY = this.direc(this.y, particles[i].y);
					const force = (GC * this.mass * particles[i].mass) / (this.distSq(this.x, this.y, particles[i].x, particles[i].y));
					forceX += force * Math.abs(Math.cos(angle)) * dirX;
					forceY += force * Math.abs(Math.sin(angle)) * dirY;
				}
			}
		}
		this.velX += 10 * forceX / this.mass;
		this.velY += 10 * forceY / this.mass;
		this.x += this.velX;
		this.y += this.velY;
	}

	draw() {
		stroke(this.colour[0], this.colour[1], this.colour[2]);
		fill(this.colour[0], this.colour[1], this.colour[2]);
		ellipse(this.x, this.y, this.r, this.r);
	}
}