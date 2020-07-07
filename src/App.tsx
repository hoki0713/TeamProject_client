import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Page } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <BrowserRouter>
     <Page />
   </BrowserRouter>
  );
}

export default App;
