class Blob  {
    constructor(x, y, r)   {
        this.x = x;
        this.y = y;
        this.r = r
        this.xVel = random(-speed, speed);
        this.yVel = random(-speed, speed);
    }

    update()    {
        if (this.x > w || this.x < 0)   {
            this.xVel = -this.xVel;
        }

        if (this.y > h || this.y < 0)   {
            this.yVel = -this.yVel;
        }

        this.x += this.xVel;
        this.y += this.yVel;
    }

    draw()  {
        ellipse(this.x, this.y, this.r/2, this.r/2);
    }
}