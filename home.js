'use strict';
var dataObj = null;
var player = null;
var lineColor = "#ddd";
var canvasSize = 480;
var sectionSize = canvasSize / 3;
var board = getInitialBoard("");
var boardAlt = [];
var boardAltPrevPrev = null;
var contextGlobal = null;
var playedTemp = null;
var lineWidth = 10;
var posSaved = null;
//za kad igra ai
for (let i = 0; i < 9; i++)
{
    boardAlt.push("");
}
console.log(board);
var counter = 0;
var countAlert = 0;
var tempCount = 0;
var choice;

document.addEventListener("DOMContentLoaded", function(event) {
    var canvas = document.getElementById('tic-tac-toe-board');
    var context = canvas.getContext('2d');
    contextGlobal = context;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    context.translate(0.5, 0.5);

    startGame(context);

    canvas.addEventListener('mouseup', function (event) {
       if(dataObj.playerCount !== Number(1) && counter !== 0) {
               if (player === "x") {
                   player = "o";
               } else {
                   player = "x";
               }
       } else {
           player = dataObj.mark;
       }

       //pre nego da igrac odigra
       boardAltPrevPrev = boardAlt;
        tempCount = counter;
        if(counter !== 9)
            counter++;
        console.log(counter);

        var canvasMousePosition = getCanvasMousePosition(event, canvas);
        console.log(canvasMousePosition);
        addPlayingPiece(canvasMousePosition, context, sectionSize, player);
        drawLines(lineWidth, lineColor, context, canvasSize, sectionSize);

    });

});

