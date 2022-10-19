import React, { useState } from "react";
import "./NewTodoForm.css";
import { connect } from "react-redux";
import { addTodo } from "./thunks";
import { getTodos } from "./selectors";

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="new-todo-form">
      <input
        className="new-todo-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your new todo item"
      />
      <button
        className="new-todobutton"
        onClick={() => {
          const isDuplicateText = todos.some(
            (todo) => todo.text === inputValue
          );

          if (!isDuplicateText) {
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }}
      >
        Create Todo
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: getTodos(state),
});
const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (text) => dispatch(addTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
