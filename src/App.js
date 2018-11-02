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
import { setMenu } from './redux/actions';

class App extends Component {
  render() {
    let overlay;
    if(this.props.current_menu !== 0){ // if the app is in a menu, make the game area unclickable
      overlay = <div id="overlay" onClick={ () => this.props.setMenu(0) }/>
    }
    return ( // man my html needs a fuckin refactor already lol
      <div className="App">
        <div id="game-area">
			{/*<Timer/>*/}
			<Board/>
        </div>

        {overlay}{/* needs to go above game area but below menus*/}

        <div id="menu-area">
			<MenuToggleButton/>
        	<GenSettings/>
        	{/* the oter menus*/}
        </div>
        
      </div>
    );
  }
}


// REDUX MAPS
const mapStateToProps = (state) => {
  return {
	current_menu: state.current_menu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
	  setMenu: (id) => dispatch(setMenu(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// holy shit https://medium.com/@agm1984/use-react-to-make-a-photo-follow-the-mouse-aka-transform-perspective-or-tilt-7c38f1b3a623