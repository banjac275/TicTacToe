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
var tableCount = 0;
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

    document.getElementById("pressRestart").addEventListener("click", () => {
        document.getElementById("canvas-text").innerHTML = "";
        counter = 0;
        clearPlayingArea(0, 0, contextGlobal, canvasSize, "#779c42");
        document.getElementById("score-wrapper").classList.add("hidden");
        document.getElementById("score-wrapper").innerHTML = "";
        document.getElementById("canvas-text").style.position = "absolute";
        document.getElementById("canvas-text").style.display = "block";
        startGame(context);
    });

});

//pocetak igre i pocetni ekran
function startGame(contekst){
    let canvasText = document.getElementById("canvas-text");
    let infodiv = document.getElementById("score-wrapper-info");
    let waitFirst = {};
    let scoreText = document.getElementById("score-wrapper");
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
            scoreText.classList.remove("hidden");
            scoreText.insertAdjacentHTML('beforeend', '<table class="table"><thead><tr>' +
                '<th>#</th><th>Human - X</th><th>AI - O</th></tr></thead><tbody id="tablebody"></tbody></table>');

            if(infodiv.classList.hasOwnProperty("hidden"))
                infodiv.classList.remove("hidden");

            infodiv.style.display = "inline-block";
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
            scoreText.classList.remove("hidden");
            scoreText.insertAdjacentHTML('beforeend', '<table class="table"><thead><tr>' +
                '<th>#</th><th>Human - O</th><th>AI - X</th></tr></thead><tbody id="tablebody"></tbody></table>');

            if(infodiv.classList.hasOwnProperty("hidden"))
                infodiv.classList.remove("hidden");

            infodiv.style.display = "block";
        });

        document.getElementById("backit").addEventListener("click", () => {
            canvasText.innerHTML = "";
            startGame(contekst);
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
            scoreText.classList.remove("hidden");
            scoreText.insertAdjacentHTML('beforeend', '<table class="table"><thead><tr>' +
                '<th>#</th><th>Player 1 - X</th><th>Player 2 - O</th></tr></thead><tbody id="tablebody"></tbody></table>');

            if(infodiv.classList.hasOwnProperty("hidden"))
                infodiv.classList.remove("hidden");

            infodiv.style.display = "inline-block";
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
            scoreText.classList.remove("hidden");
            scoreText.insertAdjacentHTML('beforeend', '<table class="table"><thead><tr>' +
                '<th>#</th><th>Player 1 - O</th><th>Player 2 - X</th></tr></thead><tbody id="tablebody"></tbody></table>');

            if(infodiv.classList.hasOwnProperty("hidden"))
                infodiv.classList.remove("hidden");

            infodiv.style.display = "inline-block";
        });

        document.getElementById("backit2").addEventListener("click", () => {
            canvasText.innerHTML = "";
            startGame(contekst);
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

    let retWin = winCheck(boardAlt,contekst, sSize);

    markWin(retWin);

    //sta radi ai
    if(dataObj.playerCount === 1 && counter < 9 && retWin === 0){
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

    let retWin = winCheck(boardAlt,contekst, sSize);

    markWin(retWin);
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

function markWin(winNum) {
    for(let i = 0; i < boardAlt.length; i++){

        switch (i) {
            case 0:
                board[0][0] = boardAlt[i];
                break;
            case 1:
                board[0][1] = boardAlt[i];
                break;
            case 2:
                board[0][2] = boardAlt[i];
                break;
            case 3:
                board[1][0] = boardAlt[i];
                break;
            case 4:
                board[1][1] = boardAlt[i];
                break;
            case 5:
                board[1][2] = boardAlt[i];
                break;
            case 6:
                board[2][0] = boardAlt[i];
                break;
            case 7:
                board[2][1] = boardAlt[i];
                break;
            case 8:
                board[2][2] = boardAlt[i];
                break;
        }

    }
    console.log(board);

    if(winNum === 1 || winNum === 2 || winNum === 3){
        if(winNum === 1){
            //alert("It is a tie!");
            tableCount++;
            document.getElementById("tablebody").insertAdjacentHTML('beforeend', '<tr><td>'+tableCount+'</td>' +
                '<td>0</td><td>0</td></tr>');

            let canvasText = document.getElementById("canvas-text");
            if(canvasText.classList.hasOwnProperty("hidden"))
                canvasText.classList.remove("hidden");

            canvasText.style.position = "absolute";
            canvasText.style.display = "block";

            canvasText.insertAdjacentHTML('beforeend', '<h3>It is a tie!</h3>');

            board = getInitialBoard("");
            boardAlt = [];
            for (let i = 0; i < 9; i++)
            {
                boardAlt.push("");
            }

            setTimeout(() =>{
                canvasText.classList.add("hidden");
                canvasText.style.position = "static";
                canvasText.style.display = "none";
                canvasText.innerHTML = "";
                counter = 0;
                clearPlayingArea(0, 0, contextGlobal, canvasSize, "#779c42");
                drawLines(lineWidth, lineColor, contextGlobal, canvasSize, sectionSize);
            }, 1500);
        }
        if(winNum === 2 || winNum === 3){
            let countX = 0;
            let countO = 0;
            let positions = [];

            //row check
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === "x")
                        countX++;
                    else if(board[i][j] === "o")
                        countO++;
                }
                if (countX === 3 || countO === 3) {
                    for (let k = 0; k < 3; k++) {
                        positions.push({x: k, y: i});
                    }
                    positions.push({el: board[i][0]});
                }
                countO = 0;
                countX = 0;
            }

            //col check
            if (positions.length === 0) {
                for (let j = 0; j < 3; j++) {
                    for (let i = 0; i < 3; i++) {
                        if (board[i][j] === "x")
                            countX++;
                        else if(board[i][j] === "o")
                            countO++;
                    }
                    if (countX === 3 || countO === 3) {

                        for (let k = 0; k < 3; k++) {
                            positions.push({x: j, y: k});
                        }
                        positions.push({el: board[j][0]});

                    }
                    countO = 0;
                    countX = 0;
                }
            }

            //diagonal check
            if (positions.length === 0 && winNum === 2) {
                if (board[0][0] === "x" && board[1][1] === "x" && board[2][2] === "x") {
                    positions.push({x: 0, y: 0});
                    positions.push({x: 1, y: 1});
                    positions.push({x: 2, y: 2});
                    positions.push({el: board[0][0]});
                } else if (board[2][0] === "x" && board[1][1] === "x" && board[0][2] === "x") {
                    positions.push({x: 2, y: 0});
                    positions.push({x: 1, y: 1});
                    positions.push({x: 0, y: 2});
                    positions.push({el: board[2][0]});
                }
            } else if(positions.length === 0 && winNum === 3){
                if (board[0][0] === "o" && board[1][1] === "o" && board[2][2] === "o") {
                    positions.push({x: 0, y: 0});
                    positions.push({x: 1, y: 1});
                    positions.push({x: 2, y: 2});
                    positions.push({el: board[0][0]});
                } else if (board[2][0] === "o" && board[1][1] === "o" && board[0][2] === "o") {
                    positions.push({x: 2, y: 0});
                    positions.push({x: 1, y: 1});
                    positions.push({x: 0, y: 2});
                    positions.push({el: board[2][0]});
                }
            }

            if (positions.length !== 0){
                for (let i = 0; i < 3; i++) {
                    let xCordinate = positions[i].x * sectionSize;
                    let yCordinate = positions[i].y * sectionSize;

                    clearPlayingArea(xCordinate, yCordinate, contextGlobal, sectionSize, "#dd7373");

                    if (positions[3].el === "x") {
                        drawX(xCordinate, yCordinate, contextGlobal, sectionSize);
                    } else {
                        drawO(xCordinate, yCordinate, contextGlobal, sectionSize);
                    }
                }

                let canvasText = document.getElementById("canvas-text");

                if (positions[3].el === "x") {
                    tableCount++;
                    document.getElementById("tablebody").insertAdjacentHTML('beforeend', '<tr><td>'+tableCount+'</td>' +
                        '<td>1</td><td>0</td></tr>');

                    if(canvasText.classList.hasOwnProperty("hidden"))
                        canvasText.classList.remove("hidden");

                    canvasText.style.position = "absolute";
                    canvasText.style.display = "block";

                    canvasText.insertAdjacentHTML('beforeend', '<h3>X won!</h3>');

                    board = getInitialBoard("");
                    boardAlt = [];
                    for (let i = 0; i < 9; i++)
                    {
                        boardAlt.push("");
                    }

                    setTimeout(() =>{
                        canvasText.classList.add("hidden");
                        canvasText.style.position = "static";
                        canvasText.style.display = "none";
                        canvasText.innerHTML = "";
                        counter = 0;
                        clearPlayingArea(0, 0, contextGlobal, canvasSize, "#779c42");
                        drawLines(lineWidth, lineColor, contextGlobal, canvasSize, sectionSize);
                    }, 1500);
                } else {
                    tableCount++;
                    document.getElementById("tablebody").insertAdjacentHTML('beforeend', '<tr><td>'+tableCount+'</td>' +
                        '<td>0</td><td>1</td></tr>');

                    if(canvasText.classList.hasOwnProperty("hidden"))
                        canvasText.classList.remove("hidden");

                    canvasText.style.position = "absolute";
                    canvasText.style.display = "block";

                    canvasText.insertAdjacentHTML('beforeend', '<h3>O won!</h3>');

                    board = getInitialBoard("");
                    boardAlt = [];
                    for (let i = 0; i < 9; i++)
                    {
                        boardAlt.push("");
                    }

                    setTimeout(() =>{
                        canvasText.classList.add("hidden");
                        canvasText.style.position = "static";
                        canvasText.style.display = "none";
                        canvasText.innerHTML = "";
                        counter = 0;
                        clearPlayingArea(0, 0, contextGlobal, canvasSize, "#779c42");
                        drawLines(lineWidth, lineColor, contextGlobal, canvasSize, sectionSize);
                    }, 1500);
                }

            }

        }

    }
}