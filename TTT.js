let count = 0;
//Computer Logic
const computer = {
    main:document.querySelector('main'),
    cpuMove:function() {
        let cells = document.querySelectorAll('.cell'); 
    },
    generateBoard:function () {
        let display = document.querySelector('#display')
         //Generate Board
        let game = document.createElement('div');
        game.setAttribute('id','game');
        game.classList.add('text-center');
        this.main.appendChild(game);
        for(let i=0;i<9;i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerHTML="";
            cell.addEventListener('click',function() {
                if(count%2===0 && cell.innerHTML==="") {
                    cell.innerHTML="X";
                    count+=1
                }
                else if(count%2!==0 && cell.innerHTML===""){
                    this.cpuMove()
                    count+=1
                }
                let check = twoPlayers.solution(twoPlayers.getArray());
                if(check==="Tic") {
                    let currentScore = document.querySelector('#player1 h2').innerHTML;
                    document.querySelector('#player1 h2').innerHTML = `${parseInt(currentScore)+1}`;
                    twoPlayers.resetBoard();
                    count = 0;
                    display.innerHTML="Player 1 Wins" 
                }
                else if(check ==="Tac") {
                    let currentScore = document.querySelector('#player2 h2').innerHTML;
                    document.querySelector('#player2 h2').innerHTML = `${parseInt(currentScore)+1}`;
                    twoPlayers.resetBoard();
                    count = 0;
                    display.innerHTML="Computer Wins"
                }
                else if(check ==="Draw") {
                    twoPlayers.resetBoard();
                    count = 0;
                    display.innerHTML="Draw" 
                }
            });
            if(i === 1 || i === 7) {
                cell.classList.add('right-and-left')
            }
            else if (i === 3 || i === 4 || i ===5) {
                if(i===4) {
                    cell.classList.add('top-and-bottom')
                    cell.classList.add('right-and-left')
                }
                else {
                    cell.classList.add('top-and-bottom')
                }
            }
            game.appendChild(cell)
        }
        //Gererate players
        for(let i =0;i<2;i++) {
            let header = document.createElement('h3');
            let score = document.createElement('h2');
            let player = document.createElement('div');
            player.setAttribute('id',`player${i+1}`);
            player.classList.add('text-center');
            header.innerHTML=`Player ${i+1}`;
            score.innerHTML="0";
            player.appendChild(header);
            player.appendChild(score); 
            if(i===0) {
                this.main.prepend(player)
            }
            else if(i===1) {
                this.main.append(player)
            }
        }
    }
}
//Two Players Logic
const twoPlayers = {
    main:document.querySelector('#main'),
    solution:function (board) {
        function validateRows(num) {
            for(let row of board) {
                if(row.every(x=>x===num)) {
                    return num;
                }
            }
            return 0;
        }
        function validateCols(num) {
            for(let i=0;i<board.length;i++) {
                let column = [];
                for(let j=0;j<board.length;j++) {
                    column.push(board[j][i])
                }
                if(column.every(x=>x===num)) {
                    return num;
                }
            }
            return 0;
        }
        function validateDiagonals(num) {
            let diagonal1 = [board[0][0],board[1][1],board[2][2]];
            let diagonal2 = [board[0][2],board[1][1],board[2][0]];
            if(diagonal1.every(x=>x===num) || diagonal2.every(x=>x===num)) {
                return num;
            }
            return 0;
        }
        let ticArr = [validateRows("X"),validateCols("X"),validateDiagonals("X")];
        let tacArr = [validateRows("O"),validateCols("O"),validateDiagonals("O")];
        if(ticArr.includes("X") && tacArr.includes("O") === false) {
            return "Tic";
        }
        else if(ticArr.includes("X") ===false && tacArr.includes("O")) {
            return "Tac";
        }
        let oneDimesion = board.reduce((x,y)=>x.concat(y));
        if(ticArr.includes("X") ===false && tacArr.includes("O")===false && oneDimesion.includes("") ===false) {
            return "Draw";
        }
    },
    getArray:function() {
        let cells = document.querySelectorAll(".cell")
        return [[cells[0].innerHTML,cells[1].innerHTML,cells[2].innerHTML],[cells[3].innerHTML,cells[4].innerHTML,cells[5].innerHTML],[cells[6].innerHTML,cells[7].innerHTML,cells[8].innerHTML]];
    },
    resetBoard:function () {
        let cells = document.querySelectorAll(".cell")
        for(let cell of cells) {
            cell.innerHTML="";
        }
    },
    resetBoardAndScore:function() {
        let cells = document.querySelectorAll(".cell")
        for(let cell of cells) {
            cell.innerHTML="";
        }
        let score = document.querySelectorAll('.score')
        for(let i of score) {
            i.innerHTML="0";
        }
    },
    clearBoard:function () {
        let player1 = document.querySelector('#player1');
        let board = document.querySelector('#game');
        let player2 = document.querySelector('#player2');
        this.main.removeChild(player1);
        this.main.removeChild(board);
        this.main.removeChild(player2);
    },
    generateBoard:function () {
        let display = document.querySelector('#display')
         //Generate Board
        let game = document.createElement('div');
        game.setAttribute('id','game');
        game.classList.add('text-center');
        this.main.appendChild(game);
        for(let i=0;i<9;i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerHTML="";
            cell.addEventListener('click',function() {
                if(count%2===0 && cell.innerHTML==="") {
                    cell.innerHTML="X";
                    count+=1
                }
                else if(cell.innerHTML===""){
                    cell.innerHTML="O";
                    count+=1
                }
                let check = twoPlayers.solution(twoPlayers.getArray());
                if(check==="Tic") {
                    let currentScore = document.querySelector('#player1 h2').innerHTML;
                    document.querySelector('#player1 h2').innerHTML = `${parseInt(currentScore)+1}`;
                    twoPlayers.resetBoard();
                    count = 0;
                    display.innerHTML="Player 1 Wins" 
                }
                else if(check ==="Tac") {
                    let currentScore = document.querySelector('#player2 h2').innerHTML;
                    document.querySelector('#player2 h2').innerHTML = `${parseInt(currentScore)+1}`;
                    twoPlayers.resetBoard();
                    count = 0;
                    display.innerHTML="Player 2 Wins"
                }
                else if(check ==="Draw") {
                    twoPlayers.resetBoard();
                    count = 0;
                    display.innerHTML="Draw" 
                }
            });
            if(i === 1 || i === 7) {
                cell.classList.add('right-and-left')
            }
            else if (i === 3 || i === 4 || i ===5) {
                if(i===4) {
                    cell.classList.add('top-and-bottom')
                    cell.classList.add('right-and-left')
                }
                else {
                    cell.classList.add('top-and-bottom')
                }
            }
            game.appendChild(cell)
        }
        //Gererate players
        for(let i =0;i<2;i++) {
            let header = document.createElement('h3');
            let score = document.createElement('h2');
            let player = document.createElement('div');
            player.setAttribute('id',`player${i+1}`);
            player.classList.add('text-center');
            header.innerHTML=`Player ${i+1}`;
            score.classList.add('score')
            score.innerHTML="0";
            player.appendChild(header);
            player.appendChild(score); 
            if(i===0) {
                this.main.prepend(player)
            }
            else if(i===1) {
                this.main.append(player)
            }
        }
    }
}
//Buttons
let button = document.querySelector('#start');
button.addEventListener('click',function(){
    let display = document.querySelector('#display')
    if(button.innerHTML==="Start!") {
        twoPlayers.generateBoard();
        button.innerHTML="2 Players";
        display.innerHTML="Press 2 Players again!"
    }
    else if(button.innerHTML==="2 Players") {
        twoPlayers.clearBoard();
        twoPlayers.generateBoard();
        button.innerHTML="Computer";
        let cpu = document.querySelector('#player2 h3');
        cpu.innerHTML="Computer"
    }
    else if(button.innerHTML==="Computer") {
        twoPlayers.clearBoard();
        twoPlayers.generateBoard();
        button.innerHTML="2 Players";
    }
})
let reset = document.querySelector('#reset');
reset.addEventListener('click',function() {
    twoPlayers.resetBoardAndScore();
    count=0;
})