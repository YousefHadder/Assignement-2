var ctx = null;
var Canvas = null;

var snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 }
];

var dx = 10;
var dy = 0;
var x = -1;
var y = -1;

score = 0;

function init() {
    document.hasFocus = true;
    document.onkeydown = function (event) {
        const keycode = event.keyCode;
        const L = 37;
        const U = 38;
        const R = 39;
        const D = 40;
        if (keycode === L && !(dx === 10)) {
            dx = -10;
            dy = 0;
        } else if (keycode === R && !(dx === -10)) {
            dx = 10;
            dy = 0;
        } else if (keycode === U && !(dy === 10)) {
            dx = 0;
            dy = -10;
        } else if (keycode === D && !(dy === -10)) {
            dx = 0;
            dy = 10;
        }
    };
    Canvas = document.getElementById("Game");
    ctx = Canvas.getContext("2d");
    createFood();
    main();
}
function main() {
    if (TestSnakeCollisionOrOutOfBound()) {
        alert("Your Score is: " + score);
        return;
    }
    setTimeout(function () {
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, 150)
}
function TestSnakeCollisionOrOutOfBound() {
    for (let i = 4; i < snake.length; i += 1)
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y)
            return true;
    if (snake[0].x < 0 || snake[0].y < 0 || snake[0].x > Canvas.width - 10 || snake[0].y > Canvas.height - 10)
        return true;
    return false;
}
function Rand(max) {
    return Math.round((Math.random() * max) / 10) * 10;
}
function createFood() {
    x = Rand(Canvas.width - 10);
    y = Rand(Canvas.height - 10);
    snake.forEach(TestFoodOnSnake);
}
function TestFoodOnSnake(snakePart) {
    const Test = (snakePart.x == x && snakePart.y == y)
    if (Test)
        createFood();
}
function drawFood() {
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "darkyellow";
    ctx.fillRect(x, y, 10, 10);
    ctx.strokeRect(x, y, 10, 10);
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(newHead);
    if (!(newHead.x == x && newHead.y == y)) {
        const tail = snake.pop();
        ctx.fillStyle = "black"
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillRect(tail.x, tail.y, 10, 10);
        ctx.strokeRect(tail.x, tail.y, 10, 10);
    } else {
        score += 10;
        document.getElementById("Score").innerHTML = score;
        createFood();
    }
}
function drawSnake() {
    snake.forEach(drawSnakePart);
}
function drawSnakePart(snakePart) {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}