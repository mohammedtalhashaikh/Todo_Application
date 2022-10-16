import React from "react";
import App from "./App.js";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

const store = configureStore();
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<div>loading</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
