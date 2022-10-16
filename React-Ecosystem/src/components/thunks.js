import {
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
} from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const todos = await fetch("http://localhost:8080/todos")
      .then((response) => response.json())
      .then(dispatch(loadTodosSuccess(todos)));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

export const displayAlert = (text) => {
  return () => alert(`you clicked on ${text}`);
};
