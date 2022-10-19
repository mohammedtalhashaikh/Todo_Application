import React from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";
import NewTodoForm from "./NewTodoForm";
import { connect } from "react-redux";
import { useEffect } from "react";
import { loadTodos, deleteTodo, completeTodo } from "./thunks";
import {
  getTodos,
  getTodosLoading,
  getIncompleteTodos,
  getCompletedTodos,
} from "./selectors";

const TodoList = ({
  completedTodos,
  incompleteTodos,
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading Todos...</div>;
  const content = (
    <div className="list-wrapper">
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompleteTodos.map((todo, index) => (
        <TodoListItem
          todo={todo}
          key={index}
          onCompletedPressed={onCompletedPressed}
          onRemovePressed={onRemovePressed}
        />
      ))}

      <h3>Complete:</h3>
      {completedTodos.map((todo, index) => (
        <TodoListItem
          todo={todo}
          key={index}
          onCompletedPressed={onCompletedPressed}
          onRemovePressed={onRemovePressed}
        />
      ))}
    </div>
  );

  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
  isLoading: getTodosLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(deleteTodo(id)),
  onCompletedPressed: (id) => dispatch(completeTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
