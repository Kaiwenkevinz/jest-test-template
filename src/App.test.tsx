import { cleanup, render, screen, within } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';

describe("todo list", () => {
  afterEach(() => {
    // reset the DOM after each test
    cleanup();
  });

  test("should render default todo lists", () => {
    /**
     * render 组件，然后获取页面上相应的元素，最后进行判断
     */

    // given
    render(<App />);

    // when
    const todos = screen.getAllByTestId("todo-item");

    // then
    expect(todos).toHaveLength(3);
  });

  test("should add todo item", () => {
    /**
     * render 组件，模拟用户输入，获取页面上相应的元素，最后进行判断
     */
    // given
    render(<App />);

    // when
    userEvent.type(
      screen.getByPlaceholderText("What's your plan?"),
      "Call mom{enter}"
    );

    // then
    const todos = screen.getAllByTestId("todo-item");
    expect(todos).toHaveLength(4);
  });

  test("should remove todo item", () => {
    /**
     * render 组件，模拟用户按钮点击，获取页面上相应的元素，最后进行判断
     */
    // given
    render(<App />);

    // then
    userEvent.click(
      within(screen.getByText("Go to gym")).getByTestId("remove-todo")
    );

    // when
    const todos = screen.getAllByTestId("todo-item");
    expect(todos).toHaveLength(2);
  });

  test("should toggle todo item", () => {
    /**
     * render 组件，模拟用户按钮点击，获取页面上相应的元素，最后判断 CSS 样式
     */
    // given
    render(<App />);

    // when
    const todoItem = within(screen.getByText("Go to gym"));
    userEvent.click(todoItem.getByText("Toggle"));

    // then
    const todoItemAfterClick = screen.getByText("Go to gym");
    expect(todoItemAfterClick).toHaveStyle("text-decoration: line-through");

    // toggle again should remove the line-through style
    userEvent.click(todoItem.getByText("Toggle"));
    const todoItemAfterClickAgain = screen.getByText("Go to gym");
    expect(todoItemAfterClickAgain).not.toHaveStyle("text-decoration: line-through");
  });
});
