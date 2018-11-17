// this file is for miscelanious functions that arent actions


// DEFINITIONS //
import {
    // tile borders
    west, northWest, north, northEast, east, southEast, south, southWest, middle,

        } from './definitions';


export const matrix = (cols,rows) => {
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
                val: 0, 
                border: null, 
            }
            
            if(i === 0 && j === 0){
                arr[i][j].border = northWest;
            }
            else if( i === 0 && j === cols - 1){
                arr[i][j].border = northEast;
            }
            else if( i === rows - 1 && j === 0){
                arr[i][j].border = southWest;
            }
            else if( i === rows - 1 && j === cols - 1){
                arr[i][j].border = southEast;
            }
            else if( i === 0 ){
                arr[i][j].border = north;
            }
            else if( i === rows - 1){
                arr[i][j].border = south;
            }
            else if( j === 0 ){
                arr[i][j].border = west;
            }
            else if( j === cols - 1){
                arr[i][j].border = east;
            }
            else{
                arr[i][j].border = middle;
            }
        }
    }
  
  return arr;
}

export const evalNeighbors = ( board , x , y , key, value , f ) => {
    switch(board[y][x].border){
        case middle: 
            if(board[y][x + 1][key] === value)        f( x + 1 , y );            //check east
            if(board[y + 1][x + 1][key] === value)    f( x + 1 , y + 1 );        //check southeast
            if(board[y + 1][x][key] === value)        f( x , y + 1 );            //check south
            if(board[y + 1][x - 1][key] === value)    f( x - 1 , y + 1 );        //check southwest
            if(board[y][x - 1][key] === value)        f( x - 1 , y );            //check west
            if(board[y - 1][x - 1][key] === value)    f( x - 1 , y - 1 );        //check northwest
            if(board[y - 1][x][key] === value)        f( x , y - 1 );            //check north
            if(board[y - 1 ][x + 1][key] === value)   f( x + 1 , y - 1 );        //check northeast
            break;
        case north:
            if(board[y][x + 1][key] === value)        f( x + 1 , y );            //check east
            if(board[y + 1][x + 1][key] === value)    f( x + 1 , y + 1 );        //check southeast
            if(board[y + 1][x][key] === value)        f( x , y + 1 );            //check south
            if(board[y + 1][x - 1][key] === value)    f( x - 1 , y + 1 );        //check southwest
            if(board[y][x - 1][key] === value)        f( x - 1 , y );            //check west
            break;
        case northEast: 
            if(board[y + 1][x][key] === value)        f( x , y + 1 );            //check south
            if(board[y + 1][x - 1][key] === value)    f( x - 1 , y + 1 );        //check southwest
            if(board[y][x - 1][key] === value)        f( x - 1 , y );            //check west
            break;
        case east: 
            if(board[y + 1][x][key] === value)        f( x , y + 1 );            //check south
            if(board[y + 1][x - 1][key] === value)    f( x - 1 , y + 1 );        //check southwest
            if(board[y][x - 1][key] === value)        f( x - 1 , y );            //check west
            if(board[y - 1][x - 1][key] === value)    f( x - 1 , y - 1 );        //check northwest
            if(board[y - 1][x][key] === value)        f( x , y - 1 );            //check north
            break;
        case southEast: 
            if(board[y][x - 1][key] === value)        f( x - 1 , y );            //check west
            if(board[y - 1][x - 1][key] === value)    f( x - 1 , y - 1 );        //check northwest
            if(board[y - 1][x][key] === value)        f( x , y - 1 );            //check north
            break;
        case south: 
            if(board[y][x - 1][key] === value)        f( x - 1 , y );            //check west
            if(board[y - 1][x - 1][key] === value)    f( x - 1 , y - 1 );        //check northwest
            if(board[y - 1][x][key] === value)        f( x , y - 1 );            //check north
            if(board[y - 1 ][x + 1][key] === value)   f( x + 1 , y - 1 );        //check northeast
            if(board[y][x + 1][key] === value)        f( x + 1 , y );            //check east
            break;
        case southWest: 
            if(board[y - 1][x][key] === value)        f( x , y - 1 );            //check north
            if(board[y - 1 ][x + 1][key] === value)   f( x + 1 , y - 1 );        //check northeast
            if(board[y][x + 1][key] === value)        f( x + 1 , y );            //check east
            break;
        case west: 
            if(board[y][x + 1][key] === value)        f( x + 1 , y );            //check east
            if(board[y + 1][x + 1][key] === value)    f( x + 1 , y + 1 );        //check southeast
            if(board[y + 1][x][key] === value)        f( x , y + 1 );            //check south
            if(board[y - 1][x][key] === value)        f( x , y - 1 );            //check north
            if(board[y - 1 ][x + 1][key] === value)   f( x + 1 , y - 1 );        //check northeast
            break;
        case northWest: 
            if(board[y][x + 1][key] === value)        f( x + 1 , y );            //check east
            if(board[y + 1][x + 1][key] === value)    f( x + 1 , y + 1 );        //check southeast
            if(board[y + 1][x][key] === value)        f( x , y + 1 );            //check south
            break;
        default:
            break;
    }
}