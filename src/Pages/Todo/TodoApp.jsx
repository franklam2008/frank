import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList.jsx";
import uuidv4 from "uuid/v4";
import "./css/todo.css";

import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";
const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
  
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  return (
    <div className="todoCon">
      <div className="mainTitle">Todo</div>
      <Container>
        <Row>
          <Col lg={6}>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          </Col>
          <Col lg={6}>
            <Row>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Things to complete"
                  aria-label="Things to complete"
                  aria-describedby="basic-addon2"
                  ref={todoNameRef}
                  type="text"
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={handleAddTodo}>
                    Add Todo
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Row>
            <Row className="clearDiv">
              <div className="">
                {" "}
                {todos.filter(todo => !todo.complete).length} left to do
              </div>

              <Button variant="outline-secondary" onClick={handleClearTodos}>
                Clear Completed
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
