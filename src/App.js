// import logo from './logo.svg';
import React,{ Component} from 'react';

import TodoItem from './components/TodoItem';
import Header from './components/Header';
import Footer from './components/Footer';
import storage from './util/storage';

import './App.css';
import "./public/css/base.css"
import "./public/css/index.css"
class  App extends Component {
  constructor(props) {
    super(props);
    this.state={
      filter:'all',
      newItem:'',
      todoItems:storage.get(),//Get ToDos from local storage
    }
    this.filters={
      all:()=>true,
      active:(item)=>{return !item.isComplate},
      completed:(item)=>{return item.isComplate}
    }
    this.inputEle=React.createRef();
  }
  
  // handle click checked item
  onItemChecked(item){
    return (event)=>{
      const isComplate=item.isComplate;
      const {todoItems}=this.state;
      const index= todoItems.indexOf(item);
      this.setState({
        todoItems:[
          ...todoItems.slice(0,index),
          {
            ...item,
            'isComplate': !isComplate,
          },
          ...todoItems.slice(index + 1)
        ]
      },()=>{storage.set(this.state.todoItems)})
    }
  }
   // handle add new items
  onKeyUp(){
    return(event)=>{
      if(event.keyCode===13){
        let input= event.target.value;
        if(!input) {
          return;
        }
        if(!input.trim()) {
          return;
        }
        this.setState({
          newItem:'',
          todoItems:[
            { title :input, isComplate:false },
            ...this.state.todoItems
          ]
        },()=>{storage.set(this.state.todoItems)})
        // event.target.blur();
      }
     
    }
  }
  // handle change input add new item
  onChange(){
    return (event)=>{ 
      this.setState({
        newItem:event.target.value
      })
    }
  }
  //handle delete item
  onDeleteItem(item){
    return(event)=>{
      const {todoItems}=this.state
      const index= todoItems.indexOf(item);
      todoItems.splice(index,1);
      this.setState({
        todoItems:[
          ...todoItems
        ]
      },()=>{storage.set(this.state.todoItems)})
    }
  }
  //hendel check all items, isComplate on every item
  onCheckedAll(){
    return(event)=>{
      const {todoItems}=this.state;
      const isComplate= event.target.checked
      todoItems.map((item)=>{return item.isComplate=isComplate})
      this.setState({
        todoItems:todoItems,
      },()=>{storage.set(this.state.todoItems)})
    }
  }
  //hendel filter item have isComplate is true
  onFilterActive(){
    return(event)=>{
     this.setState({
       filter:'active'
     })
    }
  }
  //hendel filter item have isComplate is flase
  onFilterComplete(){
    return(event)=>{
     this.setState({
       filter:'completed'
     })
    }
  }
  //hendel filter all item 
  onFilterAll(){
    return(event)=>{
      this.setState({
        filter:'all'
      })
     }
  }
  //hendel clear all item is completed
  onClearAll(){
    return(event)=>{
      const{todoItems}=this.state;
      const todoItemsComplete=todoItems.filter(this.filters.active)
      this.setState({
        todoItems:todoItemsComplete
      },()=>{storage.set(this.state.todoItems)})
    }
  }
  render(){
    const {newItem,filter}=this.state;
    let {todoItems}=this.state;
    todoItems=todoItems.filter(this.filters[filter]);
    return(
      <div className='App'>
        <section className="todoapp">
          <Header newItem={newItem} onKeyUp={this.onKeyUp()} onChange={this.onChange()}></Header>
          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" 
            onChange={this.onCheckedAll()} 
            checked={todoItems.length>0 && todoItems.every(this.filters.completed)&& true}/>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
            {
              todoItems.map((item,index)=>(
              <TodoItem key={index} item={item} 
                onChange={this.onItemChecked(item)} onDeleteItem={this.onDeleteItem(item)}>
              </TodoItem>))
            }
            </ul>
          </section>
          <Footer count={todoItems.filter(this.filters.active).length}
                  onClickActive={this.onFilterActive()}
                  onClickComplete={this.onFilterComplete()}
                  onClickAll={this.onFilterAll()}
                  onClearAll={this.onClearAll()}
                  filter={filter}>
          </Footer>
        </section>
      </div>
    )
  } 
}

export default App;
