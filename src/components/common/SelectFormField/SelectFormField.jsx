/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SelectFormField.scss';

class SelectFormField extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  handleChange(event) {
    const { name, onChangeProp } = this.props;
    this.setState({ value: event.target.value });
    onChangeProp({ [name]: +event.target.value });
  }

  render() {
    const { label, name, options } = this.props;
    const { value } = this.state;
    const items = options.map((item, index) => (<option key={index} value={item}>{item}</option>));

    return (
      <div className="select-form-field">
        <label className="select-form-field__label" htmlFor={name}>{label}</label>
        <select className="select-form-field__select" name={name} id={name} value={value} onChange={this.handleChange}>
          {items}
        </select>
      </div>
    );
  }
}

SelectFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChangeProp: PropTypes.func.isRequired,
};

export default SelectFormField;
