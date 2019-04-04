import React, { Component } from 'react';
import Content from './Content'
import Header from "./Header";
import Actions from "./Actions";
import Action from "./Action";
import AppName from "./AppName";

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Header className="app-header">
          <AppName/>
        </Header>
        <Content className="app-content"/>
        <Actions className="app-actions">
          <Action componentType="bar">1</Action>
          <Action componentType="button">2</Action>
        </Actions>
      </div>
    );
  }
}
