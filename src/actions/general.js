import {
    // actions
    SET_MENU, SET_GAME_STATE, RESET_GAME, REVEAL_TILE, SET_MOUSE_STATE, SET_FLAG, SET_BOARD_SIZE, SET_TILE_VALUE,
    INC_TIMER,

    //game states
    gameInProgress,
 
    } from '../other/definitions';

export const setMenu = (id) => {
    return{
        type: SET_MENU,
        id: id,
    }
}
export const setMouseState = (val) => {
    return{
        type: SET_MOUSE_STATE,
        val: val,
    }
}
export const editSettings = (setting, value) => {
    return{
        type: 'EDIT_SETTING',
        setting: setting,
        value: value,
    }
}
export const resetGame = () => {
    return{
        type: RESET_GAME,
    }
}
// https://stackoverflow.com/questions/34577012/creating-a-stopwatch-with-redux

//timer can only be started when the gamestate is 1, it stops when the gamestate is not 1
/* this timer works, but is inaccurate because a variable amount of time is added to the dispatch of each incTimer() based on how fast the code is running
export const startTimer = () => {
    return(dispatch, getState) => {
        if(getState().game_state !== gameInProgress){
            return;
        }
        setTimeout(() => dispatch(startTimer()) , 1);
        dispatch(incTimer());
    }
}
*/
export const startTimer = () => {
}
export const incTimer = () => {
    return{
        type: INC_TIMER,
    }
}