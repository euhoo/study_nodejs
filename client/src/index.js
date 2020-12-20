import app from './app'
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
 app(store);
