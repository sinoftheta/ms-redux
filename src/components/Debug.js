// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { setMenu , resetGame } from '../actions/general';

class Debug extends Component {
    render() {

        return (
            <div id="DEBUG">
                <div>game_state: {this.props.game_state}</div>
                <div>current_menu: {this.props.current_menu}</div>
                <div>mouse_state: {this.props.mouse_state}</div>
                <div>tiles_cleared: {this.props.tiles_cleared}</div>
                <div>start_timestamp (ms): {this.props.start_timestamp}</div>
                <div>last_game_won: {this.props.last_game_won.toString()}</div>
                <button onClick={() => console.log(JSON.stringify(this.props.move_array))}>log(move_array)</button>
                <br/>
                <button onClick={() => this.props.resetGame()}>reset</button>
                <br/>
                <button onClick={() => this.props.setMenu(Number(document.getElementById("debug-textarea-1").value))}> set current_menu</button>
                <textarea rows="1" cols="4" id="debug-textarea-1"/><br/>
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {
        current_menu: state.current_menu,
        game_state: state.game_state,
        mouse_state: state.mouse_state,
        tiles_cleared: state.tiles_cleared,
        last_game_won: state.last_game_won,
        start_timestamp: state.start_timestamp,
        move_array: state.move_array,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMenu: (id) => dispatch(setMenu(id)),
        resetGame: () => dispatch(resetGame()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Debug);