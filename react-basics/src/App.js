import { useState } from "react";
import './App.css';
import Button from "./components/buttons/Button";
import InputField from "./components/inputs/Input";
import TodoItem from './components/todo-item/ToDoItem';


function App() {

  const [input, setInput] = useState("");
  const [todos  , setTodos] = useState([]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput("");
    }
  };
  return (
    <>
    <div className="header">
      <h1>Todo List:</h1>
      <input placeholder="Hello"
        value={input} onChange={e => setInput(e.target.value)} />
      <Button onClick={addTodo} text="Add item"/>
    </div>
    <div className="todo-items">
      {todos.map((todo, index) => (
        <TodoItem text={todo} key={index} />
      ))}
    </div>
    </>
  );
}

export default App;
