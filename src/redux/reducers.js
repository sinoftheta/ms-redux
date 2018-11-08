// REDUX //
import { combineReducers } from 'redux';

// DEFINITIONS //
import {
    //TILE PLACES
    west, northWest, north, northEast, east, southEast, south, southWest, middle,

    //TILE VALUES
    safe,

    //game states
    preGameIdle,

    // mouse states
    up,
    } from '../data/definitions'

//this file contains the reducers for general purpose variables, including the main board memory


//define all action types as integers to make the switch statements faster
const matrix = (cols,rows) => {
    var arr = [];
  
    // Creates all lines
    for(var i=0; i < rows; i++){
  
        // Create an empty line (with a length of "rows")
        arr.push([]);
  
        // Add cols to the empty line
        arr[i].push( new Array(cols));
  
        for(var j=0; j < cols; j++){
            // Initialization
            arr[i][j] = {
                revealed: false,
                flagged: false,
                questioned: false,
                val: safe, 
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

// STATES
const current_menu = (state = 0, action) => { // 0 means no menu, each menu has a corresponding id
    switch(action.type){
        case 'SET_MENU':
            return action.id;
        default:
            return state;
    }
}
const game_state = (state = preGameIdle, action) => {
    switch(action.type){
        case 'SET_GAME_STATE':
            return action.id;
        // may have this respond to other actions as well like a reset button
        default:
            return state;
    }
}
const mouse_state = (state = up, action) => {
    switch(action.type){
        case 'SET_MOUSE_STATE':
            return action.val;
        default:
            return state;
    }
}

const board = ( state = matrix( 30, 16, tileInit) , action) => { // default is just an advanced board, will change this later to read from a settings file.
    switch(action.type){
        // spread operators and slice() miiiiight make this kinda resource intensive idk
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
const replay = (state = [], action) => {
    switch(action.type){
        case 'RECORD_MOVE':
            return state.concat([action.move]);
        case 'CLEAR_REPLAY':
            return [];
        default:
            return state;
    }
}

//const timer



// COMBINE REDUCERS
export default combineReducers({ //creates the root reducer, its imported and used by the store

    current_menu,
    game_state,
    mouse_state,

    board,




});