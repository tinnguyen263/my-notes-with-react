import React, { Component } from 'react';
import SimpleBar from "simplebar-react";
import NoteList from "./NoteList";
export default class Content extends Component{
  render() {
    return (
      <SimpleBar className="app-content">
        <NoteList className="app-content-content main-layout"/>
      </SimpleBar>
    )
  }
}
