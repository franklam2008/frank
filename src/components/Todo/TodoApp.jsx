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
    if (storedTodos){ setTodos(storedTodos)};
    
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoCon">
      <div className="mainTitle">Todo</div>
      <Container>
        <Row className="title">
          <Col>
            <h5>TASK LISTS</h5>
            <h6 className="sub-title">
              Here you can manage your task lists in order to categorize and
              sort tasks
            </h6>
          </Col>
        </Row>
        <Row className="list">
          <Col>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          </Col>
        </Row>
        <Row className="footer">
          <Col xs={12} lg={6} className="addTodo">
            <InputGroup className="">
              <FormControl
                placeholder="Things to complete"
                aria-label="Things to complete"
                aria-describedby="basic-addon2"
                ref={todoNameRef}
                type="text"
              />
              <InputGroup.Append>
                <Button className="pageBtn" onClick={handleAddTodo}>
                  Add Todo
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={12} lg={6} className="clearDiv">
            <div className="">
              {todos.filter(todo => !todo.complete).length} left to do
            </div>

            <Button variant="outline-danger" onClick={handleClearTodos}>
              Clear Completed
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
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
}
