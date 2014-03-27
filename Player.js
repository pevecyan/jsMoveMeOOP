function Player(x, y, speed, canvasWidth, canvasHeight) {
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;

    this.widthRatio = canvasWidth / 400;
    this.heightRatio = canvasHeight / 200;

    this.x = canvasWidth/2 - 20*this.widthRatio/2;
    this.y = canvasHeight / 2 - 20 * this.heightRatio / 2;

    //collision detection rectangle
    this.rectangle = new Rectangle((this.x - 10 * this.widthRatio), (this.y - 10 * this.heightRatio), 20 * this.widthRatio, 20 * this.heightRatio);

    this.speed = speed;

    this.gameState = 0;
    
    this.dead = false;

}

Player.prototype = {
    constructor: Player,
    updateLocation: function (x, y) {
        this.x = x;
        this.y = y;

        //Edge detection
        if (x > this.canvasWidth-this.rectangle.width/2) {
            this.x = this.canvasWidth - this.rectangle.width/2;
        }
        if (x < 0 + this.rectangle.width/2) {
            this.x = this.rectangle.width/2;
        }
        if (y > this.canvasHeight-this.rectangle.height/2) {
            this.y = this.canvasHeight - this.rectangle.height / 2;
            if (this.gameState == 2) {
                this.dead = true;
            }
        }
        if (y < 0 + this.rectangle.height/2) {
            this.y = this.rectangle.height / 2;
        }

        //setting coordiantes of collision rectangle
        this.rectangle.x = (this.x - 10*this.widthRatio);
        this.rectangle.y = (this.y - 10 * this.heightRatio);
    },
    draw: function (context) {
        //HEAD
        context.fillStyle = "#FFE97F";
        context.fillRect(this.x - 10 * this.widthRatio, this.y - 10 * this.heightRatio,
            20 * this.widthRatio, 20 * this.heightRatio);
        //BODY
        context.fillRect(this.x - 35 * this.widthRatio, this.y + 5 * this.heightRatio,
            30 * this.widthRatio, 5 * this.heightRatio);
        //PANTS
        context.fillStyle = "#0026FF";
        context.fillRect(this.x - 20 * this.widthRatio, this.y + 5 * this.heightRatio,
            5 * this.widthRatio, 5 * this.heightRatio);

        //glasses
        context.fillStyle = "#7F0000";
        context.fillRect(this.x - 10 * this.widthRatio, this.y - (10 - 8) * this.heightRatio,
            20 * this.widthRatio, 3 * this.heightRatio);
        context.fillRect(this.x - (10 - 3) * this.widthRatio, this.y - (10 - 7) * this.heightRatio,
            17 * this.widthRatio, 1 * this.heightRatio);
        context.fillRect(this.x - (10 - 8) * this.widthRatio, this.y - (10 - 6) * this.heightRatio,
            12 * this.widthRatio, 1 * this.heightRatio);

        context.fillStyle = "#00FFFF";
        context.fillRect(this.x - (10 - 16) * this.widthRatio, this.y - (10 - 7) * this.heightRatio,
            4 * this.widthRatio, 3 * this.heightRatio);

        context.fillStyle = "#000000";
        context.fillRect(this.x - (10 - 17) * this.widthRatio, this.y - (10 - 16) * this.heightRatio,
            3 * this.widthRatio, 2 * this.heightRatio);
    },
    update: function (currentTime, previousTime, gameState) {
        if (this.gameState == 0) {
            this.updateLocation(this.x, Math.sin(currentTime / 400)*50+ this.canvasHeight/2); // demo moving on start
        }
    },
    updateGameState: function (gameState) {
        this.gameState = gameState;
    }
}

function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
