import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="app-header--content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
