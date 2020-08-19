class Ray {
    constructor(angle) {
        this.point1 = { x: 0, y: 0 };
        this.point2 = { x: 0, y: 0 };
        this.angle = angle;
        this.distance = w;
        this.point = { x: 0, y: 0 };
    }

    draw() {

        if (showRays) {
            push();
            stroke(255, 255, 255, 50);
            strokeWeight(2);
            line(this.point1.x, this.point1.y, this.point.x, this.point.y);

            stroke(0);
            fill(0);
            strokeWeight(10);
            point(this.point.x, this.point.y);
            pop();
        }
    }
}