//pocetak igre i pocetni ekran
function startGame(contekst){
    let canvasText = document.getElementById("canvas-text");
    let waitFirst = {};
    if(canvasText.classList.hasOwnProperty("hidden"))
        canvasText.classList.remove("hidden");

    canvasText.insertAdjacentHTML('beforeend', '<h3>How do you want to play?</h3>');
    canvasText.insertAdjacentHTML('beforeend', '<div class="canvas-text-button-wrapper">' +
        '<button id="onep" class="canvas-text-button">One player</button><button id="twop" ' +
        'class="canvas-text-button">Two players</button></div>');

    document.getElementById("onep").addEventListener("click", () => {
        waitFirst.playerCount = 1;

        canvasText.classList.add("hidden");
        canvasText.innerHTML = "";
        canvasText.classList.remove("hidden");
        canvasText.classList.add("show");
        canvasText.insertAdjacentHTML('beforeend', '<h3>Choose sign to play with:</h3>');
        canvasText.insertAdjacentHTML('beforeend', '<div class="canvas-text-button-wrapper">' +
            '<button id="iks" class="canvas-text-button">X</button><button id="ox" ' +
            'class="canvas-text-button">O</button></div>');
        canvasText.insertAdjacentHTML('beforeend', '<div class="canvas-text-button-wrapper"><button id="backit" ' +
            'class="canvas-text-button-back canvas-text-button"><- Back</button></div>');
        document.getElementById("iks").style.marginLeft = "24%";

        document.getElementById("iks").addEventListener("click", () => {
            waitFirst.mark = "x";
            dataObj = waitFirst;
            player = "x";
            canvasText.classList.add("hidden");
            canvasText.classList.remove("show");
            canvasText.style.position = "static";
            canvasText.style.display = "none";
            canvasText.innerHTML = "";
            console.log(waitFirst);
            drawLines(10, lineColor, contekst, canvasSize, sectionSize);
        });

        document.getElementById("ox").addEventListener("click", () => {
            waitFirst.mark = "o";
            dataObj = waitFirst;
            player = "o";
            canvasText.classList.add("hidden");
            canvasText.classList.remove("show");
            canvasText.style.position = "static";
            canvasText.style.display = "none";
            canvasText.innerHTML = "";
            console.log(waitFirst);
            drawLines(10, lineColor, contekst, canvasSize, sectionSize);
        });

        document.getElementById("backit").addEventListener("click", () => {
            canvasText.innerHTML = "";
            startGame();
        });

    });

    document.getElementById("twop").addEventListener("click", () => {
        waitFirst.playerCount = 2;

        canvasText.classList.add("hidden");
        canvasText.innerHTML = "";
        canvasText.classList.remove("hidden");
        canvasText.classList.add("show");
        canvasText.insertAdjacentHTML('beforeend', '<h3>Choose sign to play with:</h3>');
        canvasText.insertAdjacentHTML('beforeend', '<div class="canvas-text-button-wrapper">' +
            '<button id="iks2" class="canvas-text-button">X</button><button id="ox2" ' +
            'class="canvas-text-button">O</button></div>');
        canvasText.insertAdjacentHTML('beforeend', '<div class="canvas-text-button-wrapper"><button id="backit2" ' +
            'class="canvas-text-button-back canvas-text-button"><- Back</button></div>');
        document.getElementById("iks2").style.marginLeft = "24%";

        document.getElementById("iks2").addEventListener("click", () => {
            waitFirst.mark = "x";
            dataObj = waitFirst;
            player = "x";
            canvasText.classList.add("hidden");
            canvasText.classList.remove("show");
            canvasText.style.position = "static";
            canvasText.style.display = "none";
            canvasText.innerHTML = "";
            console.log(waitFirst);
            drawLines(10, lineColor, contekst, canvasSize, sectionSize);
        });

        document.getElementById("ox2").addEventListener("click", () => {
            waitFirst.mark = "o";
            dataObj = waitFirst;
            player = "o";
            canvasText.classList.add("hidden");
            canvasText.classList.remove("show");
            canvasText.style.position = "static";
            canvasText.style.display = "none";
            canvasText.innerHTML = "";
            console.log(waitFirst);
            drawLines(10, lineColor, contekst, canvasSize, sectionSize);
        });

        document.getElementById("backit2").addEventListener("click", () => {
            canvasText.innerHTML = "";
            startGame();
        });

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

                if(board[y][x] === "") {
                    board[y][x] = played;
                    console.log(board);
                    if(y === 0) {
                        if(board[y][x] !== boardAlt[x] && boardAlt[x] === ""){
                            boardAlt[x] = played;
                            if (played === "x") {
                                drawX(xCordinate, yCordinate, contekst, sSize);
                            } else {
                                drawO(xCordinate, yCordinate, contekst, sSize);
                            }
                        }
                    }
                    else if(y === 1) {
                        if(board[y][x] !== boardAlt[3+x] && boardAlt[3+x] === ""){
                            boardAlt[3+x] = played;
                            if (played === "x") {
                                drawX(xCordinate, yCordinate, contekst, sSize);
                            } else {
                                drawO(xCordinate, yCordinate, contekst, sSize);
                            }
                        }
                    }
                    else {
                        if(board[y][x] !== boardAlt[6+x] && boardAlt[6+x] === ""){
                            boardAlt[6+x] = played;
                            if (played === "x") {
                                drawX(xCordinate, yCordinate, contekst, sSize);
                            } else {
                                drawO(xCordinate, yCordinate, contekst, sSize);
                            }
                        }
                    }
                    console.log(boardAlt);

                    /*if(counter === 9){
                        winCheck(board,contekst, sSize);
                    }*/
                }
                else
                {
                    if(counter < 9){
                        countAlert++;
                        //tempCount = counter;
                        counter -= 1;
                        console.log(counter);
                        alert("Choose other field, this field is already filled!");

                    }
                }
            }
        }
    }

    winCheck(boardAlt,contekst, sSize);

    //sta radi ai
    if(dataObj.playerCount === 1 && counter < 9){
        if (played === "x") {
            played = "o";
        } else {
            played = "x";
        }

        if(counter !== 9)
            counter++;

        playedTemp = played;
        MakeComputerMove(contekst, sSize, played);
    }
}

function clearPlayingArea (xCordinate, yCordinate, contekst, sSize, colorFill) {
    contekst.fillStyle = colorFill;
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
    contekst.strokeStyle = String("#01bBC2");
    contekst.beginPath();
    contekst.arc(centerX, centerY, radius, startAngle, endAngle);
    contekst.stroke();
}

