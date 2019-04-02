import React, { Component } from 'react';
import 'simplebar/dist/simplebar.min.css';
import './App.css';

import Content from './Content'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="app-name main-layout">App Name</div>
        </header>
        <main>
          <Content/>
        </main>
        <div className="app-actions">
          <div className="app-actions--items main-layout">
            <div className="action fab-bar">1</div>
            <div className="action fab-button">2</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
