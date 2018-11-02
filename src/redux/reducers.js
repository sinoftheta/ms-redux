import { combineReducers } from 'redux';
//a store variable should be given its own file if it will be mutated by a lot of actions...

//this file contains the reducers for general purpose variables, including the main board memory

const matrix = ( rows, cols, defaultValue) => {

    var arr = [];
  
    // Creates all lines:
    for(var i=0; i < rows; i++){
  
        // Creates an empty line
        arr.push([]);
  
        // Adds cols to the empty line:
        arr[i].push( new Array(cols));
  
        for(var j=0; j < cols; j++){
          // Initializes:
          arr[i][j] = defaultValue;
        }
    }
  
  return arr;
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


const visible_board = ( state = matrix(16, 30, 9) , action) => { // default is just an advanced board, will change this later to read from a settings file.
    //default value is 9, which will represent a covered tile. 10 is flag, 11 is "?"
    switch(action.type){
        //oh boy oh boy
        default:
            return state;
    }
}

const internal_board = (state = matrix(16, 30, 0) , action) => {

}

//const replay

//const timer


//...

//gonna need a fuck ton of shit for the options


// COMBINE REDUCERS
export default combineReducers({

    current_menu,
    game_state,

    visible_board,




});