// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { setMenu } from '../actions/general';


	
class Overlay extends Component {
    constructor(props){
        super(props);
        this.ref = React.createRef();
    }
    componentDidMount(){
        // remove hidden class
        this.timer = setTimeout(() => this.ref.current.classList.remove("hidden-overlay"), 20); // might not even need a timer...?
        
    }
	render() {
		return (
            <div id="overlay" 
            className={"hidden-overlay"} 
            onClick={ () => {
                setTimeout( () => this.props.setMenu(0), 270 /* needs to be slightly longer than fade out animation speed in CSS*/);
                this.ref.current.classList.add("hidden-overlay");
            }}
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


