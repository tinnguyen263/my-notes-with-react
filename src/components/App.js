import React, { Component } from 'react';
import Content from './Content'

class App extends Component {
  render() {
    return (
      <div id="app">
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
