import { combineReducers } from 'redux';
import { west, northWest, north, northEast, east, southEast, south, southWest, middle } from '../data/definitions'
//a store variable should be given its own file if it will be mutated by a lot of actions...

//this file contains the reducers for general purpose variables, including the main board memory


//define all action types as integers to make the switch statements faster
const matrix = (cols,rows, defaultValue) => {
    var arr = [];
  
    // Creates all lines:
    for(var i=0; i < rows; i++){
  
        // Creates an empty line
        arr.push([]);
  
        // Adds cols to the empty line:
        arr[i].push( new Array(cols));
  
        for(var j=0; j < cols; j++){ // ITS A SCOPE/COPY ISSUE, 
            // Initializes:
            arr[i][j] = {
                revealed: false,
                flagged: false,
                questioned: false,
                val: 0, // # of mines surrounding tiles. 9 means a bomb
                place: null, 
            }
            

            if(i === 0 && j === 0){
                arr[i][j].place = northWest;
            }
            else if( i === 0 && j === cols - 1){
                arr[i][j].place = northEast;
            }
            else if( i === rows - 1 && j === 0){
                arr[i][j].place = southWest;
            }
            else if( i === rows - 1 && j === cols - 1){
                //console.log("fire");
                arr[i][j].place = southEast;
            }
            else if( i === 0 ){
                arr[i][j].place = north;
            }
            else if( i === rows - 1){
                arr[i][j].place = south;
            }
            else if( j === 0 ){
                arr[i][j].place = west;
            }
            else if( j === cols - 1){
                arr[i][j].place = east;
            }
            else{
                arr[i][j].place = middle;
            }
            //console.log(arr[i][j].place);
        }
    }
  
  return arr;
}
const tileInit = {
        revealed: false,
        flagged: false,
        questioned: false,
        val: 0, // # of mines surrounding tiles. 9 means a bomb
        border: null, 
}

const current_menu = (state = 0, action) => { // 0 means no menu, each menu has a corresponding id
    switch(action.type){
        case 'SET_MENU':
            return action.id;
        default:
            return state;
    }
}
const game_state = (state = 0, action) => { // 0: pre-game-idle, 1: in-progress, 2: post-game-idle, 3: replay 
    switch(action.type){
        case 'SET_GAME_STATE':
            return action.value;
        // may have this respond to other actions as well like a reset button
        default:
            return state;
    }
}


const board = ( state = matrix( 16, 16, tileInit) , action) => { // default is just an advanced board, will change this later to read from a settings file.
    switch(action.type){
        //oh boy oh boy

        // redux miiiiight make this kinda resource intensive idk
        case 'SET_TILE_VALUE':
            return [
                ...state.slice(0, action.y),
                [
                    ...state[action.y].slice(0, action.x),
                    {
                        revealed: false,
                        flagged: false,
                        questioned: false,
                        val: action.val,
                    },
                    ...state[action.y].slice(action.x + 1)
                ],
                ...state.slice( action.y + 1)
            ];
        case 'SET_BOARD_SIZE':
            return matrix(action.height, action.width, tileInit)
        default:
            return state;
    }
}
//const replay

//const timer


//

//gonna need a fuck ton of shit for the options


// COMBINE REDUCERS
export default combineReducers({

    current_menu,
    game_state,

    board,




});