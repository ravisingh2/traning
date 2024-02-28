import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
  const [todo, setTodo] = useState('');  
  const [todoList, setTodoList] = useState([]);  
  const addTodo = ()=>{
    if(todo){
        setTodoList((previousTodoList)=>{
          return [...previousTodoList, todo];
        });
    }
  }
  const deleteFn = (todoToDelete)=>{
    let newTodoList = todoList.filter(todo=>todo!=todoToDelete)
    setTodoList(newTodoList)
  }
  return (
    <div>
      <input type='text' onChange={(e)=>setTodo(e.target.value)}/>
      <input type="button" value="addTodo" onClick={addTodo}/>
      <ul>
      {

        todoList.map(todo=>{
          return <li key={todo} data-testid="list-items">{todo} &nbsp; <span onClick={()=>deleteFn(todo)}>Delete</span></li>
        })
      }
      </ul>
    </div>
  );
}

export default App;
// todo
//input
///add button 
//listing with delete button