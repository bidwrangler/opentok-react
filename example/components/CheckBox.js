import React, { Component } from 'react';
import { uniqueId } from 'lodash';

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.id = uniqueId('Checkbox')
  }

  onChange = (event) => {
    let isChecked = event.currentTarget.checked;
    this.props.onChange(isChecked);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.id}>
          {this.props.label}
        </label>
        <input
          type="checkbox"
          checked={this.props.checked}
          id={this.id}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
