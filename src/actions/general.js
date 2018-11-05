export const setMenu = (id) => {
    return{
        type: 'SET_MENU',
        id: id,
    }
}
export const editSettings = (setting, value) => {
    return{
        type: 'EDIT_SETTING',
        setting: setting,
        value: value,
    }
}

export const createNewClick = (x,y) => {
    return(dispatch, getState) => {
        //update board
        //dispatch(applyClickToBoard(x,y)); 
        
        
        // depending on proformance, I may want to experiment with switching these two lines of code...
        // it may be a tradeoff between time accuracy and responsiveness

        //record timestamp
        let t = getState().time;

        //save in replay array
        //dispatch(saveClick(x,y,t));

    }
}





//need a dispatcher that applies click objects to board
export const applyClickToBoard = (x,y) => {
    //meat of the game logic goes here

    //will dispatch actions that mutate both the visible and internal board
}


//on first click:

//generate seed for safe first click
    //incriment given seed until a first click is found, then report back what the found seed is
//THEN start counter