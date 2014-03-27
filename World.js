function World(canvasWidth, canvasHeight, player) {
    this.gameState = 0;

    this.player = player;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.widthRatio = canvasWidth / 400;
    this.heightRatio = canvasHeight / 200;
    //Background
    this.background = new Background(canvasWidth, canvasHeight);

    //Obstacles
    this.obstacles = [];

    this.createObstacles();

    //Text
    this.textLocationX = 100;
    this.textLocationY = 100;

    this.textOffset = 0;

    this.moving = false;
}

World.prototype = {
    constructor: World,
    draw: function (context) {
        this.background.draw(context);
        this.drawMoon(context);
        if (this.gameState == 0) {
            context.fillStyle = "#A0A0A0";
            context.font = 16*this.widthRatio + "pt Arial";
            context.fillText("TAP ANYWHERE TO START", this.textLocationX-90 + this.textOffset, this.textLocationY);
        }
        else if (this.gameState == 1) {
            context.fillStyle = "#A0A0A0";
            context.font = 16 * this.widthRatio + "pt Arial";
            context.fillText("TOUCH AND HOLD", this.textLocationX - 90 + this.textOffset*80*this.widthRatio, this.textLocationY);

            for (var i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].draw(context, this.widthRatio, this.heightRatio);
            }
        }else if(this.gameState == 2){
            context.fillStyle = "#A0A0A0";
            context.font = 16 * this.widthRatio + "pt Arial";
            context.fillText("GAME OVER", this.textLocationX - 90 + this.textOffset * 80 * this.widthRatio, this.textLocationY);

            for (var i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].draw(context, this.widthRatio, this.heightRatio);
            }
        }
    },
    update: function (elapsedTime, context) {
        if (this.gameState != 2) {
            this.background.update();
        }
        if (this.gameState == 0) {

        }
        else if (this.gameState == 1) {
   
            if (this.moving) {
                if (this.obstacles.length < 10) {
                    var height = Math.floor((Math.random() * 7) + 3);
                    if (Math.floor((Math.random() * 2)) == 1) {
                        this.obstacles[this.obstacles.length] = new Obstacle(this.obstacles[this.obstacles.length - 1].x + 1, 0, 1, height, this.widthRatio, this.heightRatio);
                    } else {
                        this.obstacles[this.obstacles.length] = new Obstacle(this.obstacles[this.obstacles.length - 1].x + 1, 20 - height, 1, height, this.widthRatio, this.heightRatio);
                    }
                }

                for (var i = 0; i < this.obstacles.length; i++) {
                    this.obstacles[i].x -= this.player.speed * (elapsedTime / 10);
                    this.obstacles[i].rectangle.x = this.obstacles[i].x * 80 * this.widthRatio;
                    if (this.obstacles[i].collide(this.player.rectangle, context)) {
                        //ONCOLLIDE EVENT
                        this.updateGameState(2);
                    }
                    if (this.obstacles[i].x < 0) { this.obstacles.shift(); i--; }

                }
                
                if (!(this.textOffset < -this.canvasWidth)) {
                    this.textOffset -= this.player.speed * (elapsedTime / 10)
                }
            } else if(this.gameState == 2) {
                this.player.updateLocation(this.player.x, this.player.y + 1);
            }
        }
    },
    createObstacles: function () {
        for (var i = 0; i < 10; i++) {
            var height = Math.floor((Math.random() * 7) + 3);
            if (Math.floor((Math.random() * 2)) == 1) {
                this.obstacles[i] = new Obstacle(1 * i + this.canvasWidth / 100, 0, 1, height, this.widthRatio, this.heightRatio);
            } else {
                this.obstacles[i] = new Obstacle(1 * i + this.canvasWidth / 100, 20 - height, 1, height, this.widthRatio, this.heightRatio);
            }
            
        }
    },
    drawMoon: function (context) {
        context.fillStyle = "#373737";
        context.fillRect(this.canvasWidth - 100 * this.widthRatio, 5 * this.heightRatio, 50 * this.widthRatio, 50 * this.heightRatio);
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.canvasWidth - 100 * this.widthRatio + 10 * this.widthRatio, 15 * this.heightRatio, 30 * this.widthRatio, 30 * this.heightRatio);
    },
    updateGameState: function (gameState) {
        this.gameState = gameState;
        this.player.updateGameState(gameState);
    }
}
