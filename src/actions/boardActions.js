

//actions for game initialization logic

export const populateBoard = (x_init, y_init) => {
    // TODO; get minesCounter, and seed
    // from the settings the same way that 
    // I get the board info from the settings.
    return(dispatch, getState) => {

        // need to to salt the seed with x_init, y_init, and board dimensions. this will make it so similar sized
        // boards with the same seed will be sufficently different.

        
        //let a = 134775813;
        //let c = 1;
        //let modulus = Math.pow(2 , 32);

        //console.log(board);
        //console.log(board[0][0]);


        //check in the settings that (height * width - 9 < minesToPlace)
        let minesToPlace = 420;
        console.log("# of mines to place: " + minesToPlace);
        let height = getState().board.length;
        let width = getState().board[0].length;
        let minesPlaced = 0;

        let x, y;
        let repeatCounter = 0;

        let timeBefore = (new Date()).getTime();
    
        while(minesPlaced < minesToPlace){
            //http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html#more
            //https://www.npmjs.com/package/seedrandom
            
            //linear congruential generator
            //seed = ( a * seed + c ) % modulus; // step lcg


            x = Math.floor(Math.random() * width );
            y = Math.floor(Math.random() * height );
            //console.log("attempting to place a mine at [ " + x + " , " + y + " ]...");

            // check if x and y are/are neighboring (x_init, y_init). if they are, 
            // skip current x, y and generate a new x, y. This is to guarantee the first click is safe and is a 0
            //this block has about a 9 in boardArea chance of making the loop continue
            if( x === x_init && y === y_init         ) continue; //check first click for mine
            if( x === x_init && y === y_init + 1     ) continue; // check north of first click for mine
            if( x === x_init && y === y_init - 1     ) continue; // check south
            if( x === x_init + 1 && y === y_init     ) continue; // check east 
            if( x === x_init - 1 && y === y_init     ) continue; // check west
            if( x === x_init + 1 && y === y_init + 1 ) continue; // check north east
            if( x === x_init + 1 && y === y_init - 1 ) continue; // check south east
            if( x === x_init - 1 && y === y_init + 1 ) continue; // check north west
            if( x === x_init - 1 && y === y_init - 1 ) continue; // check south west
            
            //check if the board already has a mine at x,y
            if(getState().board[y][x].val === 9){
                repeatCounter++;
                continue; // OH MY FUCKING GOD I WASNT COMPARING AGAINST AN UPDATED VERSION OF THE BOARD
            }

            dispatch(setMine(x,y));
            //console.log("placed a mine at [ " + x + " , " + y + " ]");
            minesPlaced++;
            //console.log("mines placed so far: " + minesPlaced);
        }
        let timeAfter = (new Date()).getTime();
        // do the next thing, which would be placeNumbers
        console.log("all mines placed!");
        console.log("repeats: " + repeatCounter);
        

        console.log("mine placement took: " + (timeAfter - timeBefore) + " ms");


        /************* test block for previous block ***************/
        
        let board = getState().board;
        let countedMines = 0;
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                if(board[i][j].val === 9){
                    countedMines++;
                }
            }
        }

        console.log("counted mines: " + countedMines)
        




    }
}

export const setMine = ( x, y ) => {
    return{
        type: 'SET_TILE_TO_MINE',
        x: x,
        y: y,

    }

}



// GENERATE CLICK

export const generateClick = ( x, y ) => {
    return(dispatch, getState) => {

        console.log("click generated at [ " + x + " , " + y + "]");

        //check game state
        switch(getState().game_state){// 0: pre-game-idle, 1: in-progress, 2: post-game-idle, 3: replay 
            case 0:
                // populate board
                dispatch(populateBoard(x, y)); //oh boy
                // change game state
                // manipulate board
                // save to replay
                break;
            case 1:
                // manipulate board
                // save to replay
                break;
            default:
                // do nothing
        }

        
    }
}