import React from "react";
import ReactDOM from "react-dom";
import App from "./../App";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./../store/store";

import Index from "./../components/Index.js";
import BarChart from "./../components/charts/BarChart";

it("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("Index renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Index />
      </ConnectedRouter>
    </Provider>,
    div
  );
});

it("BarChart renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <BarChart />
      </ConnectedRouter>
    </Provider>,
    div
  );
});
