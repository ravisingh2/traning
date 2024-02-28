import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
/*jest.mock("./Login", () => {
  return () => <div>Login</div>
}
);
var mockUseStateFn = jest.fn();
jest.mock("react", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react"),
    useState:mockUseStateFn  
  }
}
);
*/
test('Todo List testing', async() => {
 // const setUser = jest.fn();
  const user = {};
  const { debug } = render(<App />);
  const loginTxt = screen.getByText(/addTodo/i);
  expect(loginTxt).toBeInTheDocument();

  const btn = screen.getByRole("button");
  const txtbox = screen.getByRole("textbox");
  
  userEvent.type(txtbox, "ravi");
  userEvent.click(btn)
  userEvent.type(txtbox, "ritika");
  userEvent.click(btn)
  //const listItem = await screen.findByText(/ravi/i);
  const listItems =  screen.getAllByTestId("list-items").map(li=>li.innerHTML)
  expect(listItems).toMatchInlineSnapshot()


});


