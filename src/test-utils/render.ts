/* 
  NOTE @g.wojtanowicz The purpose of this file is to create and export custom render functions
 */
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// NOTE @g.wojtanowicz read more: https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(), // NOTE @g.wojtanowicz read more: https://testing-library.com/docs/user-event/setup/
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

// re-export everything
export * from "@testing-library/react";
export { renderWithRouter };
