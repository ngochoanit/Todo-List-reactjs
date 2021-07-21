import React, { Component } from 'react';
class Header extends Component {

    render(){
        const {newItem,onKeyUp,onChange}=this.props;
        return(
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" value={newItem} placeholder="What needs to be done?" autoFocus onKeyUp={onKeyUp} 
                onChange={onChange}/>
            </header>
        )
    }
}
export default Header;