import seedrandom from 'seedrandom'; //https://www.npmjs.com/package/seedrandom
import {
    west, northWest, north, northEast, east, southEast, south, southWest, middle, //tile places
    mine,
    preGameIdle, gameInProgress, postGameIdle, playingReplay, postReplayIdle, //game states
    } from '../data/definitions'

const totalMines = 15; 
export const setGameState = (id) => {
    return{
        type: 'SET_GAME_STATE',
        id: id,
    }
}
export const setTileValue = ( x, y, val = mine ) => {
    return{
        type: 'SET_TILE_VALUE',
        x: x,
        y: y,
        val: val,
    }
}
export const revealTile = ( x, y,) => {
    console.log("revealing [ " + x + " , " + y + " ]");
    return{
        type: 'REVEAL_TILE',
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
            if(getState().board[y][x].val === mine){
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
                if(board[i][j].val === mine){
                    countedMines++;
                }
            }
        } // */
        //console.log("counted mines: " + countedMines);

    }
}



export const placeNumbers = () => {
    return(dispatch, getState) => {
        // place numbers
        let board = getState().board;
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){

                // if tile is already a mine, skip it.
                if(board[i][j].val === mine ){// this if statement avoids instantiating adjMines for the mines, may improve preformance
                    continue;
                }
                let adjMines = 0;

                switch(board[i][j].border){ //could I use a generator function or array or something to automate this?
                    case middle: 
                        if(board[i][j + 1].val === mine) adjMines++; //check east
                        if(board[i + 1][j + 1].val === mine) adjMines++;//check southeast
                        if(board[i + 1][j].val === mine) adjMines++; //check south
                        if(board[i + 1][j - 1].val === mine) adjMines++; //check southwest
                        if(board[i][j - 1].val === mine) adjMines++//check west
                        if(board[i - 1][j - 1].val === mine) adjMines++;//check northwest
                        if(board[i - 1][j].val === mine) adjMines++; //check north
                        if(board[i - 1 ][j + 1].val === mine) adjMines++ //check northeast
                        break;
                    case north:
                        if(board[i][j + 1].val === mine) adjMines++; //check east
                        if(board[i + 1][j + 1].val === mine) adjMines++;//check southeast
                        if(board[i + 1][j].val === mine) adjMines++; //check south
                        if(board[i + 1][j - 1].val === mine) adjMines++; //check southwest
                        if(board[i][j - 1].val === mine) adjMines++//check west
                        break;
                    case northEast: 
                        if(board[i + 1][j].val === mine) adjMines++; //check south
                        if(board[i + 1][j - 1].val === mine) adjMines++; //check southwest
                        if(board[i][j - 1].val === mine) adjMines++//check west
                        break;
                    case east: 
                        if(board[i + 1][j].val === mine) adjMines++; //check south
                        if(board[i + 1][j - 1].val === mine) adjMines++; //check southwest
                        if(board[i][j - 1].val === mine) adjMines++//check west
                        if(board[i - 1][j - 1].val === mine) adjMines++;//check northwest
                        if(board[i - 1][j].val === mine) adjMines++; //check north
                        break;
                    case southEast: 
                        if(board[i][j - 1].val === mine) adjMines++//check west
                        if(board[i - 1][j - 1].val === mine) adjMines++;//check northwest
                        if(board[i - 1][j].val === mine) adjMines++; //check north
                        break;
                    case south: 
                        if(board[i][j + 1].val === mine) adjMines++; //check east
                        if(board[i][j - 1].val === mine) adjMines++//check west
                        if(board[i - 1][j - 1].val === mine) adjMines++;//check northwest
                        if(board[i - 1][j].val === mine) adjMines++; //check north
                        if(board[i - 1 ][j + 1].val === mine) adjMines++ //check northeast
                        break;
                    case southWest: 
                        if(board[i][j + 1].val === mine) adjMines++; //check east
                        if(board[i - 1][j].val === mine) adjMines++; //check north
                        if(board[i - 1 ][j + 1].val === mine) adjMines++ //check northeast
                        break;
                    case west: 
                        if(board[i][j + 1].val === mine) adjMines++; //check east
                        if(board[i + 1][j + 1].val === mine) adjMines++;//check southeast
                        if(board[i + 1][j].val === mine) adjMines++; //check south
                        if(board[i - 1][j].val === mine) adjMines++; //check north
                        if(board[i - 1 ][j + 1].val === mine) adjMines++ //check northeast
                        break;
                    case northWest: 
                        if(board[i][j + 1].val === mine) adjMines++; //check east
                        if(board[i + 1][j + 1].val === mine) adjMines++;//check southeast
                        if(board[i + 1][j].val === mine) adjMines++; //check south
                        break;
                    default:
                        break;
                }
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
            return;
        }

        //reveal tile
        dispatch(revealTile( x , y));


        //check lose condition
        if(board[y][x].val === mine){
            dispatch(setGameState(postGameIdle));
            alert("you lost!");
        }

        //check win condition
        if(getState().tiles_cleared === board.length * board[0].length - totalMines){ // TOTAL MINES MUST BE READ FROM STORE
            dispatch(setGameState(postGameIdle));
            alert("you won!");
        }
        
        //if tile is a zero, recurse over all neighbors
        if(board[y][x].val === 0){
            //reveal neighbors

            //TODO: the if statements here are to check for flags
            switch(board[y][x].border){ //could I use a generator function or array or something to automate this?
                case middle: 
                    if(!board[y][x + 1].flagged)        dispatch(uncoverTiles( x + 1 , y ));            //check east
                    if(!board[y + 1][x + 1].flagged)    dispatch(uncoverTiles( x + 1 , y + 1 ));        //check southeast
                    if(!board[y + 1][x].flagged)        dispatch(uncoverTiles( x , y + 1 ));            //check south
                    if(!board[y + 1][x - 1].flagged)    dispatch(uncoverTiles( x - 1 , y + 1 ));        //check southwest
                    if(!board[y][x - 1].flagged)        dispatch(uncoverTiles( x - 1 , y ));            //check west
                    if(!board[y - 1][x - 1].flagged)    dispatch(uncoverTiles( x - 1 , y - 1 ));        //check northwest
                    if(!board[y - 1][x].flagged)        dispatch(uncoverTiles( x , y - 1 ));            //check north
                    if(!board[y - 1 ][x + 1].flagged)   dispatch(uncoverTiles( x + 1 , y - 1 ));        //check northeast
                    break;
                case north:
                    if(!board[y][x + 1].flagged)        dispatch(uncoverTiles( x + 1 , y ));            //check east
                    if(!board[y + 1][x + 1].flagged)    dispatch(uncoverTiles( x + 1 , y + 1 ));        //check southeast
                    if(!board[y + 1][x].flagged)        dispatch(uncoverTiles( x , y + 1 ));            //check south
                    if(!board[y + 1][x - 1].flagged)    dispatch(uncoverTiles( x - 1 , y + 1 ));        //check southwest
                    if(!board[y][x - 1].flagged)        dispatch(uncoverTiles( x - 1 , y ));            //check west
                    break;
                case northEast: 
                    if(!board[y + 1][x].flagged)        dispatch(uncoverTiles( x , y + 1 ));            //check south
                    if(!board[y + 1][x - 1].flagged)    dispatch(uncoverTiles( x - 1 , y + 1 ));        //check southwest
                    if(!board[y][x - 1].flagged)        dispatch(uncoverTiles( x - 1 , y ));            //check west
                    break;
                case east: 
                    if(!board[y + 1][x].flagged)        dispatch(uncoverTiles( x , y + 1 ));            //check south
                    if(!board[y + 1][x - 1].flagged)    dispatch(uncoverTiles( x - 1 , y + 1 ));        //check southwest
                    if(!board[y][x - 1].flagged)        dispatch(uncoverTiles( x - 1 , y ));            //check west
                    if(!board[y - 1][x - 1].flagged)    dispatch(uncoverTiles( x - 1 , y - 1 ));        //check northwest
                    if(!board[y - 1][x].flagged)        dispatch(uncoverTiles( x , y - 1 ));            //check north
                    break;
                case southEast: 
                    if(!board[y][x - 1].flagged)        dispatch(uncoverTiles( x - 1 , y ));            //check west
                    if(!board[y - 1][x - 1].flagged)    dispatch(uncoverTiles( x - 1 , y - 1 ));        //check northwest
                    if(!board[y - 1][x].flagged)        dispatch(uncoverTiles( x , y - 1 ));            //check north
                    break;
                case south: 
                    if(!board[y][x - 1].flagged)        dispatch(uncoverTiles( x - 1 , y ));            //check west
                    if(!board[y - 1][x - 1].flagged)    dispatch(uncoverTiles( x - 1 , y - 1 ));        //check northwest
                    if(!board[y - 1][x].flagged)        dispatch(uncoverTiles( x , y - 1 ));            //check north
                    if(!board[y - 1 ][x + 1].flagged)   dispatch(uncoverTiles( x + 1 , y - 1 ));        //check northeast
                    if(!board[y][x + 1].flagged)        dispatch(uncoverTiles( x + 1 , y ));            //check east
                    break;
                case southWest: 
                    if(!board[y - 1][x].flagged)        dispatch(uncoverTiles( x , y - 1 ));            //check north
                    if(!board[y - 1 ][x + 1].flagged)   dispatch(uncoverTiles( x + 1 , y - 1 ));        //check northeast
                    if(!board[y][x + 1].flagged)        dispatch(uncoverTiles( x + 1 , y ));            //check east
                    break;
                case west: 
                    if(!board[y][x + 1].flagged)        dispatch(uncoverTiles( x + 1 , y ));            //check east
                    if(!board[y + 1][x + 1].flagged)    dispatch(uncoverTiles( x + 1 , y + 1 ));        //check southeast
                    if(!board[y + 1][x].flagged)        dispatch(uncoverTiles( x , y + 1 ));            //check south
                    if(!board[y - 1][x].flagged)        dispatch(uncoverTiles( x , y - 1 ));            //check north
                    if(!board[y - 1 ][x + 1].flagged)   dispatch(uncoverTiles( x + 1 , y - 1 ));        //check northeast
                    break;
                case northWest: 
                    if(!board[y][x + 1].flagged)        dispatch(uncoverTiles( x + 1 , y ));            //check east
                    if(!board[y + 1][x + 1].flagged)    dispatch(uncoverTiles( x + 1 , y + 1 ));        //check southeast
                    if(!board[y + 1][x].flagged)        dispatch(uncoverTiles( x , y + 1 ));            //check south
                    break;
                default:
                    break;
            }
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

                // check win condition

                // save to replay
                break;
            case gameInProgress:
                // uncover tiles
                dispatch(uncoverTiles( x , y));

                // check win condition

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