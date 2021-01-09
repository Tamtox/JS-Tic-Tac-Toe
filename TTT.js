// Variables
const controls = document.querySelector('#controls');
const game = document.querySelector('#game');
const board = document.querySelector('#board');
const player1 = document.querySelector('#player-1');
const player2 = document.querySelector('#player-2');
// Conditions and states
const conditions = {
    turn:"X",
    mode:"VS"
}
// Functions
const functions = {
    parseBoard() {
        
        if(/XXX|X...X...X|X....X....X|X..X..X/.test(state)) return 'X';
        if(/OOO|O...O...O|O....O....O|O..O..O/.test(state)) return 'O';
        if(state.includes(' ')) {
            return "Unfinished"
        }
        return "Draw";
    },
    generateBoard() {
        for(let i=0;i<9;i++) {
            let cell = document.createElement('div');
            cell.innerText = " "
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
            })
            board.appendChild(cell)
        }
    },

}
functions.generateBoard()