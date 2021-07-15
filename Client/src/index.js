import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyD8M8CXzB4WIn6FyM4xeof3S57tb1Xnwww",
  authDomain: "rs3exchange.firebaseapp.com",
  projectId: "rs3exchange",
  storageBucket: "rs3exchange.appspot.com",
  messagingSenderId: "129153903172",
  appId: "1:129153903172:web:212c99783c1592e34e2a11",
  measurementId: "G-H0BXDS1KMY"
})

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
