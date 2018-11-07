import seedrandom from 'seedrandom'; //https://www.npmjs.com/package/seedrandom

import { west, northWest, north, northEast, east, southEast, south, southWest, middle } from '../data/definitions'


export const placeMines = (x_init, y_init) => {
    // TODO; get minesCounter, and seed
    // from the settings the same way that 
    // I get the board info from the settings.
    return(dispatch, getState) => {

        // need to get all these from the store
        let minesToPlace = 300; 
        let salt  = "contra";
        let height = getState().board.length;
        let width = getState().board[0].length;

        //check for too many mines
        if(height * width - 9 < minesToPlace){
            return;
        }

        var rng = seedrandom("" + x_init + y_init + minesToPlace + height + width + salt);

        let x, y;
        let repeatCounter = 0;
        

        // place mines
        while(minesToPlace > 0){

            x = Math.floor(rng() * width );
            y = Math.floor(rng() * height );
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
                if(repeatCounter >= minesToPlace){//this is just a safeguard for testing pretty much, wont be needed later.
                    //? not sure...
                    return;
                }
                continue; // OH MY FUCKING GOD I WASNT COMPARING AGAINST AN UPDATED VERSION OF THE BOARD
            }


            dispatch(setTileValue(x,y));
            
            minesToPlace--;
        }
        //let timeAfter = (new Date()).getTime();
        // do the next thing, which would be placeNumbers
        //console.log("all mines placed!");
        //console.log("repeats: " + repeatCounter);
        

        //console.log("mine placement took: " + (timeAfter - timeBefore) + " ms");


        /************* test block for previous block ***************
        
        let board = getState().board;
        let countedMines = 0;
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                if(board[i][j].val === 9){
                    countedMines++;
                }
            }
        } // */
        //console.log("counted mines: " + countedMines);

    }
}

export const setTileValue = ( x, y, val = 9 ) => {
    return{
        type: 'SET_TILE_VALUE',
        x: x,
        y: y,
        val: val,
    }
}
export const placeNumbers = () => {
    return(dispatch, getState) => {
        // place numbers
        let board = getState().board;
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){

                // if tile is already a mine, skip it.
                if(board[i][j].val === 9 ){// this if statement avoids instantiating adjMines for the mines, may improve preformance
                    continue;
                }
                let adjMines = 0;
                //check west neighbor
                if(board[i][j] !== undefined){
                    if(board[ i - 1 ][j] === 9){
                        adjMines++;
                    }
                }
                //check northwest

                // check north

                // check northeast

                // check east

                //check southeast

                //check south

                //check southwest
        
                dispatch(setTileValue(j,i,adjMines));
            }
        }
    }
}


// GENERATE CLICK

export const generateClick = ( x, y ) => {
        // tiles are always able to report their clicks
        //the engine will determine what to do with the click depending on the game_state
        //i.e. if its the first click of a game, or to ignore it...
    return(dispatch, getState) => {

        console.log("click generated at [ " + x + " , " + y + "]");

        //check game state
        switch(getState().game_state){// 0: pre-game-idle, 1: in-progress, 2: post-game-idle, 3: replay 
            case 0:
                // populate board
                dispatch(placeMines(x, y));
                //dispatch(placeNumbers());
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