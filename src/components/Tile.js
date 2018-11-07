// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { generateClick } from '../actions/boardActions';

class Tile extends Component {

    render() { // tile numbers and graphics will need to be easily rotateable
        let tile = this.props.board[this.props.y][this.props.x];

        let mined = "";
        let num;

        if(tile.val === 9){
            mined = " mined";
        }
        else if(tile.val > 0 ){
            num = tile.val;
        }

        //{num}
        return (
            //onClick = () => this.props.generateClick(this.props.x, this.props.y)
            <div className={"tile" + mined} id={ "" + this.props.x + "-" + this.props.y}
            onClick={( x , y ) => this.props.generateClick( this.props.x , this.props.y)}
            >
            
                
                {/*tile.place*/}
            
                {/* graphics, if needed */}
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {
        board: state.board,
        game_state: state.game_state,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        generateClick: (x,y) => dispatch(generateClick(x,y)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tile);