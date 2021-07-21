import React, { Component } from 'react';
import classNames from 'classnames'
class Footer extends Component {

    render(){
        const {count,onClickActive,onClickComplete,onClickAll,onClearAll,filter}=this.props;
        return (
            <footer className="footer">
                <span className="todo-count"><strong>{count}</strong> Item Active</span>
                <ul className="filters">
                <li>
                    <a className={classNames({'selected':filter==='all' })} onClick={onClickAll} href="#/">All</a>
                </li>
                <li>
                    <a className={classNames({'selected':filter==='active' })}  href="#/active" onClick={onClickActive}>Active</a>
                </li>
                <li>
                    <a className={classNames({'selected':filter==='completed' })}  href="#/completed" onClick={onClickComplete}>Completed</a>
                </li>
                </ul>
                <button className="clear-completed" onClick={onClearAll}>Clear completed</button>
          </footer>
        )
    }
}
export default Footer