import { expect } from "chai";
import { getCompletedTodos } from "../selectors";

describe("Get completedtodos selector", () => {
  it("Returns only completed todos", () => {
    const fakeTodos = [
      { text: "say Hello", isCompleted: true },
      { text: "say Goodbye", isCompleted: false },
      { text: "Climb mount everest", isCompleted: false },
    ];

    const expected = [{ text: "say Hello", isCompleted: true }];
    const actual = getCompletedTodos.resultFunc(fakeTodos);
    expect(actual).is.deep.equal(expected);
  });
});
