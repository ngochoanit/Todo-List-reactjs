// import logo from './logo.svg';
import React,{ Component} from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import Header from './components/Header';
import Footer from './components/Footer';
import "./public/css/base.css"
import "./public/css/index.css"
class  App extends Component {
  constructor(){
    super();
    this.state={
      filter:'all',
      newItem:'',
      todoItems:[
        {title :"Học HTML", isComplate:true },
        {title:"Học Css", isComplate:true},
        {title:"Học Js",isComplate:false}
      ],
      
    }
    this.filters={
      all:()=>true,
      active:(item)=>{return !item.isComplate},
      completed:(item)=>{return item.isComplate}
    }
  }
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
      })
    }
  }
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
        })
        event.target.blur();
      }
    }
  }
  onChange(){
    return (event)=>{ 
      this.setState({
        newItem:event.target.value
      })
    }
  }
  deleteItem(item){
    return(event)=>{
      const {todoItems}=this.state
      const index= todoItems.indexOf(item);
      todoItems.splice(index,1);
      this.setState({
        todoItems:[
          ...todoItems
        ]
      })
    }
  }
  onCheckedAll(){
    return(event)=>{
      const {todoItems}=this.state;
      const isComplate= event.target.checked
      todoItems.map((item)=>{return item.isComplate=isComplate})
      this.setState({
        todoItems:todoItems,
      })
    }
  }
  onFilterActive(){
    return(event)=>{
     this.setState({
       filter:'active'
     })
    }
  }
  onFilterComplete(){
    return(event)=>{
     this.setState({
       filter:'completed'
     })
    }
  }
  onFilterAll(){
    return(event)=>{
      this.setState({
        filter:'all'
      })
     }
  }
  onClearAll(){
    return(event)=>{
      this.setState({
        todoItems:[]
      })
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
            <input id="toggle-all" className="toggle-all" type="checkbox" onChange={this.onCheckedAll()} checked={todoItems.every(this.filters.completed)&& true}/>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
            {
              todoItems.map((item,index)=>(
              <TodoItem key={index} item={item} 
                onChange={this.onItemChecked(item)} deleteItem={this.deleteItem(item)}>
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
