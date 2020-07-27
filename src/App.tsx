import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Page } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import { joinReducer, accountDetailReducer} from './boxes/account/account_board';

const rootReducer = combineReducers({
  joinReducer,
  accountDetailReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Page />
      </Provider>
    </BrowserRouter>
  );
}

export default App;

serviceWorker.unregister();
