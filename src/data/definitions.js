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
export const safe = 0;

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


// ACTION TYPES // 
export const SET_MENU = 0;


