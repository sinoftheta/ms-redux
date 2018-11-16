// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';


class Counter extends Component { //props: type, value
    constructor(props) {
        super(props);
        this.state = {
            time: 0, // time in 100ths of a second
        }
    }
    render() {
        let printedValue = "004:00";
        
        return (
            <div className="counter" id="timer"> 
                {printedValue}
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {
        start_timestamp: state.start_timestamp,
        game_state: state.game_state,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Counter);