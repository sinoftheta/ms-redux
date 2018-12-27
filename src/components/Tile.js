// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { leftClick , rightClick } from '../actions/boardActions';
//import { setMouseState } from '../actions/general';


// DEFINITIONS //
import {
    // TILE VALUES //
    mine,

    // CLICKS //
    leftMouse, middleMouse, rightMouse,

    // GAME STATES // ... tiles only really care if they are in postGameIdle or
    preGameIdle, gameInProgress, postGameIdle, playingReplay, postReplayIdle, 
    } from '../other/definitions'


    // TODO: use event.buttons instead of event.button in some/all cases? 
class Tile extends Component {
    constructor(props) {
        super(props);
        this.tile = React.createRef();
    }

    shouldComponentUpdate(nextProps){
        /*if(nextProps.val !== this.props.val){
            console.log("well damn");
            return false;
        }
        if(nextProps.gameState === gameInProgress && this.props.gameState === preGameIdle){
            console.log("well poop in my soup");
            return false;
        }*/
        return true;
    }

    render() { // tile numbers and graphics will need to be easily rotateable
        //let tile = this.props.board[this.props.y][this.props.x];

        let valueClass = " tile-val-" + this.props.val;
        let val;
        let tileStateClass;


        switch(this.props.game_state){
            default:
            case preGameIdle:
            case gameInProgress:
            case playingReplay:
            //only reveal revealed tiles
                if(this.props.revealed){
                    tileStateClass = " tile-revealed";
                    (this.props.val > 0  && this.props.val < mine)? val = this.props.val: val = null;
                }
                else{
                    tileStateClass = " tile-not-revealed";
                }
                break;
            case postGameIdle:
            case postReplayIdle:
                //reveal revealed tiles and all mines

                // TODO: account for incorrect flags and the clicked mine
                if(this.props.revealed){
                    tileStateClass = " tile-revealed";
                    (this.props.val > 0  && this.props.val < mine)? val = this.props.val: val = null;
                }
                else{
                    tileStateClass = " tile-not-revealed";
                }
                if(this.props.val === mine){
                    val = '*';
                    tileStateClass = " tile-revealed";
                }
                break;
        }
        
        return (
            // double click behavior https://www.w3schools.com/jsref/event_ondblclick.asp
            // also might consider using event.buttons (plural) for more specified behavior https://www.w3schools.com/jsref/event_buttons.asp
            <div className={"tile unselectable" + tileStateClass + valueClass} id={ "" + this.props.x + "-" + this.props.y}
            onMouseUp={ (event) => { //somewhere in this function I have to set the mouse click state to up
                // mouseUp behavior is dependent on which type of mouse button it is
                switch(event.button){
                    case leftMouse:
                        this.props.leftClick(this.props.x, this.props.y); // should be renamed open tile?
                        this.tile.current.classList.remove("tile-pushed");


                        break;
                    case middleMouse:
                        break;
                    case rightMouse:
                        break;
                    default:
                        break;
                }
                //console.log("onMouseUp, event.button = " + event.button)
                
                //this.props.leftClick( this.props.x , this.props.y); 
            }}
            onMouseDown={
                (event) => {
                    // prevent dragging
                    event.preventDefault();

                    // mouseUp behavior is dependent on which type of mouse button it is
                    switch(event.button){
                        case leftMouse:
                            this.tile.current.classList.add("tile-pushed");
                            this.tile.current.classList.remove("tile-not-revealed");

                            break;
                        case middleMouse:
                            //do the 9 tile block thing
                            //this.props.middleClick(this.props.x, this.props.y);
                            break;
                        case rightMouse:
                            //manipulate flags
                            this.props.rightClick(this.props.x, this.props.y)
                            break;
                        default:
                            break;
                    }
                    
                }}
            onContextMenu={
                (event) => {
                    // prevent right click menu
                    event.preventDefault();
                    // I probably wont put anything else in this function. maybe a hint menu or something?
                    //console.log("onContextMenu, event.button = " + event.button)
                }}
            onMouseEnter={(event) => {
                //console.log("onMouseEnter() @ (" + this.props.x +  "," + this.props.y + ")");
                //upon entering with a pushed left mouse
                if(event.buttons === 1){ // this will change to a switch statement when I impliment the middle click thing
                    this.tile.current.classList.add("tile-pushed");
                    this.tile.current.classList.remove("tile-not-revealed");
                }
            }}
            onMouseLeave={(event) => {
                //console.log("onMouseLeave() @ (" + this.props.x +  "," + this.props.y + ")");
                this.tile.current.classList.remove("tile-pushed");
                if(!this.tile.current.classList.contains("tile-revealed")){
                    this.tile.current.classList.add("tile-not-revealed");
                }
                
            }}
            ref={this.tile}
            
            >
                <div className="num-container">
                    {val}
                </div>
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state, ownProps) => {
    return {
        revealed: state.board[ownProps.y][ownProps.x].revealed,
        flagged: state.board[ownProps.y][ownProps.x].flagged,
        questioned: state.board[ownProps.y][ownProps.x].questioned,
        val: state.board[ownProps.y][ownProps.x].val,
        game_state: state.game_state, // OH SHIT THIS IS CAUSING LAG WHEN THE STATE CHANGES FROM PREGAMEIDLE TO IN PROGRESS
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        leftClick: (x,y) => dispatch(leftClick(x,y)),
        rightClick: (x,y) => dispatch(rightClick(x,y)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tile);