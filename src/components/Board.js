// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { setMenu } from '../actions/general';

// COMPONENTS //
import Tile from './Tile';

class Board extends Component {
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
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        setMenu: (id) => dispatch(setMenu(id)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Board);