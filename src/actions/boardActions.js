// NPM PACKAGES //
import seedrandom from 'seedrandom'; //https://www.npmjs.com/package/seedrandom

// DEFINITIONS //
import {
    //tile places
    west, northWest, north, northEast, east, southEast, south, southWest, middle, 

    // tile values
    mine,

    //game states
    preGameIdle, gameInProgress, postGameIdle, playingReplay, postReplayIdle,

    // actions
    SET_MENU, SET_GAME_STATE, RESET_GAME, REVEAL_TILE, SET_MOUSE_STATE, SET_FLAG, SET_BOARD_SIZE, SET_TILE_VALUE, SET_LAST_GAME_WON,

    } from '../other/definitions';

// FUNCTIONS //
import { evalNeighbors } from '../other/functions';

// OTHER ACTIONS //
import { setStartTimestamp } from './general';

const totalMines = 15; 



export const setGameState = (id) => {
    return{
        type: SET_GAME_STATE,
        id: id,
    }
}
export const setLastGameWon = (val) => {
    return{
        type: SET_LAST_GAME_WON,
        val: val,
    }
}
export const setTileValue = ( x, y, val = mine ) => {
    return{
        type: SET_TILE_VALUE,
        x: x,
        y: y,
        val: val,
    }
}
export const revealTile = ( x, y,) => {
    //console.log("revealing [ " + x + " , " + y + " ]");
    return{
        type: REVEAL_TILE,
        x: x,
        y: y,
    }
}

export const placeMines = (x_init, y_init) => {
    // TODO; get minesCounter, and seed
    // from the settings the same way that 
    // I get the board info from the settings.
    return(dispatch, getState) => {

        // need to get all these from the store
        let minesToPlace = totalMines; 
        let salt  = "contra";
        let height = getState().board.length;
        let width = getState().board[0].length;

        //check for too many mines to safeguard against infinite loops
        if(height * width - 9 < minesToPlace) return;


        var rng = seedrandom("" + x_init + y_init + minesToPlace + height + width + salt);

        // x and y are instantiated outside of the while loop to save time
        let x, y;

        // place mines
        while(minesToPlace > 0){

            x = Math.floor(rng() * width );
            y = Math.floor(rng() * height );

            // check if x and y are/are neighboring (x_init, y_init). if they are, 
            // skip current x, y and generate a new x, y. This is to guarantee the first click is safe and is a 0
            if( x === x_init     && y === y_init     ) continue; //check first click for mine
            if( x === x_init     && y === y_init + 1 ) continue; // check north of first click for mine
            if( x === x_init     && y === y_init - 1 ) continue; // check south
            if( x === x_init + 1 && y === y_init     ) continue; // check east 
            if( x === x_init - 1 && y === y_init     ) continue; // check west
            if( x === x_init + 1 && y === y_init + 1 ) continue; // check north east
            if( x === x_init + 1 && y === y_init - 1 ) continue; // check south east
            if( x === x_init - 1 && y === y_init + 1 ) continue; // check north west
            if( x === x_init - 1 && y === y_init - 1 ) continue; // check south west
            
            //check if the board already has a mine at x,y
            if(getState().board[y][x].val === mine){
                // code in this block seems to effect the RNG 
                continue;
            }

            dispatch(setTileValue(x,y));
            
            minesToPlace--;
        }
    }
}



export const placeNumbers = () => {
    return(dispatch, getState) => {
        let board = getState().board;
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){

                // if tile is already a mine, skip it.
                if(board[i][j].val === mine ){
                    continue;
                }
                let adjMines = 0;

                // count neighboring mines
                evalNeighbors( board , j , i , "val" , mine , () => {adjMines++} );
               
                // set value
                dispatch(setTileValue(j,i,adjMines));
            }
        }
    }
}
export const uncoverTiles = ( x , y ) => {
    return(dispatch, getState) => {
        let board = getState().board;

        // check if tile has already been revealed
        if(board[y][x].revealed){
            //check win condition (for after recusrion)
            if(getState().tiles_cleared === board.length * board[0].length - totalMines){ // TOTAL MINES MUST BE READ FROM STORE
                dispatch(setGameState(postGameIdle));
                dispatch(setLastGameWon(true));
            }
            return;
        }

        //reveal tile
        dispatch(revealTile( x , y));

        if(getState().tiles_cleared === board.length * board[0].length - totalMines){ // TOTAL MINES MUST BE READ FROM STORE
            dispatch(setGameState(postGameIdle));
            dispatch(setLastGameWon(true));
            return;
        }


        //check lose condition
        if(board[y][x].val === mine){
            dispatch(setGameState(postGameIdle));
            dispatch(setLastGameWon(false));
        }

        //if tile is a zero, recurse over all neighbors
        if(board[y][x].val === 0){
            evalNeighbors( board , x , y , "flagged" , false , ( x , y ) => dispatch(uncoverTiles( x , y )) );
        }
    }
}


// BOARD CLICK BEHAVIOR

export const leftClick = ( x, y ) => {
        // tiles are always able to report their clicks
        //the engine will determine what to do with the click depending on the game_state
        //i.e. if its the first click of a game, or to ignore it...
    return(dispatch, getState) => {

        //console.log("leftClick generated at [ " + x + " , " + y + "]");

        //check game state
        switch(getState().game_state){
            case preGameIdle: 

                /* =-=-=-=-=-=-=-=-=- at what point does a game of minesweeper actually start? -=-=-=-=-=-=-=-=-=-=-=-*/

                // populate board with mines and numbers
                dispatch(placeMines(x, y));
                dispatch(placeNumbers());

                // change game state 
                dispatch(setGameState(gameInProgress));

                // uncover tiles
                dispatch(uncoverTiles( x , y));

                // save to replay


                // start timer
                dispatch(setStartTimestamp( (new Date()).getTime() ));

                break;
            case gameInProgress:
                // uncover tiles
                dispatch(uncoverTiles( x , y));

                // save to replay
                break;
            case playingReplay:
                //pause the replay and let people play from that state???
                break;
            default:
                // do nothing
        }
    }
}
export const rightClick = ( x, y ) => {
    // tiles are always able to report their clicks
    //the engine will determine what to do with the click depending on the game_state
    //i.e. if its the first click of a game, or to ignore it...
    return(dispatch, getState) => {

        console.log("rightClick generated at [ " + x + " , " + y + "]");

        //check game state
        switch(getState().game_state){
            case gameInProgress: 
                //manipulate flag values
            default:
                // do nothing
        }
    }
}