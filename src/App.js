import React, { Component } from 'react';

// STYLES //
import './style/App.css';


// VIEWS //
import GenSettings from './views/GenSettings';

// COMPONENTS //
import MenuToggleButton from './components/MenuToggleButton';
import Board from './components/Board';
import Debug from './components/Debug';

// JSON //

// REDUX //
import { connect } from 'react-redux';

class App extends Component {
    render() {
        let overlay;
        if(this.props.current_menu !== 0){ // if the app is in a menu, make the game area unclickable
            overlay = <div id="overlay" onClick={ () => this.props.setMenu(0) }/>
        }
        return ( // man my html needs a fuckin refactor already lol
            <div className="App">
                <div id="game-area">
                    <div id="game-timer-bar">
                        {/*<Counter/>*/}
                        {/*<ResetButton/>*/}
                        {/*<Counter/>*/}
                    </div>
			        <Board/>
                </div>

                {overlay}
        
                {/* needs to go above game area but below menus*/}

                {/*
                <div id="menu-area">
			        <MenuToggleButton/>
        	        <GenSettings/>
        	        {/* the oter menus}
                </div>
                
                */}
                <Debug/>
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {
        current_menu: state.current_menu, //dont think the app needs much of these
        game_state: state.game_state,
        mouse_state: state.mouse_state,
        tiles_cleared: state.tiles_cleared,
        last_game_won: state.last_game_won,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// holy shit https://medium.com/@agm1984/use-react-to-make-a-photo-follow-the-mouse-aka-transform-perspective-or-tilt-7c38f1b3a623