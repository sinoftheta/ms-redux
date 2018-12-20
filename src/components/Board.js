// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { setMenu } from '../actions/general';

// COMPONENTS //
import Tile from './Tile';

class Board extends Component {
    shouldComponentUpdate(nextProps, nextState){
        //should only update when the dimensions of the board change.
        return  nextProps.x !== this.props.x || 
                nextProps.y !== this.props.y;
    }
    render() {

        // map the visible board
        //console.log(this.props.board);
        let tiles = this.props.board.map((row, i) =>
                <div id={"row-" + i} className="row" key={i}>
                    {
                        row.map((tile, j) =>
                            <Tile x={j} y={i} key={j}/>
                        )
                    }
                    </div>
        );
        return (
            <div id="board">
                <div id="grid">
                    {tiles}
                </div>
            </div>

        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {
        board: state.board,
        x: state.board.length,
        y: state.board[0].length,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        setMenu: (id) => dispatch(setMenu(id)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Board);