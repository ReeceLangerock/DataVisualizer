import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./../store/store";
import BarChart from "./../components/charts/BarChart";

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
