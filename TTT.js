// Variables
const controls = document.querySelector('#controls');
const game = document.querySelector('#game');
const board = document.querySelector('#board');
const player1 = document.querySelector('#player-1');
const player2 = document.querySelector('#player-2');
const reset = document.querySelector('#reset');
const mode = document.querySelector('#mode');
const clear = document.querySelector('#clear');
const difficultyNode = document.querySelector('#difficulty');
const easy = difficultyNode.children[0];
const normal = difficultyNode.children[1]; 
const hard = difficultyNode.children[2]; 
// Conditions and states
const conditions = {
    turn:"X",
    mode:"2 Players",
    difficulty:"easy"
}
// Buttons
clear.addEventListener('click', function() {
    functions.clearBoard();
});
reset.addEventListener('click',function() {
    functions.resetBoard();
});
mode.addEventListener('click',function() {
    functions.resetBoard();
    functions.gameMode();
});
// Difficulty Buttons
easy.addEventListener('click',function() {
    conditions.difficulty = this.innerText.toLowerCase();
    player2.children[0].innerText = `CPU ${conditions.difficulty}`;
    functions.resetBoard();
});
normal.addEventListener('click',function() {
    conditions.difficulty = this.innerText.toLowerCase();
    player2.children[0].innerText = `CPU ${conditions.difficulty}`;
    functions.resetBoard();
});
hard.addEventListener('click',function() {
    conditions.difficulty = this.innerText.toLowerCase();
    player2.children[0].innerText = `CPU ${conditions.difficulty}`;
    functions.resetBoard();
});
// Functions
const functions = {
    // Solve current board state
    solve(state) {
        if(/XXX|X...X...X|X....X....X|X..X..X/.test(state)) return 'X';
        if(/OOO|O...O...O|O....O....O|O..O..O/.test(state)) return 'O';
        if(state.includes(' ')) {
            return "Unfinished"
        }
        return "Draw";
    },
    // Turn board into XXX-XXX-XXX string
    parseBoard(){
        let  state = "";
        let cells = board.children;
        let count = 0;
        // Convert board into string
        for(let i=0;i<cells.length;i++) {
            let text = cells[i].innerText;
            if(count === 3 || count === 6) {
                state+="-";
            }
            if(text === "") {
                state+=" ";
            }
            count++;
            state+= text;
        }
        return state
    },
    // Set scores after solution
    checkAndSet() {
        if(this.solve(this.parseBoard()) === "X") {
            player1.children[1].innerText = parseInt(player1.children[1].innerText) + 1 + "";
            this.clearBoard();
        }
        else if(this.solve(this.parseBoard()) === "O") {
            player2.children[1].innerText = parseInt(player2.children[1].innerText) + 1 + "";
            this.clearBoard();
        }
        else if(this.solve(this.parseBoard()) === "Draw") {
            alert("Draw!");
            this.clearBoard();
        }
    },
    generateBoard() {
        for(let i=0;i<9;i++) {
            let cell = document.createElement('div');
            cell.innerText = " ";
            cell.classList.add('cell');
            // Conditional Borders
            if(i<=2) {
                cell.classList.add('borderB');
                if(i == 1 || i == 4 || i == 7) {
                    cell.classList.add('borderLR');
                }
            }
            else if(i == 1 || i == 4 || i == 7) {
                cell.classList.add('borderLR');
                if(i == 7) {
                    cell.classList.add('borderT');
                }
            }
            else if(i>=6) {
                cell.classList.add('borderT');
            }
            cell.addEventListener('click',function() {
                if(conditions.mode === "2 Players") {
                    if(this.innerHTML === " ") {
                        this.innerText = conditions.turn;
                        if(conditions.turn === "X") {
                            conditions.turn = "O"
                        }
                        else{
                            conditions.turn = "X"
                        }
                    }
                }
                else if(conditions.mode === "Computer") {
                    if(this.innerHTML === " ") {
                        if(conditions.turn === "X") {
                            this.innerText = conditions.turn;
                            if(functions.solve(functions.parseBoard()) === "Unfinished") {
                                conditions.turn = "O";
                                computer[conditions.difficulty]();
                            }
                        }
                    }
                }
                // Check board
                functions.checkAndSet();
            })
            board.appendChild(cell)
        }
    },
    clearBoard() {
        board.innerHTML = "";
        this.generateBoard();
        conditions.turn = "X";
    },
    resetBoard() {
        this.clearBoard();
        player1.children[1].innerText = '0';
        player2.children[1].innerText = '0';
    },
    gameMode() {
        // Set CPU Mode
        if(conditions.mode === "2 Players") {
            conditions.mode = "Computer";
            mode.innerText = "Computer";
            player2.children[0].innerText = `CPU ${conditions.difficulty}`;
            difficultyNode.style.display = "flex";
        }
        // Set 2 Players Mode
        else if(conditions.mode === "Computer") {
            conditions.mode = "2 Players";
            mode.innerText = "2 Players";
            player2.children[0].innerText = "Player 2";
            difficultyNode.style.display = "none";
        }
    }
}
const computer = {
    easy() {
        // Get Empty Cells
        let cells = board.children;
        const emptyCells = [];
        for(let i=0;i<cells.length;i++) {
            if(cells[i].innerText === "") {
                emptyCells.push(i);
            }
        }
        // Choose Random Cell From Empty Cells
        let num = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        cells[num].innerText = "O";
        conditions.turn = "X";
    },
    normal() {
        let cells = document.querySelectorAll('.cell');
    },
    hard() {
        let cells = document.querySelectorAll('.cell');
    }
}
functions.generateBoard()
