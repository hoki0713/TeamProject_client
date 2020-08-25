import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Page } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import * as serviceWorker from './serviceWorker';

function App() {
  return (
    <BrowserRouter>
      <Page />
    </BrowserRouter>

  );
}

export default App;

serviceWorker.unregister();
