import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/styles.css";
import "./materialize/css/materialize.min.css";

import App from "./components/App";
import { configureStore } from "./store/store";
import { Provider } from "react-redux";
import { loadState, saveState } from "./utils/localStorage";

const persistedState = loadState("store");

const store = configureStore(persistedState);

store.subscribe(() => {
  saveState(
    {
      searchedAddresses: store.getState().searchedAddresses,
    },
    "store"
  );
});

const app = (
  <>
    {hot(
      <Provider store={store}>
        <App />
      </Provider>
    )}
  </>
);

ReactDOM.render(app, document.getElementById("root"));
