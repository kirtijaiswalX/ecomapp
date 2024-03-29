import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*REDUX*/
import {Provider} from "react-redux";
import store from "./redux/store/store";

ReactDOM.render(
  <Provider store ={store}>
  <App />,
  </Provider> ,
  document.getElementById("root")
);

reportWebVitals();
