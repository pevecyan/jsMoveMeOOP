window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var CANVAS_HEIGHT = 400;
var CANVAS_WIDTH = 800;

function resizeCanvas() {
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerHeight;
    if (CANVAS_WIDTH > 800) { CANVAS_WIDTH = 800; }
    if (CANVAS_HEIGHT * 2 > CANVAS_WIDTH) { CANVAS_HEIGHT = CANVAS_WIDTH / 2; }

    document.getElementById('gameCanvas').setAttribute('width', CANVAS_WIDTH);
    document.getElementById('gameCanvas').setAttribute('height', CANVAS_HEIGHT);

}
function start() {

    var canvas = document.getElementById('gameCanvas');
    var context = canvas.getContext('2d');//2D canvas context

    

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
    var startTime = null; //time, when looping started

    /*Game state control : 0 - menu; 1 - playing; 2 - game over*/
    var gameState = 0;

    //Player
    var player = new Player(30, 30, 0.02, CANVAS_WIDTH, CANVAS_HEIGHT);

    //World
    var world = new World(CANVAS_WIDTH, CANVAS_HEIGHT, player);


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
        

        world.update(currentTime - previousTime, context);
        player.update(currentTime, previousTime, gameState);
    }

    function draw() {
        context.fillStyle = "#7A7A7A";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        world.draw(context);
        player.draw(context);

    }
    

    /*functions called from input*/
    function touchMove(x, y) {
        if (world.gameState == 1) {
            if (!world.moving) { world.moving = true; }
            player.updateLocation(x, y);
        }
    }
    function touchEnd(x, y) {
        if (world.gameState == 0) { world.updateGameState(1); }
        if (world.gameState == 2 && world.player.dead) { world.updateGameState(0); }
    }
   
    requestAnimationFrame(gameLoop);
}