import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import './App.css';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')));

  useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleChange=(id) =>{
    setTodos(
      todos?.length>0 && todos?.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  }

  const handleEdit=(id, newTitle) =>{
    setTodos(
     todos?.length>0 && todos?.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTitle
          };
        }
        return todo;
      })
    );
  }

  const handleAdd=(newTitle)=> {
    newTitle.preventDefault();
    if(newTitle?.target?.newTodo?.value){
      let duplicateTitle=todos?.length>0 && todos?.filter(todo => todo?.title===newTitle?.target?.newTodo?.value)
      if(duplicateTitle?.length>0){
        return todos;
      }
      else{
        setTodos([
          ...todos,
          {
            id: new Date(),
            title: newTitle?.target?.newTodo?.value,
            completed: false
          }
        ]);
      }
    }
    newTitle.target.newTodo.value = "";
  }

  const handleClearCompleted=() =>{
    setTodos(todos?.filter(todo => !todo.completed));
  }

  return (
    <div className="app">
      <h1>Todo List</h1>
      <form>
        <input type="text" name="newTodo" placeholder="Enter a new todo item" />
        <button onClick={event =>handleAdd(event)}>Add</button>
      </form>
      <button className="clear" onClick={handleClearCompleted}>Clear Completed</button>
      <ul className="list">
        {todos?.length>0 && todos?.map(todo => (
          <Todo key={todo.id} todo={todo} handleChange={handleChange} handleEdit={handleEdit} />
        ))}
      </ul>
    </div>
  );
}

export default App;
