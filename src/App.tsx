import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from './pages';
import { StatisticPage } from './boxes/statistic';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import { storeListReducer,storeReducer } from "./boxes/common/board/map";
import { userListReducer } from './boxes/admin/admin_board/UsersList';
import { recommendListReducer} from "./boxes/common/board/recommandation/Recommendation";

const rootReducer = combineReducers({
  userListReducer,
  storeListReducer,
  recommendListReducer
  storeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/statistic/test" exact>
            <StatisticPage />
          </Route>
          <Route>
            <Page />
          </Route>
        </Switch>

      </Provider>
    </BrowserRouter>
  );
}

export default App;

serviceWorker.unregister();
