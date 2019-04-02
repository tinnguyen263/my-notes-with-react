import React, { Component } from 'react';
import Note from "./Note";
export default class NoteList extends Component{
  render() {
    return (
      <div className={`note-list ${this.props.className}`}>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
      </div>
    )
  }
}
