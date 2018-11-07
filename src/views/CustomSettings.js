// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
//pssst... you only import the actions that you wanna use...

class GenSettings extends Component {
  //mounts when app loads, pans in from the side when its button is pressed

   // all menues should initially have a transform value, 
   // and that transformed value will be stripped when
   // the menu is given the class "menu-focused"
  render() {

    let focusedMenu = "";
    if(this.props.current_menu === 1){
      focusedMenu = "menu-focused";
    }


    

        //stuff for CustomSettingsMenu: 

        //maybe put seed field here idk

        //custom board dimensions

        //"just fill my screen" option

        //mine density slider + field

        //number of mines option


        // check that (height * width - 9 >= minesToPlace) 
        // and/or 
        // (height * width - 9 >= height * width * density)
    return (
        <div id="custom-settings-menu" className={"menu " + focusedMenu}>
          <h1 className="menu-title">Custom Settings</h1>

          <div className="menu-text">Seed</div>
          
          
          <button className="menu-button" onClick={()=>console.log("dispatch(setCurrentMenu(2))")}>Custom Settings</button>
          <button className="menu-button" onClick={()=>console.log("dispatch(setCurrentMenu(3))")}>Visual Settings</button>
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