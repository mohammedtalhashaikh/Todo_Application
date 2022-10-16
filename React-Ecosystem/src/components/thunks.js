import {
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
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

export const displayAlert = (text) => {
  return () => alert(`you clicked on ${text}`);
};
