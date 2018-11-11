// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';


class Counter extends Component { //props: type, value
    render() {
        let printedValue = this.props.value;
        
        return (
            <div className="counter" id={"counter-" + this.props.type}> 
                {printedValue}
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {
        board: state.board,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        setMenu: (id) => dispatch(setMenu(id)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Counter);