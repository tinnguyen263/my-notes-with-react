import React, { Component } from 'react';

export default class Actions extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="app-actions--content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
