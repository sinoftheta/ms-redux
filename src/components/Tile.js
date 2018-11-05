// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
//import { } from '../redux/actions';

class Tile extends Component {

    render() {

        // tiles are always able to report their clicks
        //the engine will determine what to do with the click depending on the game_state
        //i.e. if its the first click of a game, or to ignore it...

        
        return (
            <div className="tile" id={ "" + this.props.x + "-" + this.props.y}
            onClick={/* dispatch generate click */}>
                {/* graphics, if needed */}
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {

    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(tile);