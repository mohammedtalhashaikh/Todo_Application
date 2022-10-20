import React from "react";
import styled from "styled-components";

const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;

  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

const TOdoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${(props) =>
    new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
      ? "none"
      : "2px solid red"};
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const Button = styled.div`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
`;

const CompletedButton = styled(Button)`
  display: inline-block;
  background-color: #22ee22;
`;

const RemoveButton = styled(Button)`
  background-color: #ee2222;
  margin-left: 8px;
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
  const Container = todo.isCompleted
    ? TodoItemContainer
    : TOdoItemContainerWithWarning;
  return (
    <Container createdAt={todo.createdAt}>
      <h3>{todo.text}</h3>
      <p>
        Created on:&nbsp;
        {new Date(todo.createdAt).toLocaleDateString()}
      </p>
      <ButtonContainer>
        {todo.isCompleted ? null : (
          <CompletedButton
            className="completed-button"
            onClick={() => onCompletedPressed(todo.id)}
          >
            Mark as Complete
          </CompletedButton>
        )}
        <RemoveButton
          className="remove-button"
          onClick={() => onRemovePressed(todo.id)}
        >
          Remove
        </RemoveButton>
      </ButtonContainer>
    </Container>
  );
};

export default TodoListItem;
