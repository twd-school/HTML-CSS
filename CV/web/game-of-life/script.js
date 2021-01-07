//GET STRUCTURES
let structures;
var request = new XMLHttpRequest;
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        structures = JSON.parse(this.responseText);
        for (structure in structures) {
            new Structure(structure, structures[structure]);
        }
    }
}
request.open("GET", "structures.json");
request.send();

const structureSection = document.getElementById("structures");

class Structure {
    constructor(name, structureBoard) {
        this.name = name;
        this.board = structureBoard;
        this.element = document.createElement("button");
        this.element.classList.add("structure-btn", "btn");
        this.element.addEventListener("click", () => {
            board = this.board;
            drawBoard(board);
        });
        this.element.innerText = name;
        structureSection.appendChild(this.element);
    }  
}

//PROGRAM
const canvas = document.getElementById("canvas");
let context;

const playButton = document.getElementById("play-button");
const nextGenButton = document.getElementById("next-gen");
const newBoardButton = document.getElementById("new-board");
const generationNumber = document.getElementById("generation-number");
const importButton = document.getElementById("import-board");
const exportButton = document.getElementById("export-board");

if (canvas.getContext) {
    context = canvas.getContext("2d");
}

let generation = 1;
context.lineWidth = 1;
let columns = 20;
let caseSize = canvas.width / columns;

const playInterval = 200;
let isPlaying = false;

const generateBoard = () => {
    let board = new Array(columns);
    for (x = 0; x < columns; x++) {
        board[x] = new Array(columns);
    }
    return board;
}

const drawBoard = (board) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    columns = board.length;
    caseSize = canvas.width / columns;
    for (x = 0; x < board.length; x++) {
        for (y = 0; y < board[x].length; y++) {
            if (board[x][y] == 1) {
                context.fillRect(x * caseSize, y * caseSize, caseSize, caseSize);
            } else {
                board[x][y] = 0;
                context.strokeRect(x * caseSize, y * caseSize, caseSize, caseSize);
            }
        }
    }
}

let board = generateBoard();
drawBoard(board);

const onClick = (event) => {
    console.log(event.offsetX, canvas.offsetWidth, event.offsetY, canvas.offsetHeight);
    if ((event.offsetX > 0 && event.offsetX <= canvas.offsetWidth) && (event.offsetY > 0 && event.offsetY <= canvas.offsetHeight) && event.button == 0) {
        let mousePos = calcMousePos(event.offsetX, event.offsetY);
        if (board[mousePos.x][mousePos.y] === 1) {
            removeCell(mousePos.x, mousePos.y);
        } else {
            createCell(mousePos.x, mousePos.y);
        }
    }
}

const calcMousePos = (x, y) => {
    return {x: Math.floor(x / caseSize), y: Math.floor(y / caseSize)};
}

const createCell = (x, y) => {
    board[x][y] = 1;
    context.fillRect(x * caseSize, y * caseSize, caseSize, caseSize);
}

const removeCell = (x, y) => {
    board[x][y] = 0;
    context.clearRect(x * caseSize, y * caseSize, caseSize, caseSize);
    setTimeout(() => {
        context.strokeRect(x * caseSize, y * caseSize, caseSize, caseSize);
    }, 50)
}

const checkAdjacentCells = (x, y) => {
    let adjacentCells = 0;
    if (x > 0) {
        if (y > 0 && board[x - 1][y - 1] == 1) {
            adjacentCells++;
        } if (board[x - 1][y] == 1) {
            adjacentCells++;
        } if (y < board.length - 1 && board[x - 1][y + 1] == 1) {
            adjacentCells++;
        }
    } if (y > 0 && board[x][y - 1] == 1) {
        adjacentCells++;
    } if (y < board.length - 1 && board[x][y + 1] == 1) {
        adjacentCells++;
    } if (x < board.length - 1) {
        if (y > 0 && board[x + 1][y - 1]) {
            adjacentCells++;
        } if (board[x + 1][y] == 1) {
            adjacentCells++;
        } if (y < board.length - 1 && board[x + 1][y + 1] == 1) {
            adjacentCells++;
        }
    }
    return adjacentCells;
}

const checkLivingCell = (x, y) => {
    let adjacentCells = checkAdjacentCells(x, y);
    if (adjacentCells == 2 || adjacentCells == 3) {
        return 1;
    } else {
        return 0;
    }
}

const checkDeadCell = (x, y) => {
    if (checkAdjacentCells(x, y) == 3) {
        return 1;
    } else {
        return 0;
    }
}

const calculateNextGen = () => {
    let nextGenBoard = new Array(board.length);
    for (x = 0; x < board.length; x++) {
        nextGenBoard[x] = new Array(board.length);
        for (y = 0; y < board[x].length; y++) {
            if (board[x][y] == 1) {
                nextGenBoard[x][y] = checkLivingCell(x, y);
            } else {
                nextGenBoard[x][y] = checkDeadCell(x, y);
            }
        }
    }
    return nextGenBoard;
}

const importBoard = (str) => {
    let re = /[\[]/g;
    str = str.replace(re,"");
    str = str.substr(0, str.length - 2);
    console.log(str);
    str = str.split("]");
    for (i = 0; i < str.length; i++) {
        if (str[i][0] == ",") {
            str[i] = str[i].substr(1);
        }
    }
    console.log(str);
    for (i = 0; i < str.length; i++) {
        str[i] = str[i].split(",");
    }
    console.log(str);
    return str;
}

canvas.addEventListener("click", onClick);

playButton.addEventListener("click", () => {
    if (isPlaying) {
        clearInterval(isPlaying);
        isPlaying = false;
        playButton.innerText = "Play";
    } else {
        isPlaying = setInterval(() => {
            board = calculateNextGen();
            drawBoard(board);
            generation++;
            generationNumber.innerText = generation;
        }, document.getElementById("interval").value);
        playButton.innerText = "Pause";
    } 
});

nextGenButton.addEventListener("click", () => {
    board = calculateNextGen();
    drawBoard(board);
    generation++;
    generationNumber.innerText = generation;
})

newBoardButton.addEventListener("click", () => {
    columns = parseInt(document.getElementById("columns").value);
    caseSize = canvas.width / columns;
    board = generateBoard();
    drawBoard(board);
    generation = 1;
    generationNumber.innerText = generation;
})

exportButton.addEventListener("click", () => {
    navigator.clipboard.writeText(JSON.stringify(board));
})

importButton.addEventListener("click", () => {
    navigator.clipboard.readText().then(
        (clipText) => {
            board = importBoard(clipText);
            drawBoard(board);
        }
    );
})