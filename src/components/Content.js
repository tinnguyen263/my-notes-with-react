import React, {Component} from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export default class Content extends Component {
  render() {
    return (
      <SimpleBar className={this.props.className}>
        <div className="app-content--content">
          {this.props.children}
        </div>
      </SimpleBar>
    );
  }
}
