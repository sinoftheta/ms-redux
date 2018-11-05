//https://code.tutsplus.com/tutorials/build-a-minesweeper-game-within-200-lines-of-code--active-8578

//actions for game init logic

export const placeMines = (minesCounter, seed) => {// is this correct? this looks incorrect af lol
    return(dispatch, getState) => {

        let a = 134775813;
        let c = 1;
        let modulus = Math.pow(2 , 32);

        let height = getState().board.length;
        let width = getState().board[0].length;
    
        while(minesCounter > 0){
            //linear congruential generator
            seed = ( a * seed + c ) % modulus; // step lcg

            let rng = seed % ( height * width - 1);

            let x = rng % width;
            let y = rng % height;

            //

            //try and set mine at x,y. if available:
                //dispatch(setMine(x,y));
                // dec minesCounter
                minesCounter--;
            //else
                //continue;
            
        }
    }
}