import {
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
  createTodo,
  removeTodo,
  markTodoAsComplete,
} from "./actions";
import axios from "axios";

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();
    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

export const addTodo = (text) => async (dispatch, getstate) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: { "Content-type": "application/json" },
      method: "post",
      body,
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert(e.message));
  }
};

export const deleteTodo = (id) => async (dispatch, getState) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      headers: { "Content-type": "application/json" },
      method: "delete",
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (e) {
    dispatch(displayAlert(e.message));
  }
};

export const completeTodo = (id) => async (dispatch, getState) => {
  try {
    const response = await fetch(
      `http://localhost:8080/todos/${id}/completed`,
      {
        headers: { "Content-type": "application/json" },
        method: "post",
      }
    );
    const updatedTodo = await response.json();
    dispatch(markTodoAsComplete(updatedTodo));
  } catch (e) {
    dispatch(displayAlert(e.message));
  }
};

export const displayAlert = (text) => {
  return () => alert(`you clicked on ${text}`);
};
