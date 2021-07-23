import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props) {
        super(props);
        this.inputEle=React.createRef();
    }
    //
    componentDidMount(){
        this.inputEle.current.focus();
      }
    render(){
        const {newItem,onKeyUp,onChange}=this.props;
        return(
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" ref={this.inputEle} value={newItem} placeholder="What needs to be done?" autoFocus onKeyUp={onKeyUp} 
                onChange={onChange}/>
            </header>
        )
    }
}
Header.propTypes={
    newItem:PropTypes.string.isRequired,
    onKeyUp:PropTypes.func,
    onChange:PropTypes.func,
}
export default Header;
