// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { generateClick } from '../actions/boardActions';

class Tile extends Component {

    render() {

        // tiles are always able to report their clicks
        //the engine will determine what to do with the click depending on the game_state
        //i.e. if its the first click of a game, or to ignore it...

        
        return (
            //onClick = () => this.props.generateClick(this.props.x, this.props.y)
            <div className="tile" id={ "" + this.props.x + "-" + this.props.y}
            onClick={( x , y ) => this.props.generateClick( x , y)}
            >
            
            
            
                {/* graphics, if needed */}
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {
        board: state.board,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tile);