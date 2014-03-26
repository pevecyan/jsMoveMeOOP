window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function start() {

    var canvas = document.getElementById('gameCanvas');
    var context = canvas.getContext('2d');//2D canvas context

    var CANVAS_HEIGHT = 400;
    var CANVAS_WIDTH = 800;

    /*INPUT EVENTS*/
    //touchmove
    canvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            touchMove(touch.pageX, touch.pageY);
        }
    }, false);
    //touchend
    canvas.addEventListener('touchend', function (event) {
        var touch = event.changedTouches[0];
        touchEnd(touch.pageX, touch.pageY);
    }, false);




    /*Time Control variables*/
    var currentTime = 0; // current Time inside of loop
    var previousTime = 0; // time inside of loop one cylcle before
    var startTime; //time, when looping started

    /*Game state control : 0 - menu; 1 - playing; 2 - game over*/
    var gameState = 0;

    //Background
    var background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT);
    
    //Player
    var player = new Player(30, 30, 3, CANVAS_WIDTH, CANVAS_HEIGHT);

    //Obstacles


    function gameLoop(gameTime) {
        if (startTime === null) {
            startTime = gameTime;
        }
        currentTime = gameTime - startTime;

        update();
        draw();

        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
    }

    function update() {
        background.update();

    }

    function draw() {
        context.fillStyle = "#7A7A7A";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        background.draw(context);
        player.draw(context);

    }
    

    /*functions called from input*/
    function touchMove(x, y) {
        player.updateLocation(x,y);
    }

    function touchEnd(x, y) {

    }
   
    requestAnimationFrame(gameLoop);
}