import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import NoteList from './NoteList';
import 'simplebar/dist/simplebar.min.css';

export default class Content extends Component{
  render() {
    return (
      <SimpleBar className={this.props.className}>
        <NoteList className="app-content--content"/>
      </SimpleBar>
    )
  }
}
