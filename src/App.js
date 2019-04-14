import React, {Component} from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Actions from './components/Actions';
import Action from './components/Action';
import AppName from './components/AppName';
import AppRouter from './AppRouter';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Header className="app-header">
          <AppName/>
        </Header>
        <Content className="app-content">
          <AppRouter/>
        </Content>
        <Actions className="app-actions">
          <Action componentType="bar">1</Action>
          <Action componentType="button">2</Action>
        </Actions>
      </div>
    );
  }
}
