import React, { useState } from "react";
import "./App.css";

interface TodoType {
  text: string;
  isCompleted?: boolean;
}

const mockTodos: TodoType[] = [
  {
    text: "Go to gym",
    isCompleted: false,
  },
  {
    text: "Buy milk",
    isCompleted: true,
  },
  {
    text: "Sleep early",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState<TodoType[]>(mockTodos);
  const [currentInput, setCurrentInput] = useState<string>();

  const toggleTodo = (index: number) => {
    const todo = todos[index];
    todo.isCompleted = !todo.isCompleted;
    setTodos([...todos]);
  };

  const removeTodo = (index: number) => {
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentInput) {
      return;
    }
    const newTodo: TodoType = {
      text: currentInput,
    };
    setTodos([...todos, newTodo]);
    setCurrentInput("");
  };

  return (
    <div className="app">
      {todos.map((todo, index) => {
        return (
          <div className="todo">
            <span
              style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
            >
              {todo.text}
            </span>
            <button onClick={() => toggleTodo(index)}>Toggle</button>
            <button onClick={() => removeTodo(index)}>Remove</button>
          </div>
        );
      })}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your plan for today."
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
