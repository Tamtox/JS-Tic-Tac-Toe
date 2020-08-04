function isSolved(board) {
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
    let ticArr = [validateRows(1),validateCols(1),validateDiagonals(1)];
    let tacArr = [validateRows(2),validateCols(2),validateDiagonals(2)];
    if(ticArr.includes(1) && tacArr.includes(2) === false) {
        return 1;
    }
    else if(ticArr.includes(1) ===false && tacArr.includes(2)) {
        return 2;
    }
    else if(ticArr.includes(1) && tacArr.includes(2)) {
        return 0;
    }
    let oneDimesion = board.reduce((x,y)=>x.concat(y));
    if(ticArr.includes(1) ===false && tacArr.includes(2)===false && oneDimesion.includes(0) ===false) {
        return 0;
    }
    if(oneDimesion.includes(0)) {
        return -1;
    }
}
isSolved([[1,2,0],[2,1,0],[2,0,1]])
