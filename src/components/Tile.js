// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { rightClick } from '../actions/boardActions';
import {
    mine, //value for mine
    preGameIdle, gameInProgress, postGameIdle, playingReplay, postReplayIdle, //game states
    } from '../data/definitions'

class Tile extends Component {

    render() { // tile numbers and graphics will need to be easily rotateable
        //let tile = this.props.board[this.props.y][this.props.x];

        //tile rendering behavior
        switch(this.props.game_state){
            default:
            case preGameIdle:
                
                break;
            case gameInProgress: //note: the tiles have the same rendering behavior while the game is in progress and playinh a replay
            case playingReplay:
                break;
            case postGameIdle:
            case postReplayIdle:
                break;
        }

        return (
            <div className={"tile"} id={ "" + this.props.x + "-" + this.props.y}
            onClick={( x , y ) => this.props.rightClick( this.props.x , this.props.y)}>
                {}
                {}
                {}
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {
        //board: state.board,
        game_state: state.game_state,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        rightClick: (x,y) => dispatch(rightClick(x,y)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tile);