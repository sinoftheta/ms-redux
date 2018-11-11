import {
    // actions
    SET_MENU, SET_GAME_STATE, RESET_GAME, REVEAL_TILE, SET_MOUSE_STATE, SET_FLAG, SET_BOARD_SIZE, SET_TILE_VALUE
 
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