import React, { Component } from 'react';

// STYLES //
import './style/App.css';


// VIEWS //
import GenSettings from './views/GenSettings';

// COMPONENTS //
import MenuToggleButton from './components/MenuToggleButton';
import Counter from './components/Counter';
import Board from './components/Board';

// JSON //

// REDUX //
import { connect } from 'react-redux';
import { setMenu } from './actions/general';

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
                        {/*<Timer/>*/}
                        {/*<ResetButton/>*/}
                        {/*<Timer/>*/}
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
        
                <div id="DEBUG">
                    <div>game_state: {this.props.game_state}</div>
                    <div>current_menu: {this.props.current_menu}</div>
                    <div>mouse_state: {this.props.mouse_state}</div>
                    <div>tiles_cleared: {this.props.tiles_cleared}</div>
                </div>
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

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
	    setMenu: (id) => dispatch(setMenu(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// holy shit https://medium.com/@agm1984/use-react-to-make-a-photo-follow-the-mouse-aka-transform-perspective-or-tilt-7c38f1b3a623