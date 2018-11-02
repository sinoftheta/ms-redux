// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { setMenu } from '../redux/actions';

// COMPONENTS //
//import Tile from './components/Tile';

class Board extends Component {
    render() {

        // map the visible board
        //console.log(this.props.visible_board);
        let board = this.props.visible_board.map((row, i) =>
            
                <div id={"row-" + i} className="row" key={i}>
                    {
                        row.map((tile, j) =>
                            //<Tile
                            //    x={i}
                            //    y={j}
                            //    key={j}
                            ///>
                            <div className="tile" id={ "" + i + "-" + j} key={j}/>

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
        current_menu: state.current_menu, //might not need?
        visible_board: state.visible_board,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setMenu: (id) => dispatch(setMenu(id)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Board);