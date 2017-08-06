import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./store/store";
import Index from "./components/Index.js";
import BarChart from "./components/charts/BarChart";

class App extends Component {
  render() {
    return (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>

        <main>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/barchart" component={BarChart} />

          </Switch>

        </main>
      </div>
    </ConnectedRouter>
  </Provider>
);
}
}

export default App;
//  <Route path="*" component={ErrorPage} />
