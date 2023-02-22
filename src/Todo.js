import React, { useState } from 'react';
import './Todo.css';
function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.todo.title);

  const handleTitleClick=()=> {
    setIsEditing(true);
  }

  const handleNewTitleChange=(event)=> {
    setNewTitle(event.target.value);
  }

  const handleNewTitleSubmit=(event)=> {
    event.preventDefault();
    props.handleEdit(props.todo.id, newTitle);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className={props.todo.completed ? "completed" : "incomplete"}>
        <form onSubmit={handleNewTitleSubmit}>
          <input type="text" value={newTitle} onChange={handleNewTitleChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={props.todo.completed ? "completed" : "incomplete"} onDoubleClick={handleTitleClick}>
        <input
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => props.handleChange(props.todo.id)}
        />
        <label
          style={{
            textDecoration: props.todo.completed ? 'line-through' : 'none'
          }}
        >
          {props.todo.title}
        </label>
      </div>
    );
  }
}

export default Todo;
