import React, { Component } from 'react';
import classNames from 'classnames'

class TodoItem extends Component{
   
    render() {
        
        const {item,onChange,onDeleteItem}=this.props;
        
        return (
            <li className={classNames({'completed':item.isComplate})}>
                <div className="view">
                    <input className="toggle" type="Checkbox" checked={item.isComplate} onChange={onChange}></input>
                    <label>{item.title}</label>
                    <button className="destroy" onClick={onDeleteItem}></button>
                </div>
               
            </li>
        )
    }
}
export default TodoItem;