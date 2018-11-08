// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
//pssst... you only import the actions that you wanna use...

// COMPONENTS //
import MenuToggleButton from '../components/MenuToggleButton';

class GenSettings extends Component {
	//mounts when app loads, pans in from the side when its button is pressed

	// all menues should initially have a transform value, 
	// and that transformed value will be stripped when
	// the menu is given the class "menu-focused"
	setOption(event) {
		console.log(event.target.value);
	}
	render() {

		let menuClass = " general-settings-menu";
		if (this.props.current_menu !== 1) {
			menuClass = " general-settings-menu-focused";
		}

		return (
			<div className={"menu" + menuClass} onChange={event => this.setOption(event)}>
				<h1 className="menu-title">Main Menu</h1>

				<h2 className="menu-text">Gamemode</h2>

				<div className="menu-box">
					<div className="menu-text">
						<input type="radio" name="level" value="Beginner" />Beginner
            </div>
					<div className="menu-text">
						<input type="radio" name="level" defaultChecked value="Intermediate" />Intermediate
            </div>
					<div className="menu-text">
						<input type="radio" name="level" value="Advanced" />Advanced
            </div>
					<div className="menu-text">
						<input type="radio" name="level" value="Custom" />Custom
            </div>
				</div>

				<h2 className="menu-text">Load Replay</h2>
				<input type="file" name="myFile" />

				<button className="menu-button" onClick={() => console.log("dispatch(setCurrentMenu(2))")}>Custom Settings</button>
				<button className="menu-button" onClick={() => console.log("dispatch(setCurrentMenu(3))")}>Visual Settings</button>
				{/* 'close menu' or 'return to game' button????*/}

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
		//load data from api into memory
		//setBoardData: (board_data) => dispatch(setBoardData(board_data)),


	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GenSettings);