// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';

// DEFINITIONS //
import { preGameIdle, gameInProgress, postGameIdle, playingReplay, postReplayIdle } from '../other/definitions';

const visualTimeGranularity = 10;  // VISUAL TIMER GRANULARITY DEFINED HERE
/*
* visual timer will update every n milliseconds, where n is visualTimeGranularity
*/

class Timer extends Component { //props: type, value
    constructor(props) {
        super(props);
        this.state = {
            displayMinutes: false, // determines how the time is displayed
            display_time: 0, // time to display in milliseconds
            last_game_state: 0,
        }
    }
    componentDidUpdate(){
        // do stuff when game_state changes
        if(this.props.game_state !== this.state.last_game_state){
            switch(this.props.game_state){
                case preGameIdle:
                    // reset timer


                    this.setState({last_game_state: this.props.game_state});
                    return;
                case playingReplay:
                case gameInProgress:
                    // start timer

                    this.timer = setInterval( 
                        () => this.setState({
                            display_time: (new Date()).getTime() - this.props.start_timestamp
                        }),
                        visualTimeGranularity
                        );

                    this.setState({last_game_state: this.props.game_state});
                    return;
                case postReplayIdle:
                case postGameIdle:
                    // stop timer
                    clearInterval(this.timer);

                    this.setState({last_game_state: this.props.game_state});
                    return;
            }
        }
    }
    render() {
        //convert display_time into a timestamp based on displayMinutes

        let printedValue = "";
        
        return (
            <div className="counter" id="timer" onClick={() => this.setState(prevState => ({displayMinutes: !prevState.displayMinutes}))}> 
                {printedValue}
                {this.state.display_time}
            </div>
        );
    }
}


// REDUX MAPS //
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Timer);