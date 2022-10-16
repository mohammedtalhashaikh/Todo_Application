import React from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";
import NewTodoForm from "./NewTodoForm";
import { connect } from "react-redux";
import { markTodoAsComplete, removeTodo } from "./actions";
import { useEffect } from "react";
import { loadTodos } from "./thunks";

const TodoList = ({
  todos = [],
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
      {console.log(todos)}
      {todos.map((todo, index) => (
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
  todos: state.todos,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (text) => dispatch(removeTodo(text)),
  onCompletedPressed: (text) => dispatch(markTodoAsComplete(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
