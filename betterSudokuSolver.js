const EMPTY = 0;
const ROW_SIZE = 9;
const COL_SIZE = 9;
const BLOCK_COUNT = 9;

// struct Coord(x, y)
function Coord (x, y)
{
    this.x = x;
    this.y = y;
}

// (x, y) -> (id) or (coord) -> (id)
function cellID(c, d)
{
    if (arguments.length === 1)
        return c.x * COL_SIZE + c.y;
    else
        return c * COL_SIZE + d;
}

// SUDOKU STRUCTURE
function Sudoku ()
{
    this.data = [],
    this.emptyCells = 0,
    this.rowCheck = [],
    this.colCheck = [],
    this.blockCheck = [],
    this.blockID = []
}

function initSudoku(S)
{
    /* === DATA ATTRIBUTE === */
    S.data = new Array(ROW_SIZE);
    for (let i = 0; i < ROW_SIZE; i++)
        S.data[i] = new Array(COL_SIZE).fill(0);

    S.emptyCells = ROW_SIZE * COL_SIZE;

    /* === CHECK ATTRIBUTES === */
    S.rowCheck = new Array(ROW_SIZE).fill(0);
    S.colCheck = new Array(COL_SIZE).fill(0);
    S.blockCheck = new Array(BLOCK_COUNT).fill(0);

    /* === ASSIGN BLOCK ID FOR EACH CELL === */
    let blockID = 0;
    S.blockID = new Array(ROW_SIZE * COL_SIZE);
    for (let cellID = 0; cellID < ROW_SIZE * COL_SIZE; cellID++)
    {
        S.blockID[cellID] = blockID;
        if ((cellID + 1) % 27 === 0) blockID++;
        else if ((cellID + 1) % 9 === 0) blockID -= 2;
        else if ((cellID + 1) % 3 === 0) blockID++;
    }
}

function startSudoku(S, board)
{                
    for (let i = 0; i < ROW_SIZE; i++)
    {
        for (let j = 0; j < COL_SIZE; j++)
        {
            /* DATA ATTRIBUTE */
            S.data[i][j] = parseInt(board[i][j], 10);
            if (S.data[i][j] != EMPTY) S.emptyCells--;

            /* CHECK ATTRIBUTE */
            /* EXAMPLE
			set Cell(x, y) = 5
				=> set bit 4-th of rowCheck[x] to 1
				=> set bit 4-th of colCheck[y] to 1
				=> set bit 4-th of blockCheck[ blockID[ cellID(x, y) ] ] to 1 */
            let val = S.data[i][j];
            S.rowCheck[i] |= (1 << (val - 1));
            S.colCheck[j] |= (1 << (val - 1));
            S.blockCheck[S.blockID[cellID(i, j)]] |= (1 << (val - 1));
        }
    }
}

function getAvailableValues(S, c)
{
    let ans = [];
    let constrain = S.rowCheck[c.x] | S.colCheck[c.y] | S.blockCheck[S.blockID[cellID(c)]];
    /* Negative only 9 bits in the rightmost
		Example: constrain = 111111100 (9 bits) but
        actually constrain = 0000000111111100 (16 bits or even more)
		This means 3..9 already fill => choose 1, 2
		So turn constrain into 0000000000000011 (negative only 9 bits) */
    constrain = constrain ^ ((1 << 9) - 1);
    let pos = -99;
    
    while (pos + 1 <= 9)
    {
        /* Find the position of the rightmost bit 1 
		Example constrain = 0000000000000011 => pos = 0 */
		pos = Math.log2(constrain & (~constrain + 1));
		/* Add the option to ans array
		Example pos = 0 => add 1 (value can be filled into Cell c) */
		ans.push(pos + 1);
        
		/* Remove that bit
		Example constrain = 0000000000000011 and pos = 0
			 => constrain = 0000000000000010 */
		constrain = constrain & (~(1 << pos));
    }

    ans.pop()
    return ans;
}

function isFilled(S)
{
    return (S.emptyCells === 0);
}

function fillCell(S, c, val)
{
    if (S.data[c.x][c.y] != EMPTY)
    {
        console.log("ERROR: This cell already filled");
        return; 
    }

    /* DATA ATTRIBUTE*/
    // Fill the value into Cell c
    S.data[c.x][c.y] = val;
    // The number of empty cells decrease
    S.emptyCells--;

    /* CHECK ATTRIBUTE */
    // Set (val-1)th bit to 1 of all constraints check
	S.rowCheck[c.x] |= (1 << (val - 1));
	S.colCheck[c.y] |= (1 << (val - 1));
	S.blockCheck[ S.blockID[ cellID(c) ] ] |= (1 << (val - 1));
}

function clearCell(S, c)
{
    /* DATA ATTRIBUTE */
    let val = S.data[c.x][c.y];
    // Clear Cell c
    S.data[c.x][c.y] = EMPTY;
    // The number of empty cells increase
	S.emptyCells++;

    /* CHECK ATTRIBUTE */
    // Set (val-1)th bit to 0 of all constraint check
	S.rowCheck[c.x] &= ~(1 << (val - 1));
	S.colCheck[c.y] &= ~(1 << (val - 1));
	S.blockCheck[ S.blockID[ cellID(c) ] ] &= ~(1 << (val - 1));
}

function sudokuBackTracking(S)
{
    if (isFilled(S)) return 1;

    // Find the cell that has minimum of available values
	let minPos = new Coord(-1, -1);
    let minValues = new Array(10); // Contain the available values
	
    for (let i = 0; i < ROW_SIZE; i++)
        for (let j = 0; j < COL_SIZE; j++)
        {
            let pos = new Coord(i, j);
            let values = getAvailableValues(S, pos);

            // If any empty cell has no available option => backtracking
			if (S.data[i][j] === EMPTY && values.length === 0) return 0;
            
            if (S.data[i][j] === EMPTY && values.length < minValues.length)
            {
                minPos = pos;
                minValues = values;
                minSize = values.length;
            }
        }

    // Found the cell => fill it
    for (let i = 0; i < minValues.length; i++)
    {
        fillCell(S, minPos, minValues[i]);
        if (sudokuBackTracking(S)) return 1;
        clearCell(S, minPos);
    }
}

function sudokuAnswer(S)
{
    if (sudokuBackTracking(S))
    {
        console.log('Found answer!');
        console.log(S.data);
        return 1;
    }

    console.log('Cannot find the answer!');
    return 0;
}

let S = new Sudoku();
let board = ['530070000',
            '600195000',
            '098000060',
            '800060003',
            '400803001',
            '700020006',
            '060000280',
            '000419005',
            '000080079'];
            
initSudoku(S);
startSudoku(S, board);
sudokuAnswer(S);