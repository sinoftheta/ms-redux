//...because integer comparisons are faster than string comparisons

// import * as myModule from '/modules/my-module.js'; mayeb import as a namaespace
// TILE PLACES //
export const west = 0; 
export const northWest = 1; 
export const north = 2; 
export const northEast = 3; 
export const east = 4; 
export const southEast = 5; 
export const south = 6; 
export const southWest = 7; 
export const middle = 8;

//FLAG STATES//
export const unflagged = 0;
export const flagged = 1;
export const questioned = 2;

// TILE VALUES //
export const mine = 9;

// CLICKS //
export const leftMouse = 0;
export const middleMouse = 1;
export const rightMouse = 2;

// MOUSE STATES //
export const up = 0;
export const down = 1;

// GAME STATES //
export const preGameIdle = 0;
export const gameInProgress = 1;
export const postGameIdle = 2;
export const playingReplay = 3;
export const postReplayIdle = 4;

// GAME MODES //
export const beginner = 0;
export const intermediate = 1;
export const advanced = 2;
export const custom = 3;

// ACTIONS // 
export const SET_MENU           = 0;
export const SET_GAME_STATE     = 1;
export const RESET_GAME         = 2;
export const REVEAL_TILE        = 3;
export const SET_MOUSE_STATE    = 4;
export const SET_FLAG           = 5;
export const SET_TILE_VALUE     = 6;
export const SET_BOARD_SIZE     = 7;
 
export const RECORD_MOVE        = 8; // should be combined into SET_FLAG and REVEAL_TILE ? 
export const CLEAR_REPLAY       = 9; // should be combined into RESET_GAME

export const SET_LAST_GAME_WON  = 10;
export const INC_TIMER          = 11;
export const CLEAR_TIMER        = 12;

// TILE OBJECT DEFINITION //
export const tileInit = {
    revealed: false,
    flagged: false,
    questioned: false,
    val: -1, // # of mines surrounding tiles. 9 means a bomb
    border: -1, 
}


// SETTINGS OBJECT DEFINITION // (values set are the default settings)
export const defaultSettings = {
    gameMode: beginner,
    seed: "", // if seed is an empty string, it will be replaced with a random seed that will be saved in the replay

    //custom game options
    boardLength: 40,
    boardHeight: 20,
    numberOfMines: 420,

    //mechanics options
    questionFlags: true,
    autoRestart: false,
    trainingMode: false,

}


export const replay = {
    s: "", //board seed
    x: 1234, //board width
    y: 1234, //board height
    c: [ //clicks
        {
            x: 1234, //click x coord
            y: 1234, //click y coord
            t: 1234, //click timestamp
            c: 0 // click type (left right or middle)


            //check for one of each click type with every unique timestamp
        }
    ]
}
