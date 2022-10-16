import { createStore, combineReducers, applyMiddleware } from "redux";
import { todos, isLoading } from "./components/reducers.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const reducers = {
  todos,
  isLoading,
};

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const configureStore = () =>
  createStore(persistedReducer, composedEnhancer);
