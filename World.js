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

    //if obstacles moving
    this.moving = false;

    this.distance = 0;

    this.elapsedLevelTime = 0;
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

            //drawing obstacles
            for (var i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].draw(context, this.widthRatio, this.heightRatio);
            }
        } else if (this.gameState == 2) {
            //drawing obstacles
            for (var i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].draw(context, this.widthRatio, this.heightRatio);
            }

            context.fillStyle = "#FF0000";
            context.font = "700 " +16 * this.widthRatio + "pt Arial";
            context.fillText("GAME OVER", this.textLocationX - 90, this.textLocationY);

            context.fillText("Distance " + Math.floor(this.distance)+ " meters", this.textLocationX - 90, this.textLocationY + 50);

            
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

                //speeding up, after every 10 secs;
                this.elapsedLevelTime += elapsedTime;
                if (this.elapsedLevelTime > 10000) {
                    this.elapsedLevelTime = 0;
                    this.player.speed += 0.001;
                }

                //Creating obstacles 
                if (this.obstacles.length < 10) {
                    var height = Math.floor((Math.random() * 7) + 3);
                    if (Math.floor((Math.random() * 2)) == 1) {
                        this.obstacles[this.obstacles.length] = new Obstacle(this.obstacles[this.obstacles.length - 1].x + 1, 0,
                            1, height, this.widthRatio, this.heightRatio);
                    } else {
                        this.obstacles[this.obstacles.length] = new Obstacle(this.obstacles[this.obstacles.length - 1].x + 1, 20 - height,
                            1, height, this.widthRatio, this.heightRatio);
                    }
                }

                //moving blocks and detecting collision with player
                for (var i = 0; i < this.obstacles.length; i++) {
                    this.obstacles[i].x -= this.player.speed * (elapsedTime / 10);
                    this.obstacles[i].rectangle.x = this.obstacles[i].x * 80 * this.widthRatio;
                    if (this.obstacles[i].collide(this.player.rectangle, context)) {
                        //ONCOLLIDE EVENT
                        this.updateGameState(2);
                    }
                    if (this.obstacles[i].x < 0) { this.obstacles.shift(); i--; }

                }
                //Distance count
                this.distance += this.player.speed * (elapsedTime);

                //Moving text on starting game
                if (!(this.textOffset < -this.canvasWidth)) {
                    this.textOffset -= this.player.speed * (elapsedTime / 10)
                }
            } 
        } else if (this.gameState == 2) {
            //player falling after collision
            this.player.updateLocation(this.player.x, this.player.y + 5);
        }
    },
    createObstacles: function () {
        for (var i = 0; i < 10; i++) {
            //create block of random height and position
            var height = Math.floor((Math.random() * 7) + 3);
            if (Math.floor((Math.random() * 2)) == 1) {
                this.obstacles[i] = new Obstacle(1 * i + 5, 0, 1, height, this.widthRatio, this.heightRatio);
            } else {
                this.obstacles[i] = new Obstacle(1 * i + 5, 20 - height, 1, height, this.widthRatio, this.heightRatio);
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
        if (this.gameState == 2 && gameState == 0) {
            //reset vars
            this.obstacles = [];
            this.createObstacles();
            this.distance = 0;
            this.textOffset = 0;
            this.player.speed = 0.02;
            this.elapsedLevelTime = 0;
            this.player.dead = false;
        }
        this.gameState = gameState;
        this.player.updateGameState(gameState);
        
    }
}
