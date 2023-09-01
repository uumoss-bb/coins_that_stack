import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import getStore from './state/getStore';
import { Provider } from 'react-redux';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

const store = getStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <StyletronProvider store={store} value={engine} debug={debug} debugAfterHydration>
      <App />
    </StyletronProvider>
  </Provider>
);
