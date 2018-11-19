// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';

class MatrixTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applyTransform: false,
        }
    }
    render() {
        let transformClass = "";
        if(this.state.applyTransform){
            transformClass = " animation-hidden-modal";
        }
        return (
            <div id="test-matrix" className={"animation-common unselectable" + transformClass} onClick={() => this.setState(prevState => ({applyTransform: !prevState.applyTransform}))}>
                click me!
            </div>
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
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MatrixTest);