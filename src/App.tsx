import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Page } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import { userListReducer } from './boxes/admin/admin_board/UsersList';

const rootReducer = combineReducers({
  userListReducer
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
