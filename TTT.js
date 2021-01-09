// Variables
const controls = document.querySelector('#controls');
const game = document.querySelector('#game');
const board = document.querySelector('#board');
const player1 = document.querySelector('#player-1');
const player2 = document.querySelector('#player-2');
const reset = document.querySelector('#reset');
const mode = document.querySelector('#mode');
const clear = document.querySelector('#clear');
// Conditions and states
const conditions = {
    turn:"X",
    mode:"2 Players",
    difficulty:"Easy"
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
// Functions
const functions = {
    parseBoard() {
        let  state = "";
        let cells = document.querySelectorAll('.cell');
        let count = 0;
        // Convert board into string XXX-XXX-XXX
        cells.forEach(x=>{
            if(count ===3 || count === 6) {
                state+="-"
            }
            let text = x.innerText;
            if(text === "") {
                state+=" ";
            }
            state+= text;
            count+=1;
        })
        if(/XXX|X...X...X|X....X....X|X..X..X/.test(state)) return 'X';
        if(/OOO|O...O...O|O....O....O|O..O..O/.test(state)) return 'O';
        if(state.includes(' ')) {
            return "Unfinished"
        }
        return "Draw";
    },
    checkAndSet() {
        if(conditions.mode === "2 Players") {
            if(this.parseBoard() === "X") {
                player1.children[1].innerText = parseInt(player1.children[1].innerText) + 1 + "";
                this.clearBoard();
            }
            else if(this.parseBoard() === "O") {
                player2.children[1].innerText = parseInt(player2.children[1].innerText) + 1 + "";
                this.clearBoard();
            }
            else if(this.parseBoard() === "Draw") {
                alert("Draw!");
                this.clearBoard();
            }
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
                if(this.innerHTML === " ") {
                    this.innerText = conditions.turn;
                    if(conditions.turn === "X") {
                        conditions.turn = "O"
                    }
                    else{
                        conditions.turn = "X"
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
    }
}
functions.generateBoard()