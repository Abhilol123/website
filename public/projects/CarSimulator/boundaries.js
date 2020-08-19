class Boundary {
    constructor(x1, y1, x2, y2) {
        this.point1 = { x: x1, y: y1 };
        this.point2 = { x: x2, y: y2 };
    }

    hits(object) {
        let p1 = this.point1;
        let p2 = this.point2;
        let p3 = object.point1;
        let p4 = object.point2;

        let denTemp = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
        let numTemp;

        numTemp = (p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x);
        let t = numTemp / denTemp;

        numTemp = (p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x);
        let u = -numTemp / denTemp;

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            // console.log(t, u);
            push();
            fill(255, 0, 0);
            textSize(50)
            text("HIT", w/2, h/2)
            // noLoop();
            pop();
            car1.x = w/2;
            car1.y = h/2;
        }
    }

    touch(object) {
        let p1 = this.point1;
        let p2 = this.point2;
        let p3 = object.point1;
        let p4 = object.point2;

        let denTemp = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
        let numTemp;

        numTemp = (p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x);
        let t = numTemp / denTemp;

        numTemp = (p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x);
        let u = -numTemp / denTemp;

        let px;
        let py;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            numTemp = (p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) - (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x);
            px = numTemp / denTemp;
            numTemp = (p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x);
            py = numTemp / denTemp;
            return { x: px, y: py };
        }

        return false;
    }

    draw(r, g, b, a) {
        push();
        stroke(r, g, b, a);
        strokeWeight(2);
        line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
        pop();
    }
}