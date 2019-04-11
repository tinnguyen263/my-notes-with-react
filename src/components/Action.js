import React, { Component } from 'react';

export default class Action extends Component {
  render() {
    const containerClasses = `action action-${this.props.componentType || 'button'}`;
    return (
      <div className={containerClasses}>
        {this.props.children}
      </div>
    );
  }
}
