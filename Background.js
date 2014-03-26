function Background(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.widthRatio = canvasWidth / 20; //20 blocks in row on screen
    this.heightRatio = canvasHeight / 20;

    this.backLayer = [];
    this.frontLayer = [];

    this.backLayerGenerator = new BackgroundGenerator(0, 10, 14, 10);
    this.frontLayerGenerator = new BackgroundGenerator(0, 14, 18, 14);

    this.createBackground();
}

Background.prototype = {
    constructor: Background,
    update: function () {

        //moving backgrounds parallax
        for (var i = 0; i < this.frontLayer.length; i++) {
            this.frontLayer[i].x -= 0.2;
            if (this.frontLayer[i].x <= -this.frontLayer[i].width) { this.frontLayer.shift(); i--; }
        }
        for (var i = 0; i < this.backLayer.length; i++) {
            this.backLayer[i].x -= 0.1;
            if (this.backLayer[i].x <= -this.backLayer[i].width) { this.backLayer.shift(); i--; }
        }

        //Creating new background rectangles
        if (this.frontLayer.length < 21) {

            //Create new rectangle on front layer
            this.frontLayer[this.frontLayer.length] = new BackgroundRectangle(this.frontLayer[this.frontLayer.length-1].x+1, 0, 1, this.frontLayerGenerator.height + this.frontLayerGenerator.difference);
            this.frontLayerGenerator.difference = Math.floor((Math.random() * 3) - 1);
            if (this.frontLayerGenerator.height + this.frontLayerGenerator.difference > this.frontLayerGenerator.downLimit ||
                this.frontLayerGenerator.height + this.frontLayerGenerator.difference < this.frontLayerGenerator.upLimit) {
                this.frontLayerGenerator.difference = -this.frontLayerGenerator.difference;
            }
        }
        if (this.backLayer.length < 21) {

            //Create new rectangle on back layer
            this.backLayer[this.backLayer.length] = new BackgroundRectangle(this.backLayer[this.backLayer.length-1].x+1, 0, 1, this.backLayerGenerator.height + this.backLayerGenerator.difference);
            this.backLayerGenerator.difference = Math.floor((Math.random() * 3) - 1);
            if (this.backLayerGenerator.height + this.backLayerGenerator.difference > this.backLayerGenerator.downLimit ||
                this.backLayerGenerator.height + this.backLayerGenerator.difference < this.backLayerGenerator.upLimit) {
                this.backLayerGenerator.difference = -this.backLayerGenerator.difference;
            }
        }
    },
    draw: function (context) {
        //frontLayer
        context.fillStyle = "#404040";
        for (var i = 0; i < this.frontLayer.length; i++) {
            context.fillRect(this.frontLayer[i].x * this.widthRatio,
                this.frontLayer[i].y,
                this.frontLayer[i].width * this.widthRatio,
                this.frontLayer[i].height * this.heightRatio);

        }
        //backLayer
        context.fillStyle = "#000000";
        for (var i = 0; i < this.backLayer.length; i++) {
            context.fillRect(this.backLayer[i].x * this.widthRatio,
                this.backLayer[i].y,
                this.backLayer[i].width * this.widthRatio,
                this.backLayer[i].height * this.heightRatio);

        }
    },
    createBackground: function () {
        //frontLayer generation
        for(var i = 0; i < 20; i++){
            this.frontLayer[i] = new BackgroundRectangle(1 * i, 0, 1, this.frontLayerGenerator.height + this.frontLayerGenerator.difference);
            this.frontLayerGenerator.difference = Math.floor((Math.random() * 3) - 1);
            if (this.frontLayerGenerator.height + this.frontLayerGenerator.difference > this.frontLayerGenerator.downLimit ||
                this.frontLayerGenerator.height + this.frontLayerGenerator.difference < this.frontLayerGenerator.upLimit)
            {
                this.frontLayerGenerator.difference = -this.frontLayerGenerator.difference;
            }
        }

        //backLayer generation
        for (var i = 0; i < 20; i++) {
            this.backLayer[i] = new BackgroundRectangle(1 * i, 0, 1, this.backLayerGenerator.height + this.backLayerGenerator.difference);
            this.backLayerGenerator.difference = Math.floor((Math.random() * 3) - 1);
            if (this.backLayerGenerator.height + this.backLayerGenerator.difference > this.backLayerGenerator.downLimit ||
                this.backLayerGenerator.height + this.backLayerGenerator.difference < this.backLayerGenerator.upLimit)
            {
                this.backLayerGenerator.difference = -this.backLayerGenerator.difference;
            }
        }

    }

}

function BackgroundRectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function BackgroundGenerator(difference, height, upLimit, downLimit) {
    this.difference = difference;
    this.height = height;
    this.upLimit = upLimit;
    this.downLimit = downLimit;
}