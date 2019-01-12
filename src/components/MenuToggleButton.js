// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { setMenu } from '../redux/actions/general';

class MenuToggleButton extends Component {

    //fading menus: 

    //in: mount then setTimoOut to apply class

    //out: apply class then setTimeout to unmount.
    behavior(){
        switch(this.props.current_menu){
            default:
                this.props.setMenu(0);
                return;
            case 0:
                this.props.setMenu(1);
                return;
        }

    }
    render() {
        let transformClass = "";
        if(this.props.current_menu !== 0){
            transformClass = "menu-toggle-button-out";
        }
        return (
            <button id="menu-toggle-button" className={transformClass} onClick={()=>this.behavior()}>
            </button>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(MenuToggleButton);