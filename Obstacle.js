function Obstacle(x, y, width, height, widthRation, heightRation) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.widthRatio = widthRation;
    this.heightRatio = heightRation;

    this.rectangle = new Rectangle(this.x * 80 * this.widthRatio, this.y * 10 * this.heightRatio,
            this.width * 20 * this.widthRatio, this.height * 10 * this.heightRatio);
}

Obstacle.prototype = {
    constructor: Obstacle,
    draw: function (context, widthRatio, heightRatio) {
        context.fillStyle = "#C0C0C0";
        context.fillRect(this.x*80 * widthRatio, this.y * 10* heightRatio,
            this.width*20 * widthRatio, this.height*10 * heightRatio);
    },
    collide: function (b, context) {
        context.fillStyle = "#FF3A6F"
        context.fillRect(b.x, b.y, b.width, b.height);

        return this.rectangle.x < b.x + b.width &&
                    this.rectangle.x + this.rectangle.width > b.x &&
                    this.rectangle.y < b.y + b.height &&
                    this.rectangle.y + this.rectangle.height > b.y;
    }
}

function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}