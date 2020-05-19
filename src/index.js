import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import App from "./components/App";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById("root")
);
