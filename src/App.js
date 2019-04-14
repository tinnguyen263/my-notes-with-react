import React, {Component} from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Actions from './components/Actions';
import Action from './components/Action';
import AppName from './components/AppName';
import AppRouter from './AppRouter';
import {createNote} from './services/store/actions';
import {Provider} from 'react-redux';
import store from './services/store';

export default class App extends Component {
  componentDidMount() {
    initMockData(store);
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}


const initMockData = (context) => {
  const createMockNote = () => {
    const id = Math.random();
    return {
      id,
      title: 'Title of ' + id,
      content: 'Content of ' + id,
    };
  };
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
  context.dispatch(createNote(createMockNote()));
};
