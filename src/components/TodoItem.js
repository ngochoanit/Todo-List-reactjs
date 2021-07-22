import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
TodoItem.propTypes = {
    items: PropTypes.shape({
        title: PropTypes.string.isRequired,
        isComplate: PropTypes.bool.isRequired,
    }),
    onChange: PropTypes.func,
    onDeleteItem: PropTypes.func,
}
export default TodoItem;