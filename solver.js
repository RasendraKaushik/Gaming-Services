function solveSudoku(board) {
    const empty = findEmptyCell(board);
    if (!empty) {
      return true;
    }
    
    const [row, col] = empty;
    
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, num, row, col)) {
        board[row][col] = num;
        
        if (solveSudoku(board)) {
          return true;
        }
        
        board[row][col] = 0;
      }
    }
    
    return false;
  }
  
  function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }
  
  function isValid(board, num, row, col) {
    return (
      isRowValid(board, num, row) &&
      isColValid(board, num, col) &&
      isBoxValid(board, num, row - (row % 3), col - (col % 3))
    );
  }
  
  function isRowValid(board, num, row) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === num) {
        return false;
      }
    }
    return true;
  }
  
  function isColValid(board, num, col) {
    for (let row = 0; row < 9; row++) {
      if (board[row][col] === num) {
        return false;
      }
    }
    return true;
  }
  
  function isBoxValid(board, num, startRow, startCol) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row + startRow][col + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  }
  
  
  const sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];
  
  if (solveSudoku(sudokuBoard)) {
    console.log("Solved Sudoku:");
    console.log(sudokuBoard);
  } else {
    console.log("No solution exists.");
  }
  