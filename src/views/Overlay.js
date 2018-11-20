// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { setMenu } from '../actions/general';


	
class Overlay extends Component {
    constructor(props){
        super(props);
        this.ref = React.createRef();
        this.state ={
            menuKillFlag: false,
        }
    }
    componentDidMount(){
        // remove hidden class
        this.timer = setTimeout(() => this.ref.current.classList.remove("hidden-overlay"), 20); // play fade in animation
        
        
    }
    componentDidUpdate(){
        /* 
        * instead of the menuKillFlag being in the local state, it would be in the store. 
        * for each 'synchronous fadeout event' you need a new flag for it. components can 
        * be sensitive to multiple 'synchronous fadeout events.'
        */
        if(this.state.menuKillFlag){ // menu kill flag should instead be called 'menuKillWarning' it is a 'synchronous fadeout event'
            this.ref.current.classList.add("hidden-overlay");

            setTimeout( () => {
                this.setState({menuKillFlag: false});
                this.props.setMenu(0);
            }, 
            270); // timer value needs to be longer than the longest animation that is sensitive to this fadeout event
        }
    }
	render() {
        
		return (
            <div id="overlay" 
            className={"hidden-overlay"} 
            /*
            //old method
            onClick={ () => {
                setTimeout( () => this.props.setMenu(0), 270 ); /* needs to be slightly longer than fade out animation speed in CSS
                this.ref.current.classList.add("hidden-overlay");
            }}*/
            onClick={/*set menuExitFlag */ () => this.setState({menuKillFlag: true})} // this will instead update the menuKillFlag in the store, so other components that are sensitive to the same flag will also play their fade out animations
            
            ref={this.ref}
            />
		);
	}
}


// REDUX MAPS
const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//load data from api into memory
		//setBoardData: (board_data) => dispatch(setBoardData(board_data)),
        setMenu: (id) => dispatch(setMenu(id)),

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);


