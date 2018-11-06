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
        let board = this.props.board.map((row, i) =>
            
                <div id={"row-" + i} className="row" key={i}>
                    {
                        row.map((tile, j) =>
                            <Tile
                                x={j}
                                y={i}
                                key={j}
                            />
                            //<div className="tile" id={ "" + i + "_" + j} key={j}/>

                        )
                    }
                    </div>
            
        );
        return (
            <div id="gameboard">
                {board}
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {

    
    return {
        //current_menu: state.current_menu, //might not need? nah man I dont think I do
        board: state.board,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setMenu: (id) => dispatch(setMenu(id)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Board);