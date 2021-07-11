import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
require('dotenv').config();

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
})

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
