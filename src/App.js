import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
import "./App.css";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./components/Todo";
import db from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here...fires when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault(); // stop default event i.e (Refresh when push submit button)

    // firebase
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //create timestamp base on serverTimestamp
    });

    setInput(""); // clear up the input
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <form action="">
        <FormControl>
          <InputLabel>Write a todo list</InputLabel>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          onClick={addTodo}
          type="submit"
        >
          Add Todo
        </Button>
      </form>

      <div className="todolist">
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default App;