function drawX (xCordinate, yCordinate, contekst, sSize) {
    contekst.strokeStyle = String("#f1be32");

    contekst.beginPath();

    var offset = 50;
    contekst.moveTo(xCordinate + offset, yCordinate + offset);
    contekst.lineTo(xCordinate + sSize - offset, yCordinate + sSize - offset);

    contekst.moveTo(xCordinate + offset, yCordinate + sSize - offset);
    contekst.lineTo(xCordinate + sSize - offset, yCordinate + offset);

    contekst.stroke();
}

function drawLines (lineWidthh, strokeStyle, contekst, cSize, sSize) {
    if(lineWidthh === undefined)
        lineWidthh = lineWidth;
    var lineStart = 4;
    var lineLength = cSize - 5;
    contekst.lineWidth = lineWidthh;
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

function winCheck(recBoard, contekst, sSize){

        //if (positions.length !== 0){
            /*for (let i = 0; i < 3; i++) {
                let xCordinate = positions[i].y * sSize;
                let yCordinate = positions[i].x * sSize;

                clearPlayingArea(xCordinate, yCordinate, contekst, sSize, "#dd7373");

                if (positions[3].el === "x") {
                    drawX(xCordinate, yCordinate, contekst, sSize);
                } else {
                    drawO(xCordinate, yCordinate, contekst, sSize);
                }
            }*/

            //alert("The winner is " + positions[3].el);
            /*if(positions[3].el === "x") {
                return 2;
            } else {
                return 3;
            }
        } else {
            return 0;
        }*/

    for (let i = 0; i <= 6; i += 3)
    {
        if (recBoard[i] === "x" && recBoard[i + 1] === "x" && recBoard[i + 2] === "x")
            return 2;
        if (recBoard[i] === "o" && recBoard[i + 1] === "o" && recBoard[i + 2] === "o")
            return 3;
    }

    // Check for vertical wins
    for (let i = 0; i <= 2; i++)
    {
        if (recBoard[i] === "x" && recBoard[i + 3] === "x" && recBoard[i + 6] === "x")
            return 2;
        if (recBoard[i] === "o" && recBoard[i + 3] === "o" && recBoard[i + 6] === "o")
            return 3;
    }

    // Check for diagonal wins
    if ((recBoard[0] === "x" && recBoard[4] === "x" && recBoard[8] === "x") ||
        (recBoard[2] === "x" && recBoard[4] === "x" && recBoard[6] === "x"))
        return 2;

    if ((recBoard[0] === "o" && recBoard[4] === "o" && recBoard[8] === "o") ||
        (recBoard[2] === "o" && recBoard[4] === "o" && recBoard[6] === "o"))
        return 3;

    // Check for tie
    for (let i = 0; i < 9; i++)
    {
        if (recBoard[i] !== "x" && recBoard[i] !== "o")
            return 0;
    }
    return 1;
}

function minimax(tempBoardGame, depth, contekst, sSize, played) {
    if(contekst === undefined)
        contekst = contextGlobal;
    if(sSize === undefined)
        sSize = sectionSize;
    if(played === undefined)
        played = playedTemp;
    if (winCheck(tempBoardGame, contekst, sSize) !== 0)
        return score(tempBoardGame, depth, contekst, sSize);

    depth+=1;
    var scores = new Array();
    var moves = new Array();
    var availableMoves = GetAvailableMoves(tempBoardGame);
    //console.log(availableMoves);
    var move, possible_game;
    for(var i=0; i < availableMoves.length; i++) {
        move = availableMoves[i];
        possible_game = GetNewState(move, tempBoardGame);
        scores.push(minimax(possible_game, depth));
        moves.push(move);
        tempBoardGame = UndoMove(tempBoardGame, move);
    }

    var max_score, max_score_index, min_score,
        min_score_index;
    if (played === "x") {
        max_score = Math.max.apply(Math, scores);
        max_score_index = scores.indexOf(max_score);
        choice = moves[max_score_index];
        return scores[max_score_index];

    } else {
        min_score = Math.min.apply(Math, scores);
        min_score_index = scores.indexOf(min_score);
        choice = moves[min_score_index];
        return scores[min_score_index];
    }
}

function MakeComputerMove(contekst, sSize, played)
{
    if(contekst === undefined)
        contekst = contextGlobal;
    if(sSize === undefined)
        sSize = sectionSize;
    if(played === undefined)
        played = playedTemp;
    var positions = [];
    let boardAltPrev = boardAlt;
    minimax(boardAlt, 0);
    console.log(boardAlt);
    var move = choice;
    boardAlt[move] = played;
    for(let j = 0; j<boardAlt.length; j++){
        if(boardAltPrev[j] !== "" && boardAltPrev[j] !== boardAlt[j]){
            boardAlt = boardAltPrevPrev;
            counter--;
        }
    }
    choice = [];
    for(let i = 0; i < boardAlt.length; i++){

        switch (i) {
            case 0:
                positions.push({x: 0, y: 0, el: boardAlt[i]});
                //board[positions[i].x][positions[i].y] = positions[i].el;
                break;
            case 1:
                positions.push({x: 0, y: 1, el: boardAlt[i]});
                //board[positions[i].x][positions[i].y] = positions[i].el;
                break;
            case 2:
                positions.push({x: 0, y: 2, el: boardAlt[i]});
                //board[positions[i].x][positions[i].y] = positions[i].el;
                break;
            case 3:
                positions.push({x: 1, y: 0, el: boardAlt[i]});
                //board[positions[i].x][positions[i].y] = positions[i].el;
                break;
            case 4:
                positions.push({x: 1, y: 1, el: boardAlt[i]});
                //board[positions[i].x][positions[i].y] = positions[i].el;
                break;
            case 5:
                positions.push({x: 1, y: 2, el: boardAlt[i]});
                //board[positions[i].x][positions[i].y] = positions[i].el;
                break;
            case 6:
                positions.push({x: 2, y: 0, el: boardAlt[i]});
                //board[positions[i].x][positions[i].y] = positions[i].el;
                break;
            case 7:
                positions.push({x: 2, y: 1, el: boardAlt[i]});
                //board[positions[i].x][positions[i].y] = positions[i].el;
                break;
            case 8:
                positions.push({x: 2, y: 2, el: boardAlt[i]});
                //board[positions[i].x][positions[i].y] = positions[i].el;
                break;
        }

    }

    if (positions.length !== 0) {

        console.log(positions);
        posSaved = positions;
        console.log(board);

        for(let i = 0; i<positions.length; i++) {
            let xCordinate = positions[i].y * sSize;
            let yCordinate = positions[i].x * sSize;

            clearPlayingArea(xCordinate, yCordinate, contekst, sSize, "#779c42");

            if (positions[i].el === "x") {
                drawX(xCordinate, yCordinate, contekst, sSize);
            } else if(positions[i].el === "o") {
                drawO(xCordinate, yCordinate, contekst, sSize);
            } else {
                clearPlayingArea(xCordinate, yCordinate, contekst, sSize, "#779c42");
            }
        }
    }

    winCheck(boardAlt,contekst, sSize);
}

function score(game, depth, contekst, sSize) {
    var score = winCheck(game, contekst, sSize);
    if (score === 1)
        return 0;
    else if (score === 2)
        return depth-10;
    else if (score === 3)
        return 10-depth;
}

function GetAvailableMoves(game) {
    var possibleMoves = new Array();
    for (var i = 0; i < 9; i++)
        if (game[i] === "")
            possibleMoves.push(i);
    return possibleMoves;
}

function GetNewState(move, game) {
    var piece = dataObj.mark;
    game[move] = piece;
    return game;
}

function UndoMove(game, move) {
    game[move] = "";
    ChangeTurn();
    return game;
}

function ChangeTurn(played) {
    if (played === "x") {
        played = "o";
    } else {
        played = "x";
    }
    return played;
}