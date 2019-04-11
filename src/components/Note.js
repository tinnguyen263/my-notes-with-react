import React, { Component } from 'react';

export default class Note extends Component{
  render() {
    return (
      <div id={this.props.id} className={`note ${this.props.className}`} onClick={this.props.onClick}/>
    )
  }
}
