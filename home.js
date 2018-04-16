'use strict';
var dataObj = null;
document.addEventListener("DOMContentLoaded", function(event) {
var player = 1;
var lineColor = "#ddd";

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');
var canvasSize = 480;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);


var board = getInitialBoard("");
console.log(board);

//drawLines(10, lineColor, context, canvasSize, sectionSize);
    startGame();

canvas.addEventListener('mouseup', function (event) {
    if (player === 1) {
        player = 2;
    } else {
        player = 1;
    }

    var canvasMousePosition = getCanvasMousePosition(event, canvas);
    addPlayingPiece(canvasMousePosition, context, sectionSize, player);
    drawLines(10, lineColor, context, canvasSize, sectionSize);
});

});

function startGame(){
    let canvasText = document.getElementById("canvas-text");
    let waitFirst = {};
    canvasText.insertAdjacentHTML('beforeend', '<h3>How do you want to play?</h3>');
    canvasText.insertAdjacentHTML('beforeend', '<div class="canvas-text-button-wrapper">' +
        '<button id="onep" class="canvas-text-button">One player</button><button id="twop" ' +
        'class="canvas-text-button">Two players</button></div>');

    document.getElementById("onep").addEventListener("click", () => {
        waitFirst.playerCount = 1;
        console.log(waitFirst);
        canvasText.classList.add("hidden");
        canvasText.innerHTML = "";
        canvasText.classList.remove("hidden");
        canvasText.classList.add("show");
        canvasText.insertAdjacentHTML('beforeend', '<h3>Choose sign to play with:</h3>');
        canvasText.insertAdjacentHTML('beforeend', '<div class="canvas-text-button-wrapper">' +
            '<button id="iks" class="canvas-text-button">X</button><button id="ox" ' +
            'class="canvas-text-button">O</button></div>');
        document.getElementById("iks").style.marginLeft = "24%";
    });
}

function getInitialBoard (defaultValue) {
    var board = [];

    for (var x = 0;x < 3;x++) {
        board.push([]);

        for (var y = 0;y < 3;y++) {
            board[x].push(defaultValue);
        }
    }

    return board;
}

function addPlayingPiece (mouse, contekst, sSize, played) {
    var xCordinate;
    var yCordinate;

    for (var x = 0;x < 3;x++) {
        for (var y = 0;y < 3;y++) {
            xCordinate = x * sSize;
            yCordinate = y * sSize;

            if (
                mouse.x >= xCordinate && mouse.x <= xCordinate + sSize &&
                mouse.y >= yCordinate && mouse.y <= yCordinate + sSize
            ) {

                clearPlayingArea(xCordinate, yCordinate, contekst, sSize);

                if (played === 1) {
                    drawX(xCordinate, yCordinate, contekst, sSize);
                } else {
                    drawO(xCordinate, yCordinate, contekst, sSize);
                }
            }
        }
    }
}

function clearPlayingArea (xCordinate, yCordinate, contekst, sSize) {
    contekst.fillStyle = "#779c42";
    contekst.fillRect(
        xCordinate,
        yCordinate,
        sSize,
        sSize
    );
}
function drawO (xCordinate, yCordinate, contekst, sSize) {
    var halfSectionSize = (0.5 * sSize);
    var centerX = xCordinate + halfSectionSize;
    var centerY = yCordinate + halfSectionSize;
    var radius = (sSize - 100) / 2;
    var startAngle = 0 * Math.PI;
    var endAngle = 2 * Math.PI;

    contekst.lineWidth = 10;
    contekst.strokeStyle = "#01bBC2";
    contekst.beginPath();
    contekst.arc(centerX, centerY, radius, startAngle, endAngle);
    contekst.stroke();
}

function drawX (xCordinate, yCordinate, contekst, sSize) {
    contekst.strokeStyle = "#f1be32";

    contekst.beginPath();

    var offset = 50;
    contekst.moveTo(xCordinate + offset, yCordinate + offset);
    contekst.lineTo(xCordinate + sSize - offset, yCordinate + sSize - offset);

    contekst.moveTo(xCordinate + offset, yCordinate + sSize - offset);
    contekst.lineTo(xCordinate + sSize - offset, yCordinate + offset);

    contekst.stroke();
}

function drawLines (lineWidth, strokeStyle, contekst, cSize, sSize) {
    var lineStart = 4;
    var lineLength = cSize - 5;
    contekst.lineWidth = Number(lineWidth);
    contekst.lineCap = 'round';
    contekst.strokeStyle = strokeStyle;
    contekst.beginPath();

    /*
     * Horizontal lines
     */
    for (var y = 1;y <= 2;y++) {
        contekst.moveTo(lineStart, y * sSize);
        contekst.lineTo(lineLength, y * sSize);
    }

    /*
     * Vertical lines
     */
    for (var x = 1;x <= 2;x++) {
        contekst.moveTo(x * sSize, lineStart);
        contekst.lineTo(x * sSize, lineLength);
    }

    contekst.stroke();
}

function getCanvasMousePosition (event, can) {
    var rect = can.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}