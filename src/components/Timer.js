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
            displayMinutes: true, // determines how the time is displayed ...must be read from default settings. This should just be read from the store and not local state
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
                    clearInterval(this.timer);
                    this.setState({last_game_state: this.props.game_state, display_time: 0});
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
        if(this.state.displayMinutes){
            // convert display_time to hour:minute:second:miliseconds format

            let minutes = Math.floor(this.state.display_time / 60000 ) % 60;
            if(minutes < 10) printedValue += "0";
            printedValue += minutes;
            printedValue += ":";


            let seconds = Math.floor(this.state.display_time / 1000 ) % 60;
            if(seconds < 10) printedValue += "0";
            printedValue += seconds;
            printedValue += ":";

            let decimal = Math.floor(this.state.display_time / visualTimeGranularity ) % 99;
            if(decimal < 10) printedValue += "0";
            printedValue += decimal;
            

        }
        else{
            // convert display_time to fixed point format
            let seconds = Math.floor(this.state.display_time / 1000 );
            if(seconds < 10) printedValue += "0"; // change this logic
            printedValue += seconds;
            printedValue += ".";

            let decimal = Math.floor(this.state.display_time / visualTimeGranularity ) % 99;
            printedValue += decimal;
            if(decimal < 10) printedValue += "0";




        }
        
        return (
            <div className="counter" id="timer" onClick={() => this.setState(prevState => ({displayMinutes: !prevState.displayMinutes}))}> 
                {printedValue}
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