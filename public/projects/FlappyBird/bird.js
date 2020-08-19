class bird    {
    constructor()   {
        this.x = 100;
        this.y = height/2;
        this.velocity = 0;
    }

    update(_G)    {
        this.velocity = this.velocity + _G;
        this.y = this.y + this.velocity;

        if (this.y > height)    {
            this.y = height;
            this.velocity = 0;
        }

        if (this.y < 0)    {
            this.y = 0;
            this.velocity = 0;
        }

        if (this.velocity > 15) {
            this.velocity = 15;
        }
    }

    jump()  {
        this.velocity = -8;
        return 0
    }

    show()  {
        ellipse(this.x, this.y, 30, 30);
    }
}
