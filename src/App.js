import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import MoneyManager from './pages/MoneyManager'
import Home from './pages/Home'
import { initApp } from './state/actions';

function App({initApp}) {
  initApp()

  return (
    <div className="App">
      <Home/>
      <MoneyManager/>
    </div>
  );
}

const mapDispatchToProps = {
  initApp
};

export default connect(null, mapDispatchToProps)(App);
