import React, { Component } from 'react';

export default class NotePage extends Component {
  render() {
    return (
      <h2>{this.props.noteId}</h2>
    )
  }
}
