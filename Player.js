function Player(x, y, speed) {
    this.x = x;
    this.y = y;

    this.speed = speed;
}

Player.prototype = {
    constructor: Player,
    updateLocation: function (x, y){
        this.x = x;
        this.y = y;
    },
    draw: function (context) {
        //HEAD
        context.fillStyle = "#FFE97F";
        context.fillRect(this.x - 10, this.y - 10, 20, 20);
        //BODY
        context.fillRect(this.x - 35, this.y + 5, 30, 5);
        //PANTS
        context.fillStyle = "#0026FF";
        context.fillRect(this.x - 20, this.y + 5, 5, 5);

        //glasses
        context.fillStyle = "#7F0000";
        context.fillRect(this.x - 10, this.y - 10 + 8, 20, 3);
        context.fillRect(this.x - 10 + 3, this.y - 10 + 7, 17, 1);
        context.fillRect(this.x - 10 + 8, this.y - 10 + 6, 12, 1);

        context.fillStyle = "#00FFFF";
        context.fillRect(this.x - 10 + 16, this.y - 10 + 7, 4, 3);

        context.fillStyle = "#000000";
        context.fillRect(this.x - 10 + 17, this.y - 10 + 16, 3, 2);
    }
}
