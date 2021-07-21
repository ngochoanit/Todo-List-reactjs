import React, { Component } from 'react';
import classNames from 'classnames'
import './trafficlight.css'
const RED=0;
const GREEN=1;
const ORANGE=2;
class TrafficLight extends Component{
    constructor(props){
        super(props);   
    }
    render(){
        const {currentColor}=this.props
       
        return(
            <div className="TrafficLight">
                <div className={classNames('bulb','red',
                    {active:currentColor===RED}
                )}>
                </div>
                <div className={classNames('bulb','green',
                    {active:currentColor===GREEN}
                )}>
                </div>
                <div className={classNames('bulb','orange',
                    {active:currentColor===ORANGE}
                )}>
                </div>
            </div>
        )
    }
}
export default TrafficLight;